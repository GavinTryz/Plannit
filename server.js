require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const sgMail = require('@sendgrid/mail');
const jwtLib = require('jsonwebtoken');

const client = new MongoClient(url);
try {
    client.connect();
}
catch (e) {
    console.log(e);
}

const mongoose = require('mongoose');
const jwt = require('./createJWT');

const cors = require('cors');
const { createBrotliCompress } = require('zlib');
const { send } = require('process');
const app = express();

// mongoose.connect('mongodb://');

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {  
    res.setHeader('Access-Control-Allow-Origin', '*');  
    res.setHeader('Access-Control-Allow-Headers',    
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');  
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS');  
    next();
});

if (process.env.NODE_ENV === 'production') 
{
  // Set static folder
  app.use(express.static(path.join(__dirname, 'frontend', 'build')));

  app.get('*', (req, res, next) => 
  {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.post('/api/login', async (req, res, next) => {
    const {email, password} = req.body;
    console.log(email);
    console.log(password);
    const db = client.db();
    const results = await(db.collection('Users').find({email: email, password: password})).toArray();
    var userID = -1;
    var firstname = '';
    var lastname = '';
    var error = '';

    var ret = "";

    console.log(results);
    if (results.length > 0) 
    {
        const body = results[0];
        if(body.verified == false)
        {
            error = "Account is not verified";
        }
        else
        {
            userID = body._id;
            console.log(userID);
            firstname = body.firstname;
            lastname = body.lastname;

            try
            {
                ret = jwt.createToken(firstname, lastname, userID);
                console.log(ret);
            }
            catch(e)
            {
                error = e.message;
            }
        }
        
    }
    else
    {
        error = "Login or password is incorrect";
    }

    
    // res.json({firstname: firstname, lastname: lastname, userID: userID, error: error});
    res.status(200).json({error: error, userID: userID, jwtToken: ret});
});

app.post('/api/register', async (req, res, next) => {
    const {firstname, lastname, email, password} = req.body;
    const db = client.db();
    var error = '';

    
    
    const results = await(db.collection('Users').find( {email : email} )).toArray();
    
    if (results.length > 0)
    {
        res.status(200).json({
            error: "The user already exists"
        });
        return;
    }
    else
    {
        var emailToken = '';   
        try
        {
            
            db.collection('Users').insertMany([ 
               {firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                verified: false}
            ]);
            
            sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            // JWT For Email Verification
            
            emailToken = jwtLib.sign(
            {
                email: email
            }, process.env.SENDGRID_API_KEY,
            {
                expiresIn: "1d"
            });
            
            // Compose message for Email
            const msg = {
                from: 'plannitnotifications@gmail.com',
                to: email,
                subject: 'Plannit - Email Verification',
                text: `
                Hello!
                Thank you for registering to Plannit! Please click the link below to verify your account:
                http://${req.headers.host}/verifyEmail?token=${emailToken}
                `,
                html:`
                <h1>Hello!</h1>
                <p>Thank you for registering to Plannit!</p>
                <p>Please click the link below to verify your account.</p>
                <a href = "http://${req.headers.host}/verifyEmail?token=${emailToken}">Verify your account.</a>
                `
            };

            console.log("Email sent!");
            

            sgMail.send(msg)
            .catch((err) => {
                error = err;
            });
        }    
        catch(e)
        {
            error = e.message;
        }
        res.status(200).json({error: error, token: emailToken});
    }
    
});

app.post('/api/verifyEmail', async(req, res, next) => {
    var error = '';
    const db = client.db();
    const {token} = req.body;
    try
    {
        const email = jwtLib.verify(token, process.env.SENDGRID_API_KEY);
        var user = await db.collection('Users').findOne({email: email.email}, {_id:0, verified:1});
        if (user && user.verified)
        {
            error = "Email is already verified, please log in"; 
        }
        else if (user)
        {
            db.collection('Users').updateOne({email: email.email}, {$set: {verified: true}});
        }
        else
        {
            error = "User does not exist";
        }
    }
    catch(error)
    {
        return res.status(200).json({error: error});
    }
    return res.status(200).json({error: error});
});

app.post('/api/getInvites', async(req, res, next) => {
    const {jwtToken} = req.body;
    const userID = jwtLib.decode(jwtToken, {complete: true}).payload.userId;
    var error = "";

    if (jwt.isExpired(jwtToken))
    {
        return res.status(200).json({error: "JWT token is no longer valid"});
    }

    var newToken = jwt.refresh(jwtToken);

    try
    {
        
        const ObjectID = require('mongodb').ObjectID;
        var id = new ObjectID(userID);
        var email = await db.collection('Users').findOne(
            {_id: id}
        ).project(
            {_id:0, email:1}
        )
        var invites = await db.collection('Invites').find(
            {email: email}
        ).project(
            {_id:0, email:0}
        ).toArray();
    }
    catch(e)
    {
        var error = e.message
    }

    return res.status(200).json({error: error, invites: invites, jwtToken: newToken});
});
// TODO modify endpoint to get userid of person invited and return in email token
// that way the front end can pass userid to join event endpoint
app.post('/api/inviteUser', async(req, res, next) => {
    const {eventID, email, jwtToken, eventName} = req.body;
    const db = client.db();
    var error = '';
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    var id = await db.collection('Users').findOne({email: email});
    if (jwt.isExpired(jwtToken))
    {
        return res.status(200).json({error: "JWT token is no longer valid"});
    }

    var newToken = jwt.refresh(jwtToken);

    if (!id)
    {
        return res.status(200).json({error: "User does not exist", jwtToken: newToken});
    }

    emailToken = jwtLib.sign(
    {
        eventID: eventID,
        eventName: eventName,
        email: email,
        userID: id._id
    }, process.env.SENDGRID_API_KEY,
    {
        expiresIn: "1d"
    });
    try
    {
        await db.collection('Invites').insertOne({email: email, eventID: eventID, eventName: eventName});
        // Compose message
        const msg = {
        from: 'plannitnotifications@gmail.com',
        to: email,
        subject: 'Plannit Event Invite',
        text: `
        Hello!
        You have been invited to a Plannit event! Please click the link below to join the event:
        http://${req.headers.host}/joinEvent?token=${emailToken}
        `,
        html:`
        <h1>Hello!</h1>
        <p>You have been invited to a Plannit event!</p>
        <p>Please click the link below to join the event.</p>
        <a href = "http://${req.headers.host}/joinEvent?token=${emailToken}">Join event.</a>
        `
        }
        console.log('sent');
        sgMail.send(msg)
        .catch((err) => {
            console.log(err);
            error = err;
        })
    }
    catch(e)
    {
        console.log(e);
        error = e;
    }
    return res.status(200).json({error: error, jwtToken: newToken});
});

app.post('/api/sendReset', async(req, res, next) => {
    const {email} = req.body;
    const db = client.db();
    var error = '';
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    emailToken = jwtLib.sign(
    {
        email: email
    }, process.env.SENDGRID_API_KEY,
    {
        expiresIn: "1d"
    });
    try
    {
        var user = await db.collection('Users').findOne({email: email});

        if (!user)
        {
            return res.status(200).json({error: "Account with specified email does not exist"});
        }

        // Compose message
        const msg = {
        from: 'plannitnotifications@gmail.com',
        to: email,
        subject: 'Plannit Password Reset',
        text: `
        Verification Code:`
        + emailToken +
        `
        http://${req.headers.host}/resetPassword
        `,
        html:`
        <p>Verification Code: </p>
        ` + emailToken +
        `
        <a href = "http://${req.headers.host}/resetPassword">Reset password.</a>
        `
        }
        sgMail.send(msg)
        .catch((err) => {
            error = err;
        });
    }
    catch(e)
    {
        console.log(e);
        error = e;
    }
    return res.status(200).json({error: error});
});

app.post('/api/resetPassword', async(req, res, next) => {
    var error = '';
    const db = client.db();
    const {password, token} = req.body;
    try
    {
        const email = jwtLib.verify(token, process.env.SENDGRID_API_KEY);
        if (!email)
        {
            error = "Incorrect verification code";
        }
        else
        {
            db.collection('Users').updateOne({email: email.email}, {$set: {password: password}});
        }
    }
    catch(error)
    {
        return res.status(200).json({error: error});
    }

    return res.status(200).json({error: error});
});
app.post('/api/getWeekFromToken', async(req, res, next) => {
    const {token} = req.body;
    const db = client.db();
    var data = jwtLib.verify(token, process.env.SENDGRID_API_KEY);
    console.log(data);
    const results = await(
        db.collection('MyTypicalWeek').find( 
            {userID: data.userID}
        ).project(
            {_id:0, week:1, names:1}
        )
    ).toArray();
    console.log(results);
    if (results.length > 0)
    {
        console.log(results);
        res.status(200).json({week: results[0].week, error: ""});
        return;
    }
    else
    {
        res.status(200).json({error: "Could not find any week info"});
    }
});
app.post('/api/joinEvent', async (req, res, next) => {
    const db = client.db();
    const {token, availability, jwtToken, eventID, eventName} = req.body;
    var error = "";
    var newToken;

    if (jwtToken && jwt.isExpired(jwtToken))
    {
        return res.status(200).json({error: "JWT token is no longer valid"});
    }   
    else if(jwtToken)
    {
        newToken = jwt.refresh(jwtToken);
        var event = eventID;
        var title = eventName;
    }
    else
    {
        console.log(availability);
        console.log("using token");
        const emailToken = jwtLib.verify(token, process.env.SENDGRID_API_KEY);
        var event = emailToken.eventID;
        var email = emailToken.email;
        var title = emailToken.eventName;
        console.log(event);
        console.log(email);
        console.log(title);
    }


    try
    {
        if (newToken)
        {
            userID = jwtLib.decode(newToken, {complete: true}).payload.userId;
            var email = await db.collection('User').findOne({userID: userID}, {_id:0, email:1});
        }

        console.log(email);
        var participant = await db.collection('Users').findOne({email: email}, {firstname:1, lastname:1});
        
        await db.collection('Participants').insertOne({
            eventID: event, 
            eventName: title,
            userID: participant._id, 
            firstname: participant.firstname, 
            lastname: participant.lastname,
            availability: availability
        });
        
        if (!newToken)
        {
            await db.collection('Invites').deleteOne({email: email, eventID: eventID});
        }
        
    }
    catch(e)
    {
        error = e.message;
    }

    return res.status(200).json({error: error, jwtToken: newToken});
});

app.post('/api/createWeek', async (req, res, next) => {
    const db = client.db();
    const {week, userID, jwtToken} = req.body;

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }

    var newToken = jwt.refresh(jwtToken);
    
    try
    {
        await db.collection('MyTypicalWeek').deleteMany(
            {userID: userID}
        );
        
        await db.collection('MyTypicalWeek').insertOne( 
            {week: week,
             userID: userID}
        );

        var error = "";    
    }    
    catch(e)
    {
        var error = e.message;
    }
    res.status(200).json({error: error, jwtToken: newToken});
});

app.post('/api/getWeek', async (req, res, next) => {
    const db = client.db();
    const {userID, jwtToken} = req.body;

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }

    var newToken = jwt.refresh(jwtToken);

    const results = await db.collection('MyTypicalWeek').findOne( {userID: userID}, {_id:0} );

    if (results)
    {

        res.status(200).json({week: results.week, error: "", jwtToken: newToken});
        return;
    }
    else
    {
        res.status(200).json({error: "Could not find any week info", jwtToken: newToken});
    }
});

app.post('/api/createEvent', async (req, res, next) => {
    const db = client.db();
    const{creatorID, eventName, weekly, startTime, endTime, daysOfWeek, jwtToken} = req.body;

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }

    var newToken = jwt.refresh(jwtToken);

    try
    {
        
        db.collection('Events').insertOne( 
            {creatorID: creatorID,
            eventName:eventName,
            weekly:weekly,
            startTime:startTime,
            endTime:endTime,
            daysOfWeek:daysOfWeek,
            eventTime: null
            }
        );

        var eventID = await db.collection('Events').findOne({creatorID: creatorID, eventName: eventName});

        var error = "";    
    }    
    catch(e)
    {
        var error = e.message;
    }

    res.status(200).json({eventID: eventID._id, error: error, jwtToken: newToken});
});

