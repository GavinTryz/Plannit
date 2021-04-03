import React, { useState } from 'react';
import {Link } from 'react-router-dom';
//import axios from 'axios';


function Login()
{
    //const storage = require('../tokenStorage.js');
    const bp = require('./bp.js');

    const jwt = require('jsonwebtoken');

    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    //new redux
    const userData = useSelector(state => state.userData);
    const counter = useSelector(state => state.counter);
    const dispatch = useDispatch();

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
            const response = await fetch(bp.buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
                /*
           var config = 
           {
               method: 'post',
               url: bp.buildPath('api/login'),
               headers: 
               {
                   'Content-Type': 'application/json'
               },
               data: js
           };
    
           axios(config)
               .then(function (response) 
               {
                   var res = response.data;
                   // console.log(response)
                   if (res.error) 
                   {
                       setMessage('User/Password combination incorrect');
                   }
                   else 
                   {
                       storage.storeToken(res);
                       window.location.href = '/dashboard';
                   }
    
               })
               .catch(function (error) 
               {
                   console.log(error);
               });
            }
            catch(e)
            {
                console.log(e.message);
            }
    */

            var res = JSON.parse(await response.text());

            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                //var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                //localStorage.setItem('user_data', JSON.stringify(user));

                //storage.storeToken(res);

                //redux store
                dispatch(store(res));

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