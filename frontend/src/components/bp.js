exports.buildPath = function (route)
{
    const app_name = 'plannit-cop4331';

    if (process.env.NODE_ENV === 'production')
    {
        return 'https://' + app_name + '.herokuapp.com/' + route;
    }
    else
    {
        return 'http://localhost:5000/' + route;
    }
}
