exports.buildPath = function (route)
{
    const app_name = 'plannit';

    if (process.env.Node_ENV === 'production')
    {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else
    {
        return 'https://localhost:5000/' + route;
    }
}