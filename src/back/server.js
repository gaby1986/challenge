var express = require('express');
var app = express();
var Cors = require('cors')
var bodyParser = require('body-parser');
var should = require('should');
 
(5).should.be.exactly(5).and.be.a.Number(); 


var user = {
  name: 'tj',
  pets: ['tobi', 'loki', 'jane', 'band', 'sdfdsf']
};

user.should.have.property('name', 'tj');
user.should.have.property('pets').with.lengthOf(5);

// If the object was created with Object.create(null)
// then it doesn't inherit `Object.prototype`, so it will not have `.should` getter
// so you can do:
var test = should(user).have.property('name', 'tj');

console.log(test)

app.use(bodyParser.json())
app.use(Cors())
app.use(express.json())

app.get('/v1', function(request, response){
  response.json({
      'weatherLocation' : '/location',
      'weatherCurrent' : '/current/[city]',
  })
})



app.use('/v1/location', require('./routes/weatherLocation'))
app.use('/v1/current', require('./routes/weatherCurrent'))


app.listen(3000, function(){
  console.log('Server Express Ready!');
});