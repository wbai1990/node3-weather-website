const express = require ('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')



const app = express()

// setting port number to Heroku port number and default to 3000
const port = process.env.PORT || 3000 

const publicDirectoryPath = path.join(__dirname, '..','public')
const viewDirectoryPath = path.join(__dirname, '..','templates','views')
const partialsPath = path.join(__dirname, '..','templates','partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewDirectoryPath)
hbs.registerPartials(partialsPath)


//Setup global public static directory path
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather App',
        name:'Wei Bai'
    })
})

app.get('/about',(req,res)=>{
    res.render('about', {
        title: 'About',
        name: 'Wei Bai'
    })
})

app.get('/help',(req,res) => {
    res.render('help', {
        title:'Help Page',
        name:'Wei Bai'
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query)
    if (!req.query || !req.query.address) {
        res.send({
            error: 'An address must be provided'
        })
        return
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {}) => {
        if (error) {
            res.send({error})
            return 
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                res.send({error})
                return 
            }
            res.send({
                address: req.query.address,
                forecast: forecastData,
                location: location
            })
        })
    })


})

app.get('/product',(req,res) => {
    console.log(req.query)
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
        return []
    }

    res.send({
        product:[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'Page went missing!',
        errorMessage:'Help article was not created',
        name:'Wei Bai'
    })
})

//setup error page 
app.get('*', (req, res)=>{
    res.render('404',{
        title:'Page went missing!',
        errorMessage:'Page does not exist',
        name:'Wei Bai'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})