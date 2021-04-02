const jwt = require('jsonwebtoken');
require("dotenv").config();

var createToken = exports.createToken = function(fn, ln, id)
{
    try
    {
        const expiration = new Date();
        const user = {userId:id, firstName:fn, lastName:ln};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    
        var ret = accessToken;
    }
    catch(e)
    {
        var ret = e.message;
    }
    return ret;
}

exports.isExpired = function(token)
{
    var isError = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, verifiedJWT) =>
    {
        if (err)
        {
            console.log(err);
            return true;
        }
        else
        {
            return false;
        }

    });

    return isError;
}

exports.refresh = function(token)
{
    var ud = jwt.decode(token, {complete:true});

    var userId = ud.payload.id;
    var firstName = ud.payload.firstName;
    var lastName = ud.payload.lastName;

    var token = createToken(firstName,lastName,userId);

    return token;
}