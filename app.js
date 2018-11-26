const express = require('express')
const mongo = require('mongodb')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

//const model = require('./coolpeopleModel')
//let MongoClient = require('mongodb').MongoClient;
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

let coolpeopleModel = mongoose.model('coolpeople', projectModel )


app.set('view engine', 'hbs')

// accept json middleware
app.use(function(req, res, next){
  console.log('Middleware!!')

  if (req.accepts('json')) {
    next()
    return
  }
  res.send('this app only accepts json')
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.get('/', function (req, res) {
    res.render('index', { title: 'Hey', msg: 'Hello there! This is express speaking!' })
})

app.get('/resource/all', function(req, res){

  coolpeopleModel.find({}, function(err, project){
    if(err){
      res.status(500).send(err)
  
    } else{
      res.json(project)
    }
  })
  
})

app.post('/resource/post', function(req, res){
  console.log(req.body)
  let form = req.body
  let newCool = coolpeopleModel({name: form.name, swagScore: form.swagScore, descr: form.descr})

  newCool.save(function(err){
    if (err) return res.status(500).send(err);
    console.log('saved!')
    return res.json({message: 'success'})
  })
})

app.put('/resource/put', function(req, res){
  return res.send()
})

app.delete('resource/delete', function(req, res){
  return res.send()
})

app.patch('resource/patch', function(req, res){
  return res.send()
})

app.options('resource/options', function(req, res){
  return res.send()
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))