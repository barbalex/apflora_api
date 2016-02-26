'use strict'

const pg = require('pg')
const config = require('../configuration')
const connectionString = config.pg.connectionString
const escapeStringForSql = require('./escapeStringForSql')

module.exports = (request, callback) => {
  const view = escapeStringForSql(request.params.view) // Name des Views, aus dem die Daten geholt werden sollen
  const apId = escapeStringForSql(request.params.apId)
  const sql = apId ? `SELECT * FROM views.${view} WHERE "ApArtId" = ${apId}` : `SELECT * FROM views.${view}`

  // get a pg client from the connection pool
  pg.connect(connectionString, (error, apfDb, done) => {
    if (error) {
      if (apfDb) done(apfDb)
      console.log('an error occured when trying to connect to db apflora')
    }
    apfDb.query(sql, (error, result) => {
      if (error) callback(error, null)
      // null-werte eliminieren
      const data = result.rows
      data.forEach((object) => {
        Object.keys(object).forEach((key) => {
          if (object[key] === null) object[key] = ''
        })
      })
      callback(error, data)
    })
  })
}
