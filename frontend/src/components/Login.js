import React, { useState } from 'react';
import {Link } from 'react-router-dom';
import jwt_decode from "jwt-decode";
//import axios from 'axios';

//redux
import {/*useSelector,*/ useDispatch} from 'react-redux';
import {storeUser, storeJWT} from '../actions';


function Login()
{
    const storage = require('../tokenStorage.js');
    const bp = require('./bp.js');
    const jwt = require('jsonwebtoken');

    var tok = storage.retrieveToken();
    //var ud = jwt.decode(tok, {complete: true});

    var loginName;
    var loginPassword;

    const [message,setMessage] = useState('');

    //redux
    //const userData = useSelector(state => state.userData);
    //const userJWT = useSelector(state => state.userJWT);
    const dispatch = useDispatch();

    const doLogin = async event => 
    {
        event.preventDefault();

        var obj = {
            email:loginName.value,
            password:loginPassword.value,
        };
        var js = JSON.stringify(obj);

        try
        {    
            const response = await fetch(bp.buildPath('api/login'),
                {method:'POST',body:js,headers:{'Content-Type': 'application/json'}});
                
        // ====================================================================================
        //                             CODE FOR AXIOS IMPLEMENTATION
        // ====================================================================================                           

        //    var config = 
        //    {
        //        method: 'post',
        //        url: bp.buildPath('api/login'),
        //        headers: 
        //        {
        //            'Content-Type': 'application/json'
        //        },
        //        data: js
        //    };
        //    axios(config)
        //        .then(function (response) 
        //        {
        //            var res = response.data;
        //            // console.log(response)
        //            if (res.error) 
        //            {
        //                setMessage('User/Password combination incorrect');
        //            }
        //            else 
        //            {
        //                storage.storeToken(res);
        //                window.location.href = '/dashboard';
        //            }
        //        })
        //        .catch(function (error) 
        //        {
        //            console.log(error);
        //        });
        //     }
        //     catch(e)
        //     {
        //         console.log(e.message);
        //     }
    
            var res = JSON.parse(await response.text());

            if( res.userID <= 0 )
            {
               setMessage('User/Password combination incorrect');
            }
            else
            {
                //storing in redux
                dispatch(storeJWT(res.jwtToken));

                var ud = jwt.decode(res.jwtToken, {complete:true});
                dispatch(storeUser({userId: ud.payload.userId, firstName: ud.payload.firstName, lastName: ud.payload.lastName}));
                //

                storage.storeToken(res);

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
                    <input className="inputTextField" type="email" placeholder="Email" ref={(c) => loginName = c} /><br />
                    <input className="inputTextField" type="password" placeholder="Password" ref={(c) => loginPassword = c} /><br />
                    <input id="loginButton" type="submit" class="buttons" value="Sign In" onClick={doLogin} /><br />
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
