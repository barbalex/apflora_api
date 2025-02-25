'use strict'

// Load modules

const Code = require(`code`)
const Lab = require(`lab`)

// test shortcuts

const lab = Lab.script()
exports.lab = lab
const describe = lab.describe
const it = lab.it
const expect = Code.expect

// start server

const server = require(`../server.js`)

// test

describe(`/beobNaechsteTpop`, () => {
  it(`should return one TPop for ApId 206200 and a set of koordinates`, (done) => {
    const method = `GET`
    const url = `/beobNaechsteTpop/apId=206200/X=682226/Y=268513`
    server.injectThen({ method, url })
      .then((res) => {
        expect(res.result.length).to.equal(1)
        done()
      })
  })
})
