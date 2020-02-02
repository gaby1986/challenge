const express = require('express');
const router = express.Router();
var request = require('request-promise');
var ipapi = require('ipapi.co');


async function weatherPlace(city) {
    var url =  `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a4976c7112b0610423f6ca0a17b12d33&units=metric`;
    var response_body = await request(url);
    return response_body;
}


router.get('/:city', async (req,res) =>{
            weatherPlace(req.params.city).then(function(results) {
                res.json(JSON.parse(results))
            }).catch(function(error){
                res.json(error)
            });
}).get('/', async (req,res) =>{
    ipapi.location(callback =>{
        weatherPlace(callback.city).then(function(results) {
            res.json(JSON.parse(results))
        }).catch(function(error){
            res.json(error)
        });
       
    })
})



module.exports = router;