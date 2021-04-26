import React, { useState } from 'react';

function ResetPassword()
{
    const bp = require('./bp.js');
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
            const response = await fetch(bp.buildPath('api/resetPassword'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.error )
               setMessage('Confirmation number is incorrect');

            else {
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
        <div className = 'backgroundLogin'><br />
            <div className= 'loginSection'>
                <span id = 'signInName'>Password Reset</span>
                    <div>
                        <form onSubmit = {newPasswordCheck}>
                            <input className="inputTextField" type="text" placeholder="Confirmation Number" ref={(c) => emailToken = c} /><br />
                            <input className="inputTextField" type="password" placeholder="Password" ref={(c) => newPassword = c} /><br />
                            <input id="loginButton" type="submit" class="buttons" value="Reset Password" onClick={newPasswordCheck} /><br />
                        </form>
                        <div id="loginResult">{message}</div>
                    </div>
            </div>
        </div>
    );
}

export default ResetPassword;