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
    console.log(fields.to)
    console.log(fields.from)
    console.log(fields.subject)
    console.log(fields.message)
    res.writeHead(200, {'content-type': 'text/plain'})
    res.end('Message Received. Thanks!\r\n')

    //message must be a buffer
    var fileBuffer = new Buffer(files);
    dkim.verify(fileBuffer, function(error, res){


      assert.ifError( error )
      assert.ok( res && res.length > 0 )
      assert.ok(res.every( function (record) {
        return record.verified
      }))
      done( error)
      //mailgun should be here

//       var mailgun = require("mailgun-js");
//       var api_key = 'key-2e1e88c4d4b1e5e8f970be8514c4317e';
//       var DOMAIN = 'YOUR_DOMAIN_NAME';
//       var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

//       var data = {
//       from: 'Excited User <me@samples.mailgun.org>',
//       to: 'bar@example.com, YOU@YOUR_DOMAIN_NAME',
//       subject: 'Hello',
//       text: 'Testing some Mailgun awesomness!'
//       };

// mailgun.messages().send(data, function (error, body) {
//   console.log(body);
// });
//mailgun itself end here

    })

  })
});

module.exports = router;