app.post('/api/deleteEvent', async (req, res, next) => {
    const db = client.db();
    const {eventID, jwtToken} = req.body;
    var error = '';

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }

    var newToken = jwt.refresh(jwtToken);

    try
    {
        const mongo = require('mongodb');
        var id = new mongo.ObjectID(eventID)
        await db.collection('Events').deleteOne({_id: id});
    }
    catch(e)
    {
        error = e.message;
    }

    res.status(200).json({error: error, jwtToken: newToken});


});

app.post('/api/getEvents', async (req, res, next) => {
    const db = client.db();
    const{userID, jwtToken} = req.body;

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }

    var newToken = jwt.refresh(jwtToken);
    var creatorEvents;
    try 
    {
        creatorEvents = await(
            db.collection('Events').find(
                {creatorID: userID}
            ).project(
                {eventName:1}
            )
        ).toArray();
        // to be implemented once we can insert into participants table
        
        var participantEvents = await(
             db.collection('Participants').find(
                 {userID: userID}
             ).project(
                 {_id:0, eventID:1, eventName:1}
             )
         ).toArray();

        var error = "";
    }
    catch(e)
    {
        var error = e.message;
    }

    res.status(200).json({creatorEvents: creatorEvents, participantEvents: participantEvents, error: error, jwtToken: newToken});
    
});

