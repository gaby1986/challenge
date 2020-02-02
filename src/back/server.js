var express = require('express');
var app = express();
var Cors = require('cors')
var bodyParser = require('body-parser');
 


app.use(bodyParser.json())
app.use(Cors())
app.use(express.json())

app.get('/v1', function(request, response){
  response.json({
      'weatherLocation' : '/v1/location',
      'weatherCurrent' : '/v1/current/[city]',
      'weatherForecast' : '/v1/forecast',
  })
})



app.use('/v1/location', require('./routes/weatherLocation'))
app.use('/v1/current', require('./routes/weatherCurrent'))
app.use('/v1/forecast', require('./routes/weatherForecast'))



app.listen(3000, function(){
  console.log('Escuchando en el  puerto 3000');
});