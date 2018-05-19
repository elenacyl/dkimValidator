//receiving email
var express = require('express');
var dkim = require('dkim');
var assert = require('assert');
var fs = require('fs');
var path = require('path');

var router = express.Router();
var formidable = require('formidable');


router.post('/', function(req, res){

  var form = new formidable.IncomingForm()
  form.parse(req, function(err, fields, files) {
    if (err) {
      console.log(err);
      res.send("Error occurred")
    }
    console.log(fields.to)
    console.log(fields.from)
    console.log(fields.subject)

    console.log(fields.message)
    res.writeHead(200, {'content-type': 'text/plain'})
    res.end('Message Received. Thanks!\r\n')


    //message must be a buffer
    var fileBuffer = fs.readFile(files.file.path, function(err, data) {
        if (err) throw err;
        console.log(data);
    });
    // dkim.verify(fileBuffer, function(error, res){

    //   assert.ifError( error )
    //   assert.ok( res && res.length > 0 )
    //   assert.ok(res.every( function (record) {
    //     return record.verified
    //   }))
    //   done( error)


//       //mailgun

//       //mailgun


 // })

  })
});

module.exports = router;