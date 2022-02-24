const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
let userData = require('../data/userData')
let users = userData.users

router.get('/', (req, res) => {
    res.send(users)
})
router.post('/', (req, res) => {
    console.log(req.body)

    users.push({
        id: uuidv4(),
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        email: req.body.email
    })
    res.sendStatus(201)
})

module.exports = router