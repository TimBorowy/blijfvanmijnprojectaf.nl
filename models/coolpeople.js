const mongoose = require('mongoose')
let url = "mongodb://localhost:27017/restdb"

mongoose.connect(url, { useNewUrlParser: true }, function (err) {
  if (err) throw err
})

let projectModel = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  swagScore: {
    type: String,
    required: true
  },
  descr: {
    type: String,
    required: true
  },
  _links: JSON

}, { collection: 'coolpeople' })

module.exports = mongoose.model('coolpeople', projectModel)