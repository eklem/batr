const test = require('ava')
const { add, subtract, multiply, divide } = require('../dist/batr-example.cjs.js')

test('addition a + b', (t) => {
  const expected = 31
  const addition = add(7, 24)
  t.deepEqual(addition, expected)
})

test('subtraction a - b', (t) => {
  const expected = -17
  const subtraction = subtract(7, 24)
  t.deepEqual(subtraction, expected)
})

test('multiplication a * b', (t) => {
  const expected = 168
  const multiplication = multiply(7, 24)
  t.deepEqual(multiplication, expected)
})

test('division a * b', (t) => {
  const expected = 0.2916666666666667
  const division = divide(7, 24)
  t.deepEqual(division, expected)
})