app.post('/api/searchEvents', async (req, res, next) => {
    const db = client.db();
    const{userID, name, jwtToken} = req.body;

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }

    var newToken = jwt.refresh(jwtToken);
    var creatorEvents;
    try 
    {
        var partialMatching = new RegExp(name, 'i');
        creatorEvents = await(
            db.collection('Events').find(
                {creatorID: userID, eventName: partialMatching}
            ).project(
                {eventName:1}
            )
        ).toArray();
        // to be implemented once we can insert into participants table
        
        var participantEvents = await(
             db.collection('Participants').find(
                 {userID: userID,  eventName: partialMatching }
             ).project(
                 {_id:0, eventID:1, eventName:1}
             )

         ).toArray();

        var error = "";
    }
    catch(e)
    {
        var error = e.message;
    }

    res.status(200).json({creatorEvents: creatorEvents, participantEvents: participantEvents, error: error, jwtToken: newToken});
    
});

app.post('/api/getAllEvents', async (req, res, next) =>
{
    const db = client.db();
    const {jwtToken} = req.body;
    var events;
  
    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }

    var newToken = jwt.refresh(jwtToken);

    try
    {
        events = await(db.collection('Events').find({}).project({eventName:1})).toArray();

        var error = "";
    }
    catch(e)
    {
        var error = e.message;
    }

    res.status(200).json({events: events, error: error, jwtToken: newToken});
});

