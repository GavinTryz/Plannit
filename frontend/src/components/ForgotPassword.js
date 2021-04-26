import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
//import axios from 'axios';

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

    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    //redux
    //const userData = useSelector(state => state.userData);
    //const userJWT = useSelector(state => state.userJWT); 

    const dispatch = useDispatch();

    const handlePasswordRecovery = async event => 
    {
        event.preventDefault();

        var obj = {
            email:loginName.value,
            password:loginPassword.value,
        };
        var js = JSON.stringify(obj);

        //testing redux
        //dispatch(storeUser({userId: loginName.value, firstName: loginPassword.value, lastName: "lastname"}));

        try
        {    
            const response = await fetch(bp.buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.userID <= 0 )
            {
               setMessage('Email no registered');
            }
            else
            {
                //storing in redux
                dispatch(storeJWT(res.jwtToken));

                var ud = jwt.decode(res.jwtToken, {complete:true});
                dispatch(storeUser({userId: ud.payload.userId, firstName: ud.payload.firstName, lastName: ud.payload.lastName}));
                //

                storage.storeToken(res.jwtToken);

                setMessage('A temporary password has been sent to your email address');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
        <div className = 'backgroundLogin'><br />
            <div className= 'loginSection'>
                <span id = 'signInName'>Account recovery</span>
                <form onSubmit = {handlePasswordRecovery}>
                    <input className="inputTextField" type="email" placeholder="Email" ref={(c) => loginName = c} /><br />
                    <input id="loginButton" type="submit" class="buttons" value="Send email" onClick={handlePasswordRecovery} /><br />
                </form>
                <div id="loginResult">{message}</div>
            </div>
        </div>
    );
}

export default Login;
