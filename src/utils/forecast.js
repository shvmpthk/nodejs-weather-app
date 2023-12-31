const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fa143aa0487962b446432509cbfbe632&query='+encodeURIComponent(latitude)+','+encodeURIComponent(longitude)+'&units=m'
    request({url, json:true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather stack services !')
        } else if(body.error){
            const error = JSON.stringify(body.error)
            callback('Something wrong with the query !' + error)
        } else {
            callback(undefined, {
                temperature: body.current.temperature,
                place: body.location.name,
                weatherDesc: body.current.weather_descriptions[0],
                forecastData: body.current.weather_descriptions[0] + '. It feels like ' + body.current.temperature + ' degrees out there in ' + body.location.name
            })
        }
    })
}

module.exports = forecast