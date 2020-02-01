var express = require('express');
var app = express();
var Cors = require('cors')
var bodyParser = require('body-parser');
let weatherLocation = require('./routes/weatherLocation')
 



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