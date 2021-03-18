import React from 'react';

function Login()
{
 


    var loginName;
    var loginPassword;

    const doLogin = async event =>
    {
        event.preventDefault();

        var obj = {
            login:loginName.value,
            password:loginPassword.value
        };
        var js = JSON.stringify(obj);


        alert('yes it is working!');
    }
    return(
        <div><br />

        
        <div className= 'loginSection'>
            <span>Plannit Sign In</span>
            <form onSubmit = {doLogin}>
                <input type="text" id="loginName" placeholder="Username" /><br />
                <input type="password" id="loginPassword" placeholder="Password" /><br />
                <input type="submit" id="loginButton" class="buttons" value = "Sign In" onClick={doLogin} /><br />
                <span>Forgot username/password?</span>
                <a>click here</a><br/>
                <span>No account?</span>
                <a>create one!</a>
            </form>
            <span id="loginResult"></span>
        </div>

        </div>

    );
}
export default Login;