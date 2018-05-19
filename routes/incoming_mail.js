//receiving email
var express = require('express');
var dkim = require('dkim');
var assert = require('assert');

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
      assert.ok( res && res.length > 0)
      assert.ok(res.every( function (record) {
        return record.verified
      }))

      //mailgun
      var mailgun = require("mailgun-js");
      var api_key = 'key-a2a43226f5e6ccafba8fb372620cee12';
      var DOMAIN = 'sandboxccf0d831e6f34ba7b09a420ccf675a31.mailgun.org';
      var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

var data = {
  from: 'Admin <8c005bd79c47d00bdb24@cloudmailin.net>',
  to: 'elenachoo@u.nus.edu, sandboxccf0d831e6f34ba7b09a420ccf675a31.mailgun.org',
  subject: 'Reply',
  text: 'Settings configured correctly!'
};

mailgun.messages().send(data, function (error, body) {
  console.log(body);
});

      //mailgun
  })

  })
});

module.exports = router;