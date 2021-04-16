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

  app.get('*', (req, res) => 
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
        return res.json({error: error});
    }

    return res.json({error: error});
});

app.post('/api/inviteUser', async(req, res, next) => {
    const {eventID, email, jwtToken} = req.body;
    const db = client.db();
    var error = '';
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    if (jwt.isExpired(jwtToken))
    {
        return res.status(200).json({error: "JWT token is no longer valid"});
    }

    var newToken = jwt.refresh(jwtToken);

    emailToken = jwtLib.sign(
    {
        eventID: eventID,
        email: email
    }, process.env.SENDGRID_API_KEY,
    {
        expiresIn: "1d"
    });
    try
    {
        const results = await db.collection('Invites').insertOne({email: email, eventID: eventID});
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
        sgMail.send(msg)
        .catch((err) => {
            error = err;
        })
    }
    catch(e)
    {
        console.log(e);
        error = e;
    }
    return res.json({error: error, jwtToken: newToken});
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
        db.collection('MyTypicalWeek').insertMany([ 
            {week: week,
             userID: userID}
        ]);

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

    const results = await(
        db.collection('MyTypicalWeek').find( 
            {userID: userID},
            {_id:0, week:1}
        )
    ).toArray();

    if (results.length > 0)
    {

        res.status(200).json({week: results[0].week, error: "", jwtToken: newToken});
        return;
    }
    else
    {
        res.status(200).json({error: "Could not find any week info", jwtToken: newToken});
    }
});

app.post('/api/createEvent', async (req, res, next) => {
    const db = client.db();
    const{creatorID, eventName, weekly, startTime, endTime, daysOfWeek, availability, jwtToken} = req.body;

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
            availability:availability
            }
        );

        var error = "";    
    }    
    catch(e)
    {
        var error = e.message;
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
                {creatorID: userID},
                {_id:1}
            )
        ).toArray();
        // to be implemented once we can insert into participants table
        
        // const participantEvents = await(
        //     db.collection('Participants').find(
        //         {userID: userID},
        //         {_id:0, eventID:1}
        //     )
        // ).toArray();

        var error = "";
    }
    catch(e)
    {
        var error = e.message;
    }

    res.status(200).json({creatorEvents: creatorEvents, participantEvents: null, error: error, jwtToken: newToken});
    
});

app.post('/api/viewEvent', async (req, res, next) => {
    const db = client.db();
    const{eventID, jwtToken} = req.body;

    if (jwt.isExpired(jwtToken))
    {
        res.status(200).json({error: "JWT token is no longer valid"});
        return;
    }

    var newToken = jwt.refresh(jwtToken);

    var participants = null;

    try 
    {
        var eventInfo = await(
            db.collection('Events').find(
                {_id: ObjectId(eventID)}
            )
        ).toArray();
    
        /* const participants = await(
            db.collection('Participants').find(
                {eventID: eventID},
                {_id:0, userID:1}
            )
            test
        ).toArray();
        */
        
        if (eventInfo.length <= 0)
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

    res.status(200).json({participants: participants, eventName: eventInfo[0].eventName, weekly: eventInfo[0].weekly, startTime: eventInfo[0].startTime, 
        endTime: eventInfo[0].endTime, daysOfWeek: eventInfo[0].daysOfWeek, availability: eventInfo[0].availability, error: error, jwtToken: newToken});
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
        db.collection('Participants').deleteOne({_id: userID, eventID: eventID});
        var error = "";
    }
    catch(e)
    {
        var error = e.message;
    }

    res.status(200).json({error: error, jwtToken: newToken});
});

app.post('/api/getParticipants', async (req, res, next) => {
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
                {eventID: eventID},
                {_id:0, }
            )
        ).toArray();
        var names = await db.collection('Users').find({ '_id': { $in: participants } });

    }
    catch(e)
    {
        var error = e.message;
    }
    return res.json({error: error, participants: names, jwtToken: newToken});  

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