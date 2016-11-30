const test = require('tape')
const crawler = require('../../lib/crawler')

test('crawler', (t) => {
  t.plan(2)
  t.throws(function() { crawler('f') }, /Not a valid url/, `should throw an error if passed an 'f' character`)
  t.throws(function() { crawler('/') }, /Not a valid url/, `should throw an error if passed a '/'`)
})
