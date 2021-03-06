const express = require('express');
const router = express.Router();
var request = require('request-promise');
var ipapi = require('ipapi.co');
const { APIKEY } = require('../apiKeys');


 
async function getWeather(city) {
   var url = `http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${APIKEY}&units=metric&cnt=5`
   var response_body = await request(url);
   return response_body;
}

router.get('/:city', async (req,res) =>{
    getWeather(req.params.city).then(function(results) {
        res.json(JSON.parse(results))
    }).catch(function(error){
        res.json(error)
    });
})
router.get('/', async (req,res) =>{
    ipapi.location(callback =>{
        getWeather(callback.city).then(function(results) {
            res.json(JSON.parse(results))
        }).catch(function(error){
            res.json(error)
        });
    })
})


module.exports = router;