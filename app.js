const express = require('express')
const fs = require('fs')

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: false}))

app.get('/login', (req, res, next) => {
    const html = `
    <html>
        <head>
            <title>Chat Application - Login Page</title>
        </head>
        <body>
            <h1>Please login to the Chat Application</h1>
            <form action="/" method="GET" onsubmit="localStorage.setItem('username', document.getElementById('username').value)">
                <input id="username" type="text" name="username">
                <br><br>
                <button type="submit">Log In</button>
        </form>
        </body>
    </html>
    `
    res.send(html)
})

app.get ('/', (req, res, next) => {
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

app.post('/', (req, res, next) => {
    fs.appendFile("chat.txt", `${req.body.username} : ${req.body.message}\n`, err => {
        err ? console.log(err) : res.redirect("/")
    })

})

app.listen(3000)