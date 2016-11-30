const test = require('tape')
const crawler = require('../../lib/crawler')

test(`crawl 'https://buildit.digital'`, (tt) => {
  crawler('https://buildit.digital', (err, results) => {
    const firstItem = 'https://buildit.digital'
    tt.plan(2)
    tt.equal(Array.isArray(results), true, `result should be an array`)
    tt.equal(results[0], firstItem, `first item of array should equal '${firstItem}'`)
  })
})
