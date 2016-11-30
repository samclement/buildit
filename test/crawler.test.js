const test = require('tape')
const crawler = require('../lib/crawler')

test('crawler', (t) => {
  t.plan(2)
  t.throws(function() { crawler('f') }, /Not a valid url/, `should throw an error if passed an 'f' character`)
  t.throws(function() { crawler('/') }, /Not a valid url/, `should throw an error if passed a '/'`)

  test(`crawl 'https://buildit.digital'`, (tt) => {
    crawler('https://buildit.digital', (err, results) => {
      const firstItem = 'https://buildit.digital/'
      tt.plan(2)
      tt.equal(Array.isArray(results), true, `result should be an array`)
      tt.equal(results[0], firstItem, `first item of array should equal '${firstItem}'`)
    })
  })
})
