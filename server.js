const { text } = require('body-parser');
const express = require('express');
var bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api', require('./api/dashboard/index'))
app.use('/api', require('./api/authentication/index'))


app.timeout = 200000000000000;
console.log(app.timeout)

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})



    



