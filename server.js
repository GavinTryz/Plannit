const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://root:7eW0JKa3jcmQNXot@cluster0.abrob.mongodb.net/Plannit?retryWrites=true&w=majority';
const client = new MongoClient(url);
client.connect();
const mongoose = require('mongoose');

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
    
    console.log(results);

    var userID = -1;
    var firstname = '';
    var lastname = '';
    var error = '';


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
        }
        
    }
    else
    {
        error = "Login or password is incorrect";
    }

    
    res.json({firstname: firstname, lastname: lastname, userID: userID, error: error});
})

app.post('/api/register', async (req, res, next) => {
    const {firstname, lastname, email, password} = req.body;
    const db = client.db();
    var error = '';
    const results = await(db.collection('Users').find( {email : email} )).toArray();
    
    if (results.length > 0)
    {
        console.log(results);
        res.status(200).json({
            error: "The user already exists"
        });
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
            error = e.toString();
        }
        res.status(200).json({error: error});
    }
    
})
app.listen(5000); // start Node + Express server on port 5000