app.post('/api/viewEvent', async (req, res, next) => {
    const db = client.db();
    const mongo = require('mongodb');
    const{eventID, jwtToken} = req.body;

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }

    var newToken = jwt.refresh(jwtToken);

    try 
    {
        var id = new mongo.ObjectID(eventID)
        var eventInfo = await db.collection('Events').findOne(
                {_id: id}, {_id: 0}
            );
    
         var participants = await(
            db.collection('Participants').find(
                {eventID: eventID}).project(
                    {_id:0, userID:1, firstName:1, lastName:1, availability:1}
                )
        ).toArray();
        
        
        if (!eventInfo)
        {
            var error = "Could not find event";
            res.status(200).json({error: error, jwtToken: newToken});
            return;
        }

        var error = "";
    }
    catch(e)
    {
        var error = e.message;
    }

    res.status(200).json({creatorID: eventInfo.creatorID, eventID: eventID, participants: participants, eventName: eventInfo.eventName, weekly: eventInfo.weekly, startTime: eventInfo.startTime, 
        endTime: eventInfo.endTime, daysOfWeek: eventInfo.daysOfWeek, eventTime: eventInfo.eventTime, error: error, jwtToken: newToken});
});

app.post('/api/leaveEvent', async (req, res, next) => {
    const db = client.db();
    const{userID, eventID, jwtToken} = req.body;

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }

    var newToken = jwt.refresh(jwtToken);
    
    try
    {
        db.collection('Participants').deleteOne({userID: userID, eventID: eventID});
        var error = "";
    }
    catch(e)
    {
        var error = e.message;
    }

    res.status(200).json({error: error, jwtToken: newToken});
});

app.post('/api/getParticipants', async (req, res, next) => {
    const db = client.db();
    const {eventID, jwtToken} = req.body;

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }
    
    var newToken = jwt.refresh(jwtToken);

    try
    {

        var participants = await(
            db.collection('Participants').find(
                {eventID: eventID}
            ).project(
                {userID:1, firstname:1, lastname:1}
            )
        ).toArray();

    }
    catch(e)
    {
        var error = e.message;
    }
    return res.status(200).json({error: error, participants: participants, jwtToken: newToken});  

});

app.post('/api/chooseTime', async (req, res, next) => {
    const db = client.db();
    const {eventID, eventTime, jwtToken} = req.body;

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }
    
    var newToken = jwt.refresh(jwtToken);
    var error = "";

    try
    {

        await db.collection('Events').updateOne(
            {eventID: eventID},
            {$set: {eventTime: eventTime}}
        );

    }
    catch(e)
    {
        error = e.message;
    }

    return res.status(200).json({error: error, jwtToken: newToken});

});

/*
events table with creator, eventid, eventname  
participants table with eventid, userid 
select blah from events where creator = userid 
select eventid from participants where userid = userid
select userid from participants where eventid = eventid
SELECT eventid, eventname FROM events WHERE creator=userid;
SELECT eventid, eventname FROM events WHERE participants 
*/

app.listen(process.env.PORT || 5000); // start Node + Express server on port 5000