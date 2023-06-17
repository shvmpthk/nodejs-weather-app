const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup handlebars engines and views location 
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('',(req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Shivam Pathak'
    })
})

app.get('/about',(req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shivam Pathak'
    })
})

app.get('/help',(req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helpful text',
        name: 'Shivam Pathak'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide an address you wish to look up the weather for'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error)
            return res.send({ error })

        forecast(latitude, longitude, (error, { forecastData } = {}) => {
            if(error)
                return res.send({ error })
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*',(req, res) => {
    res.render('404',{
        title:'404',
        message: 'Help article not found',
        name: 'Shivam Pathak'
    })
})

app.get('*',(req, res) => {
    res.render('404',{
        title:'404',
        message: 'Page not found',
        name: 'Shivam Pathak'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+ port)
})