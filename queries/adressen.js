'use strict'

const pg = require('pg')
const dbPass = require('../pgDbPass.json')
const user = dbPass.user
const pwd = dbPass.pass
const connectionString = `postgres://${user}:${pwd}@localhost/apflora`

module.exports = (request, callback) => {
  // get a pg client from the connection pool
  pg.connect(connectionString, (error, apfDb, done) => {
    if (error) {
      if (apfDb) done(apfDb)
      console.log('an error occured when trying to connect to db apflora')
    }
    const sql = `
      SELECT
        "AdrId" AS id,
        "AdrName"
      FROM
        apflora.adresse
      ORDER BY
        "AdrName"`
    apfDb.query(sql, (error, result) => {
      callback(error, result.rows)
    })
  })
}
