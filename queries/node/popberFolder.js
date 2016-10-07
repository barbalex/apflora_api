'use strict'

const app = require(`ampersand-app`)

module.exports = (request, callback) => {
  let id = encodeURIComponent(request.query.id)

  if (id) {
    id = parseInt(id, 0)
  }

  app.db.any(`
    SELECT
      "PopBerId",
      apflora.popber."PopId",
      "PopBerJahr",
      "EntwicklungTxt",
      "EntwicklungOrd",
      apflora.ap."ApArtId",
      apflora.ap."ProjId"
    FROM
      apflora.popber
      LEFT JOIN
        apflora.pop_entwicklung_werte
        ON "PopBerEntwicklung" = "EntwicklungId"
      INNER JOIN
        apflora.pop
        ON apflora.popber."PopId" = apflora.pop."PopId"
        INNER JOIN
          apflora.ap
          ON apflora.pop."ApArtId" = apflora.ap."ApArtId"
    WHERE
      apflora.popber."PopId" = ${id}
    ORDER BY
      "PopBerJahr",
      "EntwicklungOrd"`
  )
    .then(apListe =>
      apListe.map(el => ({
        nodeId: `popber/${el.PopBerId}`,
        table: `popber`,
        id: el.PopBerId,
        name: `${el.PopBerJahr ? `${el.PopBerJahr}` : `(kein Jahr)`}: ${el.EntwicklungTxt ? `${el.EntwicklungTxt}` : `(nicht beurteilt)`}`,
        expanded: false,
        urlPath: [`Projekte`, el.ProjId, `Arten`, el.ApArtId, `Populationen`, id, `Kontroll-Berichte`, el.PopBerId],
      }))
    )
    .then(nodes => callback(null, nodes))
    .catch(error => callback(error, null))
}
