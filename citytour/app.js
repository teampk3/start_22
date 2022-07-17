const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const router = express.Router()

app.set('port', process.env.PORT || 3000)
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

var restful = require('./routes/restful.js')
app.use('/', restful)

//var sigun = require('./routes/sigun.js')
//app.use('/2/', sigun)

app.listen(app.get('port'), () => {
  console.log('3000 Port : Server Started...')
});
