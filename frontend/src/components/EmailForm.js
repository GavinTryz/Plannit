import React, { useState } from 'react';

import {useDispatch} from 'react-redux';
import {toggleEmailState} from '../actions';


function EmailForm()
{
    const bp = require('./bp.js');
    const dispatch = useDispatch();
    const [message,setMessage] = useState('');

    var userEmail;

    const handlePasswordRecovery = async event => 
    {
        event.preventDefault();

        var obj = {
            email:userEmail.value,
        };
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/sendReset'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.userID <= 0 )
            {
               setMessage('Email is not registered');
            }
            else
            {
                dispatch(toggleEmailState());
                setMessage('A confirmation code has been sent to your email address');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    return(
        <div>
            <form onSubmit = {handlePasswordRecovery}>
                <input className="inputTextField" type="email" placeholder="Email" ref={(c) => userEmail = c} /><br />
                <input id="loginButton" type="submit" class="buttons" value="Continue" onClick={dispatch(toggleEmailState())} /><br />
            </form>
            <div id="loginResult">{message}</div>
        </div>
    );
}

export default EmailForm;