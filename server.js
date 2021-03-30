require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URL;
const client = new MongoClient(url);
client.connect();

const mongoose = require('mongoose');
const jwt = require('./createJWT');

const cors = require('cors');
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

app.post('/api/login', async (req, res, next) => {
    const {email, password} = req.body;
    const db = client.db();
    const results = await(db.collection('Users').find({email: email, password: password})).toArray();

    var userID = -1;
    var firstname = '';
    var lastname = '';
    var error = '';

    var ret = "";


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
})

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
        try
        {
            db.collection('Users').insertMany([ 
               {firstname: firstname,
                lastname: lastname,
                email: email,
                password: password,
                verified: false}
            ]);
        }    
        catch(e)
        {
            error = e.message;
        }
        res.status(200).json({error: error});
    }
    
})

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
        db.collection('Blocks').insertMany([ 
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
        db.collection('Blocks').find( 
            {userID: userID},
            {_id:0, week:1}
        )
    ).toArray();

    if (results.length > 0)
    {
        res.status(200).json({results: results, error: "", jwtToken: newToken});
        return;
    }
    else
    {
        res.status(200).json({error: "Could not find any week info", jwtToken: newToken});
    }
});

app.listen(5000); // start Node + Express server on port 5000