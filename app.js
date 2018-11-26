const express = require('express')
const mongo = require('mongodb')
const app = express()
const bodyParser = require('body-parser')
const port = 3000

//const model = require('./models/coolpeople')
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

app.get('/resource', function(req, res){

  coolpeopleModel.find({}, function(err, project){
    if(err){
      res.status(500).send(err)
  
    } else{

      let response = {
        items: project,
        _self: {self: {href: 'http://164.132.226.87:8080/resource'}},
        pagination: {
          currentPage: 1,
          currentItems: 10,
          totalPages: 1,
          _links: {
            first: {
              page: 1,
              href: 'http://164.132.226.87:8080/resource'
            },
            last: {
              page: 1,
              href: 'http://164.132.226.87:8080/resource'
            },
            previous: {
              page: 1,
              href: 'http://164.132.226.87:8080/resource'
            },
            next: {
              page: 1,
              href: 'http://164.132.226.87:8080/resource'
            },
          }
        }
      }
      res.json(project)
    }
  })
  
})

app.post('/resource', function(req, res){
  console.log(req.body)
  let form = req.body
  let newCool = coolpeopleModel({name: form.name, swagScore: form.swagScore, descr: form.descr})

  newCool.save(function(err){
    if (err) return res.status(500).send(err);
    console.log('saved!')
    return res.json({message: 'success'})
  })
})

app.put('/resource', function(req, res){
  return res.send()
})

app.delete('/resource', function(req, res){
  return res.send()
})

app.patch('/resource', function(req, res){
  return res.send()
})

app.options('/resource', function(req, res){
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))