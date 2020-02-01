const express = require('express');
const router = express.Router();
var request = require('request-promise');
var ipapi = require('ipapi.co');


async function weatherPlace(city) {
    var url =  `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a4976c7112b0610423f6ca0a17b12d33&units=metric`;
    var response_body = await request(url);
    return response_body;
}

router.post('/:city', async (req,res) =>{
        console.log("Parametros " + req.params.city)
        weatherPlace(req.params.city).then(function(results) {
            res.json(JSON.parse(results))
        });

})


module.exports = router;