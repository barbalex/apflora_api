'use strict'

const apFolderQuery = require(`./apFolderQuery`)

module.exports = (request, callback) => {
  let id = encodeURIComponent(request.query.id)

  if (id) {
    id = parseInt(id, 0)
  }

  apFolderQuery(id)
    .then(nodes => callback(null, nodes))
    .catch(error => callback(error, null))
}
