const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const loginRouter = require('./routes/login')
const chatRouter = require('./routes/postChat')

const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, "public")))

app.use(loginRouter)
app.use(chatRouter)

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'))
})

app.listen(3000)