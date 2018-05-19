//receiving email
var express = require('express');
var dkim = require('dkim');

var router = express.Router();
var formidable = require('formidable');


router.post('/', function(req, res){
  console.log("Hit here");
  res.writeHead(200, {'content-type': 'text/plain'})
  res.end('Message Received. Thanks!\r\n')

  // var form = new formidable.IncomingForm()
  // form.parse(req, function(err, fields, files) {
  //   if (err) {
  //     console.log(err);
  //     res.send("Error occured")
  //   }
  //   console.log(fields.to)
  //   console.log(fields.from)
  //   console.log(fields.subject)
  //   console.log(fields.message)
  //   res.writeHead(200, {'content-type': 'text/plain'})
  //   res.end('Message Received. Thanks!\r\n')

  //   //message must be a buffer
  //   var fileBuffer = new Buffer(files);
  //   dkim.verify(fileBuffer, function(req, res){

  //     //mailgun should be here

  //   })

  // })
});

module.exports = router;