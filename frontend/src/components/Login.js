import React, { useState } from 'react';
import {Link } from 'react-router-dom';

function Login()
{

    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    const doLogin = async event =>
    {
        event.preventDefault();

        // This line is for testing. It'll be removed 
        alert('doIt() ' + loginName.value + ' ' + loginPassword.value );

        var obj = {
            login:loginName.value,
            password:loginPassword.value
        };
        var js = JSON.stringify(obj);

        /*
        try
        {
            const response = await fetch(buioldPath('api/login')),
                {method: 'POST', body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());
            if (res.id <= 0)
            {
                setMessage('User password combination incorrect');
            }
        }
        */
    }

    return(
        <div className = 'backgroundLogin'><br />
            <div className= 'loginSection'>
                <span id = 'signInName'>Plannit Sign In</span>
                <form onSubmit = {doLogin}>
                    <input id = 'textField' type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
                    <input id = 'textField' type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                    <input type="submit" id="loginButton" class="buttons" value = "Sign In" onClick={doLogin} /><br />
                    <span className = 'linkTextTitle'>Forgot password?</span>
                    <Link><a className = 'linkText'>click here</a></Link><br/>
                    <span className = 'linkTextTitle'>No account?</span>
                    <Link to ='/createaccount'><a className = 'linkText'>create one!</a></Link>
                </form>
                <span id="loginResult">{message}</span>
            </div>
        </div>

    );
}
export default Login;