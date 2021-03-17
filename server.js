const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const app = express();

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
    const {login, password} = req.body;
    res.json({login: login, password: password});
})

app.post('/api/register', async (req, res, next) => {
    const {firstname, lastname, email, password} = req.body;
    res.json({firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
    });
})
app.listen(5000); // start Node + Express server on port 5000