var express = require('express');
var app = express();
const mongo = require('mongodb')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 8080
const router = require('./routes/cool')(express)


app.set('view engine', 'hbs')

// accept json middleware
app.use(function(req, res, next){
  console.log('Middleware!!')

  if (req.accepts('json')) {

    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    
    next()
    return
  }
  res.status(415).send('this app only accepts json')
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.use('/resource', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))