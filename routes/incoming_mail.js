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
    //console.log(fields)
    //console.log(fields['envelope[from]'])
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

      //mailgun start
      var mailgun = require("mailgun-js");
      var api_key = '';
      var DOMAIN = '';
      var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

      var data = {
        from: 'Admin <8c005bd79c47d00bdb24@cloudmailin.net>',
        to: fields['envelope[from]'],
        subject: 'Verified',
        text: 'Your DKIM settings are configured correctly!'
      };

        mailgun.messages().send(data, function (error, body) {
          console.log(body);
      });
    
      //mailgun end
  })

  })
});

module.exports = router;
