'use strict'

const mysql = require('mysql')
const config = require('../configuration')
const escapeStringForSql = require('./escapeStringForSql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: config.db.userName,
  password: config.db.passWord,
  database: 'apflora'
})

module.exports = (request, callback) => {
  var apId = escapeStringForSql(request.params.apId)

  connection.query(
    'SELECT apflora.ap.ApArtId, apflora_beob.adb_eigenschaften.Artname, apflora.ap.ApStatus, apflora.ap.ApJahr, apflora.ap.ApUmsetzung, apflora.ap.ApBearb, apflora.ap.ApArtwert, apflora.ap.MutWann, apflora.ap.MutWer FROM apflora.ap INNER JOIN apflora_beob.adb_eigenschaften ON apflora.ap.ApArtId = apflora_beob.adb_eigenschaften.TaxonomieId WHERE ApArtId = ' + apId,
    (err, data) => callback(err, data)
  )
}
