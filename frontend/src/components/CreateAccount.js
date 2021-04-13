import React, {useState} from 'react';

function CreateAccount()
{   
    const storage = require('../tokenStorage.js');
    const bp = require('./bp.js');
    const jwt = require('jsonwebtoken');

    var userFirstName;
    var userLastName;
    var userEmail;
    var userPassword;

    const [message,setMessage] = useState('');

    const doCreateAccount = async event => 
    {
        event.preventDefault();

        var obj = {
            firstname: userFirstName.value,
            lastname: userLastName.value,
            email: userEmail.value,
            password: userPassword.value
        };
        var js = JSON.stringify(obj);

            try
            {    
                const response = await fetch(bp.buildPath('api/register'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    
                var res = JSON.parse(await response.text());
    
                if( res.error)
                {
                   setMessage('Email already registered');
                }
                else
                {
                    setMessage('');
                    window.location.href = '/login';
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
                <span id = 'signInName'>Plannit Create Account</span>
                <form onSubmit = {doCreateAccount}>
                    <input className="inputTextField" type="text" placeholder="First Name" ref={(c) => userFirstName = c} /><br />
                    <input className="inputTextField" type="text" placeholder="Last Name" ref={(c) => userLastName = c} /><br />
                    <input className="inputTextField" type="email" placeholder="Email" ref={(c) => userEmail = c} /><br />
                    <input className="inputTextField" type="password" placeholder="Password" ref={(c) => userPassword = c} /><br />
                    <input id="loginButton"  type="submit" class="buttons" value = "Create Account" onClick={doCreateAccount} /><br />
                </form>
                <div id="loginResult">{message}</div>
            </div>
        </div>
    );
}

export default CreateAccount;