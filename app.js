let mongoose = require('mongoose')
let express = require('express')
let app = express()
let ejs = require('ejs')

let zooCol = require('./models/zooSchema')
let dogCol = require('./models/dogSchema')
let catCol = require('./models/catSchema')


app.use(express.static(__dirname + '/public'))

app.set('view engine', 'ejs')
const port = 4000

app.get('/', async (req, res) => {
    res.render('index')
})

app.param('animal', (req, res, next, value) => {
    console.log(`Request for ${value}`);
    next();
})

app.get('/zoo', async function (req, res) {
    try{
        zooCol.count().exec(function (err, count) {
            var random = Math.floor(Math.random() * count)
          
            zooCol.findOne().skip(random).exec( function (err, result) {
                console.log(result) 
                res.render('zoo', {data: result})
            })
          })
    } catch(e) {
        console.log(e.message)
    }
})

app.get('/zoo/:animal', async (req, res) => {
    try {
        let result = await zooCol.findOne({name: req.params.animal})
        console.log(result)

        res.render('zoo', {data: result})
    } catch(e) {
        console.log(e.message)
    }
})

app.get('/dogs', async function (req, res) {
    try{
        dogCol.count().exec(function (err, count) {
            var random = Math.floor(Math.random() * count)
          
            dogCol.findOne().skip(random).exec( function (err, result) {
                console.log(result) 
                res.render('dogs', {data: result})
            })
          })
    } catch(e) {
        console.log(e.message)
    }
})

app.get('/dogs/:animal', async (req, res) => {
    try {
        let result = await dogCol.findOne({name: req.params.animal})
        console.log(result)

        res.render('dogs', {data: result})
    } catch(e) {
        console.log(e.message)
    }
})

app.get('/cats', async function (req, res) {
    try{
        catCol.count().exec(function (err, count) {
            var random = Math.floor(Math.random() * count)
          
            catCol.findOne().skip(random).exec( function (err, result) {
                console.log(result) 
                res.render('cats', {data: result})
            })
          })
    } catch(e) {
        console.log(e.message)
    }
})

app.get('/cats/:animal', async (req, res) => {
    try {
        let result = await catCol.findOne({id: req.params.animal})
        console.log(result)

        res.render('cats', {data: result})
    } catch(e) {
        console.log(e.message)
    }
})

app.get('/zooimages', async (req, res) => {
    try {
        let result = await zooCol.find()
        res.render('zooimages', {data: result})
    } catch (e) {
        console.log(e.message)
    }
})

app.get('/dogimages', async (req, res) => {
    try {
        let result = await dogCol.find()
        res.render('dogimages', {data: result})
    } catch (e) {
        console.log(e.message)
    }
})

app.get('/catimages', async (req, res) => {
    try {
        let result = await catCol.find()
        res.render('catimages', {data: result})
    } catch (e) {
        console.log(e.message)
    }
})

app.use('*', function(req, res){
    res.writeHead(404);
    res.end(`<h1> ERROR 404. ${req.url} NOT FOUND</h1><br><br>`);
})

app.listen( port, async function() {
    try{
		await mongoose.connect('mongodb+srv://user:YVzW36G0g0E4Zg0e@capstoneproject.25frl.mongodb.net/capstone?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true })
    } catch (e) {
        console.log(e.message);
    }
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env )
})