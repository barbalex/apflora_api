'use strict'

const app = require(`ampersand-app`)

module.exports = (request, callback) => {
  let id = encodeURIComponent(request.query.id)

  if (id) {
    id = parseInt(id, 0)
  }

  app.db.oneOrNone(`
    SELECT
      apflora.tpop.*,
      apflora.pop."PopId",
      apflora.ap."ProjId",
      apflora.ap."ApArtId",
      (
        SELECT
          COUNT(*)
        FROM
          apflora.tpopmassn
        WHERE
          apflora.tpopmassn."TPopId" = apflora.tpop."TPopId"
      ) AS "AnzTPopmassn",
      (
        SELECT
          COUNT(*)
        FROM
          apflora.tpopmassnber
        WHERE
          apflora.tpopmassnber."TPopId" = apflora.tpop."TPopId"
      ) AS "AnzTPopmassnber",
      (
        SELECT
          COUNT(*)
        FROM
          apflora.tpopkontr
        WHERE
          apflora.tpopkontr."TPopId" = apflora.tpop."TPopId"
          AND (
           "TPopKontrTyp" <> 'Freiwilligen-Erfolgskontrolle'
           OR "TPopKontrTyp" IS NULL
          )
      ) AS "AnzTPopfeldkontr",
      (
        SELECT
          COUNT(*)
        FROM
          apflora.tpopkontr
        WHERE
          apflora.tpopkontr."TPopId" = apflora.tpop."TPopId"
          AND "TPopKontrTyp" = 'Freiwilligen-Erfolgskontrolle'
      ) AS "AnzTPopfreiwkontr",
      (
        SELECT
          COUNT(*)
        FROM
          apflora.tpopber
        WHERE
          apflora.tpopber."TPopId" = apflora.tpop."TPopId"
      ) AS "AnzTPopber",
      (
        SELECT
          COUNT(*)
        FROM
          apflora.beobzuordnung
        WHERE
          apflora.beobzuordnung."TPopId" = apflora.tpop."TPopId"
      ) AS "AnzTPopbeobzuordnung"
    FROM
      apflora.tpop
      INNER JOIN
        apflora.pop
        ON apflora.pop."PopId" = apflora.tpop."PopId"
        INNER JOIN
          apflora.ap
          ON apflora.ap."ApArtId" = apflora.pop."ApArtId"
    WHERE
      apflora.tpop."TPopId" = ${id}
    `
  )
  .then(row => [
    // tpopmassn folder
    {
      nodeId: `tpop/${id}/tpopmassn`,
      folder: `tpopmassn`,
      table: `tpop`,
      row,
      id,
      label: `Massnahmen (${row.AnzTPopmassn})`,
      expanded: false,
      children: [0],
      urlPath: [`Projekte`, row.ProjId, `Arten`, row.ApArtId, `Populationen`, row.PopId, `Teil-Populationen`, id, `Massnahmen`],
      nodeIdPath: [`projekt/${row.ProjId}`, `projekt/${row.ProjId}/ap`, `ap/${row.ApArtId}`, `ap/${row.ApArtId}/pop`, `pop/${row.PopId}`, `pop/${row.PopId}/tpop`, `tpop/${id}/tpopmassn`],
    },
    // tpopmassnber folder
    {
      nodeId: `tpop/${id}/tpopmassnber`,
      folder: `tpopmassnber`,
      table: `tpop`,
      row,
      id,
      label: `Massnahmen-Berichte (${row.AnzTPopmassnber})`,
      expanded: false,
      children: [0],
      urlPath: [`Projekte`, row.ProjId, `Arten`, row.ApArtId, `Populationen`, row.PopId, `Teil-Populationen`, id, `Massnahmen-Berichte`],
      nodeIdPath: [`projekt/${row.ProjId}`, `projekt/${row.ProjId}/ap`, `ap/${row.ApArtId}`, `ap/${row.ApArtId}/pop`, `pop/${row.PopId}`, `pop/${row.PopId}/tpop`, `tpop/${id}/tpopmassnber`],
    },
    // tpopfeldkontr folder
    {
      nodeId: `tpop/${id}/tpopfeldkontr`,
      folder: `tpopfeldkontr`,
      table: `tpop`,
      row,
      id,
      label: `Feld-Kontrollen (${row.AnzTPopfeldkontr})`,
      expanded: false,
      children: [0],
      urlPath: [`Projekte`, row.ProjId, `Arten`, row.ApArtId, `Populationen`, row.PopId, `Teil-Populationen`, id, `Feld-Kontrollen`],
      nodeIdPath: [`projekt/${row.ProjId}`, `projekt/${row.ProjId}/ap`, `ap/${row.ApArtId}`, `ap/${row.ApArtId}/pop`, `pop/${row.PopId}`, `pop/${row.PopId}/tpop`, `tpop/${id}/tpopfeldkontr`],
    },
    // tpopfreiwkontr folder
    {
      nodeId: `tpop/${id}/tpopfreiwkontr`,
      folder: `tpopfreiwkontr`,
      table: `tpop`,
      row,
      id,
      label: `Freiwilligen-Kontrollen (${row.AnzTPopfreiwkontr})`,
      expanded: false,
      children: [0],
      urlPath: [`Projekte`, row.ProjId, `Arten`, row.ApArtId, `Populationen`, row.PopId, `Teil-Populationen`, id, `Freiwilligen-Kontrollen`],
      nodeIdPath: [`projekt/${row.ProjId}`, `projekt/${row.ProjId}/ap`, `ap/${row.ApArtId}`, `ap/${row.ApArtId}/pop`, `pop/${row.PopId}`, `pop/${row.PopId}/tpop`, `tpop/${id}/tpopfreiwkontr`],
    },
    // tpopber folder
    {
      nodeId: `tpop/${id}/tpopber`,
      folder: `tpopber`,
      table: `tpop`,
      row,
      id,
      label: `Kontroll-Berichte (${row.AnzTPopber})`,
      expanded: false,
      children: [0],
      urlPath: [`Projekte`, row.ProjId, `Arten`, row.ApArtId, `Populationen`, row.PopId, `Teil-Populationen`, id, `Kontroll-Berichte`],
      nodeIdPath: [`projekt/${row.ProjId}`, `projekt/${row.ProjId}/ap`, `ap/${row.ApArtId}`, `ap/${row.ApArtId}/pop`, `pop/${row.PopId}`, `pop/${row.PopId}/tpop`, `tpop/${id}/tpopber`],
    },
    // beobzuordnung folder
    {
      nodeId: `tpop/${id}/beobzuordnung`,
      folder: `beobzuordnung`,
      table: `tpop`,
      row,
      id,
      label: `zugeordnete Beobachtungen (${row.AnzTPopbeobzuordnung})`,
      expanded: false,
      children: [0],
      urlPath: [`Projekte`, row.ProjId, `Arten`, row.ApArtId, `Populationen`, row.PopId, `Teil-Populationen`, id, `zugeordnete-Beobachtungen`],
      nodeIdPath: [`projekt/${row.ProjId}`, `projekt/${row.ProjId}/ap`, `ap/${row.ApArtId}`, `ap/${row.ApArtId}/pop`, `pop/${row.PopId}`, `pop/${row.PopId}/tpop`, `tpop/${id}/beobzuordnung`],
    },
  ])
  .then(nodes => callback(null, nodes))
  .catch(error => callback(error, null))
}
