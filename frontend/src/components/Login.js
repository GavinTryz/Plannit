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

        var obj = {
            email:loginName.value,
            password:loginPassword.value
        };
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch('http://localhost:5000/api/login',
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
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
                <span id = 'signInName'>Plannit Sign In</span>
                <form onSubmit = {doLogin}>
                    <input id = 'textField' type="text" id="loginName" placeholder="Username" ref={(c) => loginName = c} /><br />
                    <input id = 'textField' type="password" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                    <input type="submit" id="loginButton" class="buttons" value = "Sign In" onClick={doLogin} /><br />
                </form>
                <div id="loginResult">{message}</div>
                <span className = 'linkTextTitle'>Forgot password?</span>
                <Link><a className = 'linkText'>click here</a></Link><br/>
                <span className = 'linkTextTitle'>No account?</span>
                <Link to ='/createaccount'><a className = 'linkText'>create one!</a></Link>
                
                
            </div>
        </div>

    );
}
export default Login;