'use strict'

const escapeStringForSql = require(`./escapeStringForSql`)

module.exports = (request, callback) => {
  const apId = escapeStringForSql(request.params.apId)
  const X = escapeStringForSql(request.params.X)
  const Y = escapeStringForSql(request.params.Y)
  const sql = `
    SELECT
      apflora.pop."PopNr",
      apflora.tpop."TPopNr",
      apflora.tpop."TPopId",
      apflora.tpop."TPopFlurname",
      SQRT(
        power(${X} - apflora.tpop."TPopXKoord", 2) +
        power(${Y} - apflora.tpop."TPopYKoord", 2)
      ) AS "DistZuTPop"
    FROM apflora.pop
      INNER JOIN
        apflora.tpop
        ON apflora.pop."PopId" = apflora.tpop."PopId"
    WHERE
      apflora.pop."ApArtId" = ${apId}
      AND apflora.tpop."TPopXKoord" IS NOT NULL
      AND apflora.tpop."TPopYKoord" IS NOT NULL
    ORDER BY
      "DistZuTPop"
    LIMIT 1`
  request.pg.client.query(sql, (error, result) => callback(error, result.rows))
}
