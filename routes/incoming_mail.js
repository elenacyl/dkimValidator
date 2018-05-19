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

    console.log(fields.message) //send entire message as one single field
    res.writeHead(200, {'content-type': 'text/plain'})
    res.end('Message Received. Thanks!\r\n')


    //message must be a buffer

    dkim.verify(Buffer.from(fields.message), function(error, res){

      assert.ifError( error )
      assert.ok( (res && res.length > 0), 'response exists' )
      // assert.ok(res.every( function (record) {
      //   return record.verified
      // }))

      //mailgun

      //mailgun


  })

  })
});

module.exports = router;