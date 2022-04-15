let mongoose = require('mongoose')
let express = require('express')
let app = express()
let ejs = require('ejs')

let zooCol = require('./zooSchema')

app.set('view engine', 'ejs')
const port = 4000

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/zoo', async function (req, res) {
    try{
        let result = await zooCol.findOne({id: randNum()})
        console.log(result)
        res.render('zoo', {data: result})
    } catch(e) {
        console.log(e.message)
    }
})

app.listen( port, async function() {
    try{
		await mongoose.connect('mongodb+srv://user:YVzW36G0g0E4Zg0e@capstoneproject.25frl.mongodb.net/capstone?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true })
    } catch (e) {
        console.log(e.message);
    }
    console.log( 'Express server listening on port %d in %s mode', port, app.settings.env )
})

function randNum(max = 9) {
    return Math.floor(Math.random() * max)
}