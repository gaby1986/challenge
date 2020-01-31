const express = require('express');
//con router defino rutas de mis servidores
const router = express.Router();
var request = require('request-promise');

async function weatherPlace() {
    var url =  `https://samples.openweathermap.org/data/2.5/weather?lat=-34.6021&lon=-58.3845&appid=b1b15e88fa797225412429c1c50c122a1`;
    var response_body = await request(url);
    return response_body;
}

router.get('/', async (req,res) =>{
    weatherPlace().then(function(results) {
        //console.log(results)
        res.json(results)

    });
})


module.exports = router;