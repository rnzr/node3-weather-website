const request = require('request');

const forecast = (lat,long,callback) => {
    const url ="http://api.weatherstack.com/current?access_key=41dc7f7e1f9144089f464dff00ac09bc&query="+lat+","+long;
    request({url,json:true},(error,{body})=> {
        if (error) {
            callback("unable to connect to weather service",undefined);
        }
        
        else if(body.success===false) {
            callback("your coordinates seem to be invalid.",undefined)
        }

        else {
            callback(undefined,{
                temperature: body.current.temperature,
                location: body.location.name,
                feelslike: body.current.feelslike,
                country: body.location.country,
                humidity: body.current.humidity
            });
        }
        
    })
}

module.exports = forecast;