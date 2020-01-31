const express = require('express');
//con router defino rutas de mis servidores
const router = express.Router();
var request = require('request-promise');

async function getWeather() {

    //var url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=375ea971ce874f52584954ccd4e1d1a8`;
    var url =  `https://samples.openweathermap.org/data/2.5/history/city?q=London,US&appid=b1b15e88fa797225412429c1c50c122a1`;
    var response_body = await request(url);
    return response_body;
}

router.get('/', async (req,res) =>{
    getWeather().then(function(results) {
        //console.log(results)
        res.json(results)

    });
})


module.exports = router;