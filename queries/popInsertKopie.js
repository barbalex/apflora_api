'use strict'

const app = require(`ampersand-app`)
const escapeStringForSql = require(`./escapeStringForSql`)

module.exports = (request, callback) => {
  const apId = escapeStringForSql(request.params.apId)
  const popId = escapeStringForSql(request.params.popId)
  const user = escapeStringForSql(request.params.user) // der Benutzername
  const date = new Date().toISOString() // wann gespeichert wird

  // Zählungen der herkunfts-Kontrolle holen und der neuen Kontrolle anfügen
  const sql = `
    INSERT INTO
      apflora.pop (
        "PopNr",
        "PopName",
        "PopHerkunft",
        "PopHerkunftUnklar",
        "PopHerkunftUnklarBegruendung",
        "PopBekanntSeit",
        "PopXKoord",
        "PopYKoord",
        "PopGuid",
        "MutWann",
        "MutWer",
        "ApArtId"
      )
    SELECT
      "PopNr",
      "PopName",
      "PopHerkunft",
      "PopHerkunftUnklar",
      "PopHerkunftUnklarBegruendung",
      "PopBekanntSeit",
      "PopXKoord",
      "PopYKoord",
      "PopGuid",
      '${date}',
      '${user}',
      ${apId}
    FROM
      apflora.pop
    WHERE
      "PopId" = ${popId}
    RETURNING
      apflora.pop."PopId"`

  app.db.one(sql)
    .then(row => callback(null, row.PopId))
    .catch(error => callback(error, null))
}
