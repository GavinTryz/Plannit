import React, { useState } from 'react';

import {useDispatch} from 'react-redux';
import {toggleEmailState} from '../actions';

function TokenForm()
{
    const bp = require('./bp.js');
    const dispatch = useDispatch();
    const [message,setMessage] = useState('');

    var emailToken;
    var newPassword;

    const newPasswordCheck = async event => 
    {
        event.preventDefault();

        var obj = {
            password: newPassword.value,
            token: emailToken.value
        };
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/sendReset'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error )
               setMessage('Confirmation number is incorrect');

            else {
                dispatch(toggleEmailState());
                setMessage('Your password has sucessfully been reset');
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
            <form onSubmit = {newPasswordCheck}>
                <input className="inputTextField" type="text" placeholder="Confirmation Number" ref={(c) => emailToken = c} /><br />
                <input className="inputTextField" type="password" placeholder="Password" ref={(c) => newPassword = c} /><br />
                <input id="loginButton" type="submit" class="buttons" value="Reset Password" onClick={newPasswordCheck} /><br />
            </form>
            <div id="loginResult">{message}</div>
        </div>
    );
}

export default TokenForm;