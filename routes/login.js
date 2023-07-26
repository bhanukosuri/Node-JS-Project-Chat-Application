const express = require('express')
const fs = require('fs')
const path = require('path')
const rootDir = require('../util/path')

const router = express.Router()

router.get('/login', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'login.html'))
})

router.get ('/', (req, res, next) => {
    fs.readFile('chat.txt', (err, data) => {
        if  (err) {
            console.log(err)
            data = 'No Chat Exists'
        }
        const html = `
        <html>
            <head>
                <title>Welcome to the Chat Application</title>
            </head>
            <body>
                ${data}
                <form action="/" onsubmit="document.getElementById('username').value = localStorage.getItem('username')" method="POST">
                    <input id="message" type="text" name="message" placeHolder="message">
                    <input type="hidden" name="username" id="username">
                    <br><br>
                    <button type="submit">Send</button>
            </form>
            </body>
        </html>
        `
        res.send(html)
    })
})


module.exports = router