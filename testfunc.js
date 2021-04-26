const axios = require('axios');
const bp = require('./frontend/src/components/bp');

const functions = {
    add: (num1, num2) => num1 + num2,
    testLogin: (email, password) => 
    {
        var response;
        var error;
        axios
            .post(bp.buildPath('/api/login'), 
                { email: email, password: password }
            )
            .then(res =>
            {
                response = res;
            })
            .catch(err => 
            {
                error = err;
            });
            return(response, error);
    }
};

module.exports = functions;