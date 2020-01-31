var express = require('express');
var app = express();
var Cors = require('cors')
var bodyParser = require('body-parser');
var ipapi = require('ipapi.co');


var callback = function(res){
  console.log(res);
};

ipapi.location(callback)       // Complete location for your IP address

//ipapi.location(callback, '', '', 'ip')         // Your external IP address
 
//ipapi.location(callback, '', '', 'city')       // Your city
 
//ipapi.location(callback, '', '', 'country')    // Your country
 

//ipapi.location(callback, '8.8.8.8')            // Complete location for IP address 8.8.8.8




app.use(bodyParser.json())
app.use(Cors())
app.use(express.json())
app.use('/v1', require('./routes/weatherEndpoint'))
app.use('/location', require('./routes/weatherPlace'))


app.listen(3000, function(){
  console.log('Server Express Ready!');
});