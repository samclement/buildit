const test = require('tape')
const crawler = require('../../lib/crawler')

test(`crawl 'https://buildit.digital'`, (tt) => {
  crawler('https://buildit.digital', (err, results) => {
    const expected = [
      'https://buildit.digital/',
      'https://buildit.digital/about/',
      'https://buildit.digital/careers/',
      'https://buildit.digital/contact/'
    ]
    const firstItem = 'https://buildit.digital/'
    tt.plan(5)
    tt.equal(Array.isArray(results), true, `result should be an array`)
    tt.equal(results[0], expected[0], `first item of array should equal '${expected[0]}'`)
    tt.equal(results[1], expected[1], `second item of array should equal '${expected[1]}'`)
    tt.equal(results[2], expected[2], `third item of array should equal '${expected[2]}'`)
    tt.equal(results[3], expected[3], `fourth item of array should equal '${expected[3]}'`)
  })
})
