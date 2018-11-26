const mongoose = require('mongoose')
let url = "mongodb://localhost:27017/restdb"

let db = mongoose.connect(url, function(err){
  if(err) throw err
})

let projectModel = new mongoose.Schema({
    name: String,
    swagScore: String,
    descr: String

}, {collection: 'coolpeople' })

module.exports = mongoose.model('coolpeople', projectModel)