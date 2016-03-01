'use strict'

// Load modules

const Code = require('code')
const Hapi = require('hapi')
const Lab = require('lab')
const apInsertPost = require('../routes/apInsertPost.js')
const appPassFile = require('../appPass.json')

// test shortcuts

const lab = exports.lab = Lab.script()
const describe = lab.describe
const it = lab.it
const expect = Code.expect

// start server

const server = new Hapi.Server({ debug: false })
server.connection()
server.route(apInsertPost)
server.start()

// test

describe.skip('/apInsert', () => {
  it('should insert in table ap 1 row with ApArtId 150', (done) => {
    const name = appPassFile.user
    server.inject({
      method: 'post',
      url: `/apInsert/apId=150/user=${name}`
    }, (res) => {
      expect(res.statusCode).to.equal(200)
      done()
    })
  })
})
