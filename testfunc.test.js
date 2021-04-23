// npm i -D jest
//@jest-environment node

const functions = require('./testfunc');

test('Adds 2 + 2 to equal 4', () => {
    expect(functions.add(2, 2)).toBe(4);
});

test('Wacky fake API test', () =>{
    expect.assertions(1);
    return functions.fetchUser()
      .then(data => {
        expect(data.name).toEqual('Leanne Graham');
      })
});