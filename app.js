var express = require('express')
var app = express()
const mongo = require('mongodb')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = require('./routes/cool')(express)
const port = 8080


app.set('view engine', 'hbs')

// accept json middleware
app.use(function(req, res, next){

  if (req.accepts('json')) {

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    
    next()
    return
  }

  res.status(415).send('This app only accepts json')
})

app.use( bodyParser.json() )    // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  extended: true
}))

// use routes defined in routes file
app.use('/resource', router)

app.listen(port, () => console.log(`Rest API listening on port ${port}!`))