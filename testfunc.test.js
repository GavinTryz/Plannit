// npm i -D jest

const functions = require('./testfunc');

test('Adds 2 + 2 to equal 4', () => {
    expect(functions.add(2, 2)).toBe(4);
});