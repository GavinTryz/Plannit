import React, {useState} from 'react';

function CreateAccount()
{   
    const storage = require('../tokenStorage.js');
    const bp = require('./bp.js');
    const jwt = require('jsonwebtoken');

    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [message,setMessage] = useState('');

    const doCreateAccount = async event => 
    {
        event.preventDefault();

        var obj = {
            firstname: userFirstName,
            lastname: userLastName,
            email: userEmail,
            password: userPassword
        };
        var js = JSON.stringify(obj);

            try
            {    
                const response = await fetch(bp.buildPath('api/register'),
                    {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                    
                var res = JSON.parse(await response.text());
    
                if(res.error)
                {
                   setMessage(res.error);
                }
                else
                {
                    setMessage('');
                    window.location.href = '/emailConfirmation';
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
                    <input id="first" className="inputTextField" type="text" placeholder="First Name" value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)} /><br />
                    <input id="last" className="inputTextField" type="text" placeholder="Last Name" value={userLastName} onChange={(e) => setUserLastName(e.target.value)} /><br />
                    <input id="email" className="inputTextField" type="email" placeholder="Email" value={userEmail} onChange={(e) => setUserEmail(e.target.value)} /><br />
                    <input id="password" className="inputTextField" type="password" placeholder="Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} /><br />
                    <input id="loginButton"  type="submit" class="buttons" value = "Create Account" onClick={doCreateAccount} /><br />
                </form>
                <div id="loginResult">{message}</div>
            </div>
        </div>
    );
}

export default CreateAccount;