const test = require('node:test');
const assert = require('node:assert/strict');
const { add, subtract, multiply, divide } = require('../calculator');

test('add should sum two numbers', () => {
  assert.equal(add(1, 2), 3);
});

test('subtract should subtract two numbers', () => {
  assert.equal(subtract(5, 3), 2);
});

test('multiply should multiply two numbers', () => {
  assert.equal(multiply(4, 3), 12);
});

test('divide should divide two numbers', () => {
  assert.equal(divide(10, 2), 5);
});

test('divide should throw on division by zero', () => {
  assert.throws(() => divide(10, 0), /Division by zero/);
});

test('operations should throw on invalid numbers', () => {
  assert.throws(() => add('a', 2), /valid numbers/);
});
