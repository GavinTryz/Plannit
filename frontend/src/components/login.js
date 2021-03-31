import React from 'react';

//do npm install redux react-redux

function Login()
{
  const storage = require('../tokenStorage/js');
  const bp = require('./bp.js');
  
  var loginName;
  var loginPassword;
  
  const [message.setMessage] = useState('');
  
  const doLogin = async event =>
  {
      event.preventDefault();

      var obj = {login:loginName.value, password:loginPassword.value};
      var js = JSON.stringify(obj);

      try
      {
        const response = await fetch(bp.buildPath('api/login'), //EDIT FILE NAME
             {method:'POST', body:js, headers:{'Content-Type' : 'application/json'}});    //IS API USING POST?

        var res = JSON.parse(await response.text());

        if( res.id <= 0 )
        {
          setMessage('User/Password combination incorrect');
        }
        else
        {
          //var user = {firstName:res.firstName, lastName:res.lastName, id:res.id}
          //localStorage.setItem('user_data', JSON.stringify(user));

          storage.storeToken(res;)

          setMessage('');
          window.location.href = ''; //SET NEW PAGE LOCATION
        }
      }
      catch(e)
      {
          alert(e.toString());
          return;
      }
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
