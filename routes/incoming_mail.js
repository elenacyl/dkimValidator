//receiving email
var express = require('express');
var dkim = require('dkim');

var app = module.exports = express.createServer()
  , formidable = require('formidable')

  app.post('/incoming_mail', function(req, res){
  var form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    console.log(fields.to)
    console.log(fields.from)
    console.log(fields.subject)
    console.log(fields.message)
    res.writeHead(200, {'content-type': 'text/plain'})
    res.end('Message Received. Thanks!\r\n')
  })
})

//app.listen(3000);

//message must be a buffer
dkim.verify(message, callback());