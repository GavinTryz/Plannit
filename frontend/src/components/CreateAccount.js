import React, { useState } from 'react';
import {Link } from 'react-router-dom';

function CreateAccount()
{   
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
            email: userEmail,
            password: userPassword.value
        };
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/register',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('Account already exists');
            }
            else
            {
                // Probably we need to change this.
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));

                setMessage('');
                window.location.href = '/dashboard';
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
                    <input id = 'textField' type="text" id="loginName" placeholder="First Name" ref={(c) => userFirstName = c} /><br />
                    <input id = 'textField' type="text" id="loginName" placeholder="Last Name" ref={(c) => userLastName = c} /><br />
                    <input id = 'textField' type="text" id="loginName" placeholder="Email" ref={(c) => userEmail = c} /><br />
                    <input id = 'textField' type="password" id="loginPassword" placeholder="Password" ref={(c) => userPassword = c} /><br />
                    <input type="submit" id="loginButton" class="buttons" value = "Create Account" onClick={doCreateAccount} /><br />
                </form>
                <div id="loginResult">{message}</div>
            </div>
        </div>
    );
}

export default CreateAccount;