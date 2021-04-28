exports.storeToken = function ( tok )
{
    try
    {
      sessionStorage.setItem('user_data', tok);
    }
    catch(e)
    {
      console.log(e.message);
    }
}

exports.retrieveToken = function ()
{
    var ud;
    try
    {
      ud = sessionStorage.getItem('user_data');
    }
    catch(e)
    {
      console.log(e.message);
    }
    return ud;
}
