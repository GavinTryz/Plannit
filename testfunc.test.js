// npm i -D jest
//@jest-environment node

const functions = require('./testfunc');
const axios = require('axios');
const bp = require('./frontend/src/components/bp');

test('Adds 2 + 2 to equal 4', () => {
    expect(functions.add(2, 2)).toBe(4);
});

test('login test', async () =>{

    var response;
    var error;
    axios
        .post(bp.buildPath('/api/login'), 
            { email: "test", password: "password" }
        )
        .then(res =>
        {
            response = res;
        })
        .catch(err => 
        {
            error = err;
        });
      
    expect(response.error).toEqual("");
    expect(response.jwtToken).toBeDefined();
});