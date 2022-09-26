require('dotenv').config()
require('./config/db_connection.js')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

const userRoute = require('./routes/routes')
const pubDirPath = path.join(__dirname, '../client/public')
const viewsDirPath = path.join(__dirname, '../client/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(pubDirPath))
app.use(cookieParser())
app.use(userRoute)
app.set('view engine', 'ejs')
app.set('views', viewsDirPath) 

app.listen(process.env.PORT, () => {
	console.log("server running at port: ", process.env.PORT)
})