const mongoose = require('mongoose')
let url = "mongodb://localhost:27017"

mongoose.connect(url)

let projectModel = new mongoose.Schema({
    name: String,
    swagScore: String,
    descr: String

}, {collection: 'coolpeople' })

module.exports = mongoose.model('project', projectModel)