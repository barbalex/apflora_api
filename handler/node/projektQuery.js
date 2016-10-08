'use strict'

const app = require(`ampersand-app`)
const apFolderQuery = require(`./apFolderQuery`)
const apberuebersichtFolderQuery = require(`./apberuebersichtFolderQuery`)

module.exports = ({ user, projId, children }) =>
  app.db.task(function* getData() {
    let apFolder = [0]
    let apberuebersichtFolder = [0]

    if (children.includes(`apFolder`)) {
      apFolder = yield apFolderQuery(projId, children)
    }
    if (children.includes(`apberuebersichtFolder`)) {
      apberuebersichtFolder = yield apberuebersichtFolderQuery(projId)
    }
    const projektListe = yield app.db.any(`
      SELECT
        "ProjId",
        "ProjName",
        (
          SELECT
            COUNT(*)
          FROM
            apflora.ap
          WHERE
            apflora.ap."ProjId" = apflora.projekt."ProjId"
        ) AS "AnzAp",
        (
          SELECT
            COUNT(*)
          FROM
            apflora.apberuebersicht
          WHERE
            apflora.apberuebersicht."ProjId" = apflora.projekt."ProjId"
        ) AS "AnzApberuebersicht"
      FROM
        apflora.projekt
      WHERE
        "ProjId" IN (
          SELECT
            "ProjId"
          FROM
            apflora.userprojekt
          WHERE
            "UserId" = $1
        )
      ORDER BY
        "ProjName"
      `,
      user
    )
    return projektListe.map((projekt) => {
      const idActive = !!projId && projId === projekt.ProjId
      // const oneProject = projektListe.length === 1  // temporarily disabled
      return {
        nodeId: `projekt/${projekt.ProjId}`,
        table: `projekt`,
        id: projekt.ProjId,
        name: projekt.ProjName,
        expanded: idActive, // || oneProject,  // temporarily disabled
        urlPath: [`Projekte`, projekt.ProjId],
        nodeIdPath: [`projekt/${projekt.ProjId}`],
        children: [
          // ap folder
          {
            nodeId: `projekt/${projekt.ProjId}/ap`,
            folder: `ap`,
            table: `projekt`,
            id: projekt.ProjId,
            name: `Arten (${projekt.AnzAp})`,
            expanded: false,
            children: apFolder,
            urlPath: [`Projekte`, projekt.ProjId, `Arten`],
            nodeIdPath: [`projekt/${projekt.ProjId}`, `projekt/${projekt.ProjId}/ap`],
          },
          // apberuebersicht folder
          {
            nodeId: `projekt/${projekt.ProjId}/apberuebersicht`,
            folder: `apberuebersicht`,
            table: `projekt`,
            id: projekt.ProjId,
            name: `AP-Berichte (${projekt.AnzApberuebersicht})`,
            expanded: false,
            children: apberuebersichtFolder,
            urlPath: [`Projekte`, projekt.ProjId, `AP-Berichte`],
            nodeIdPath: [`projekt/${projekt.ProjId}`, `projekt/${projekt.ProjId}/apberuebersicht`],
          },
        ],
      }
    })
  })
    .then(nodes => nodes)
    .catch((error) => { throw error })
