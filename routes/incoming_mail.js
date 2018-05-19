//receiving email
var express = require('express');
var dkim = require('dkim');
var assert = require('assert');
var fs = require('fs');

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
    
    console.log(fields.envelope.to)
    console.log(fields.envelope.from)
    console.log(fields.envelope.recipients)
    console.log(fields.helo_domain)
    console.log(fields.remote_ip)
    console.log(fields.spf.domain)
    console.log(fields.spf.result)

    console.log(fields.message)
    res.writeHead(200, {'content-type': 'text/plain'})
    res.end('Message Received. Thanks!\r\n')

    //message must be a buffer
    // var fileBuffer = fs.readFile(files.upload.path, function(err, buffer) {
    //   if (err) throw err;
    //   console.log(buffer);
    // });
    // dkim.verify(fileBuffer, function(error, res){

    //   assert.ifError( error )
    //   assert.ok( res && res.length > 0 )
    //   assert.ok(res.every( function (record) {
    //     return record.verified
    //   }))
    //   done( error)


//       //mailgun

// // var mailgun = require("mailgun-js");
// // var api_key = 'key-2e1e88c4d4b1e5e8f970be8514c4317e';
// // var DOMAIN = 'sandbox5dde7e1a07364b75901565f04dc84ed5.mailgun.org';
// // var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});

// // var data = {
// //   from: 'Admin, <sandbox5dde7e1a07364b75901565f04dc84ed5.mailgun.org>',
// //   to: fields.from,
// //   subject: 'Reply',
// //   text: 'DKIM settings configured correctly'
// // };

// // mailgun.messages().send(data, function (error, body) {
// //   console.log(body);
// // });
//       //mailgun


 // })

  })
});

module.exports = router;