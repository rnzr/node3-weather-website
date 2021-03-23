const request =require('request');

const geocode = (address,callback) => {
    const geoURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address)+".json?language=de&limit=1&access_token=pk.eyJ1IjoiaWx5ZXNxdWUiLCJhIjoiY2ttZHdhMzFuMnExcTJ2bnczZWJ5c3RxMiJ9.x1vy5o0NIsiVwTEbSo-kWg"
    request({url:geoURL, json:true},(error,{body})=>{
        if (error) {
            callback("Unable to connect to location services", undefined);
        }
        else if (body.features.length === 0) {
            callback('unable to find location. try another search',undefined);

        }

        else {
            callback(undefined, {
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name_de
            
            });

        }

    })
}


module.exports = geocode;