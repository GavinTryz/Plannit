import React, { useState, useEffect } from 'react';
import {Link } from 'react-router-dom';

function ForgotPassword()
{


    const bp = require('./bp.js');
    const [message,setMessage] = useState('');
    const [sentEmail,setSentEmail] = useState(true);

    /*const [resetForm,setResetForm] = 
    useState(<div>
                <form>
                    <input className="inputTextField" type="email" placeholder="Email" ref={(c) => userEmail = c} /><br />
                    <input id="loginButton" type="submit" class="buttons" value="Continue" onClick={setSentEmail(false)} /><br />
                </form>
                <div id="loginResult">{message}</div>
            </div>);*/

        const resetForm = setForm;

    function setForm(){
        return (
            <div>
                <form>
                    <input className="inputTextField" type="email" placeholder="Email" ref={(c) => userEmail = c} /><br />
                    <input id="loginButton" type="submit" class="buttons" value="Continue" onClick={setSentEmail(false)} /><br />
                </form>
                <div id="loginResult">{message}</div>
            </div>
        )
    }

    var Form1 = <div>
    <form>
        <input className="inputTextField" type="email" placeholder="Email" ref={(c) => userEmail = c} /><br />
        <input id="loginButton" type="submit" class="buttons" value="Continue" onClick={setSentEmail(false)} /><br />
    </form>
    <div id="loginResult">{message}</div>
</div>

    var userEmail;
    var emailToken;
    var newPassword;

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
                setSentEmail(false);
                setMessage('A confirmation code has been sent to your email address');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

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
                setSentEmail(false);
                setMessage('Your password has sucessfully been reset');
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }    
    };

    /*var resetForm = 
    <div>
        <form>
            <input className="inputTextField" type="email" placeholder="Email" ref={(c) => userEmail = c} /><br />
            <input id="loginButton" type="submit" class="buttons" value="Continue" onClick={setSentEmail(false)} /><br />
        </form>
        <div id="loginResult">{message}</div>
    </div>;

    function showComponent(){
        if (!sentEmail) {
            resetForm =        
                <div>
                    <form onSubmit = {newPasswordCheck}>
                        <input className="inputTextField" type="text" placeholder="Confirmation Number" ref={(c) => emailToken = c} /><br />
                        <input className="inputTextField" type="password" placeholder="Password" ref={(c) => newPassword = c} /><br />
                        <input id="loginButton" type="submit" class="buttons" value="Reset Password" onClick={newPasswordCheck} /><br />
                    </form>
                    <div id="loginResult">{message}</div>
                </div>
        }
    }*/

    

    useEffect(()=>{
        setSentEmail(true);
        setForm();
        //showComponent();
    }, [])


    return(
        <div className = 'backgroundLogin'><br />
            <div className= 'loginSection'>
                <span id = 'signInName'>Reset Password</span>
                    {resetForm}
            </div>
        </div>
    );
}

export default ForgotPassword;
