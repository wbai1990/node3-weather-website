const request = require('request')


const token = 'a7d06fd5d457b3c4d6043997e9259ab6'
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${token}/${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast