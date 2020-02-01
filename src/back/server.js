var express = require('express');
var app = express();
var Cors = require('cors')
var bodyParser = require('body-parser');

 



app.use(bodyParser.json())
app.use(Cors())
app.use(express.json())
//app.use('/v1', require('./routes/weatherCurrent'))
app.use('/location', require('./routes/weatherLocation'))
app.use('/current', require('./routes/weatherCurrent'))


app.listen(3000, function(){
  console.log('Server Express Ready!');
});