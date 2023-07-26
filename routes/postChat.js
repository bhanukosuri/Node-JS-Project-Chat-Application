const express = require('express')
const fs = require('fs')

const router = express.Router()

router.post('/', (req, res, next) => {
    fs.appendFile("chat.txt", `${req.body.username} : ${req.body.message}\n`, err => {
        err ? console.log(err) : res.redirect("/")
    })
})

module.exports = router