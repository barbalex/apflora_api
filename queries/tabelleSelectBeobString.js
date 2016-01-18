'use strict'

const mysql = require('mysql')
const config = require('../configuration')
const escapeStringForSql = require('./escapeStringForSql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: config.db.userName,
  password: config.db.passWord,
  database: 'apflora_beob'
})

module.exports = (request, callback) => {
  const tabelle = escapeStringForSql(request.params.tabelle) // der Name der Tabelle, aus der die Daten geholt werden sollen
  const feld = escapeStringForSql(request.params.feld) // das ist der Name des Feldes, das verglichen wird
  const wert = escapeStringForSql(request.params.wert) // der Wert im Feld, das verglichen wird

  connection.query(
    `SELECT * FROM ${tabelle} WHERE ${feld} = "${wert}"`,
    (err, data) => callback(err, data)
  )
}
