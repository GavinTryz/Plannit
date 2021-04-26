import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import axios from 'axios';

//redux
import {/*useSelector,*/ useDispatch} from 'react-redux';
import {storeUser, storeJWT} from '../actions';

function Login()
{
    const storage = require('../tokenStorage.js');
    const bp = require('./bp.js');
    const jwt = require('jsonwebtoken');

    var tok = storage.retrieveToken();
    //var ud = jwt.decode(tok, {complete: true});

    const [email, setEmail] = useState('');
    const [message,setMessage] = useState('');

    //redux
    //const userData = useSelector(state => state.userData);
    //const userJWT = useSelector(state => state.userJWT); 

    const dispatch = useDispatch();

    const handlePasswordRecovery = async event => 
    {
        event.preventDefault();

        var obj = {
            email:email
        };

        //testing redux
        //dispatch(storeUser({userId: loginName.value, firstName: loginPassword.value, lastName: "lastname"}));

        axios.post(bp.buildPath('api/sendReset'), obj) 
        .then((res) => {
            if(res.error)
            {
                setMessage(res.error);
            }
            else 
            {
                setMessage('Email sent!');
            }
        })
        .catch((error) => {
            setMessage('There was an error please try again');
        })
    };

    return(
        <div className = 'backgroundLogin'><br />
            <div className= 'loginSection'>
                <span id = 'signInName'>Account recovery</span>
                <form onSubmit = {handlePasswordRecovery}>
                    <input className="inputTextField" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} /><br />
                    <input id="loginButton" type="submit" class="buttons" value="Send email" onClick={handlePasswordRecovery} /><br />
                </form>
                <div id="loginResult">{message}</div>
            </div>
        </div>
    );
}

export default Login;
