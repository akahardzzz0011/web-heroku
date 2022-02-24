const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
let productList = require('../data/productData.json')
let userList = require('../data/userData.json')

let products = productList.products
let users = userList.users

const userInvoices = [
    {
        id: uuidv4(),
        userName: users[0].name,
        product01: products[0].name,
        product02: products[1].name,
        totalSum: products[0].price + products[1].price
    },
    {
        id: uuidv4(),
        userName: users[0].name,
        product01: products[0].name,
        product02: products[0].name,
        totalSum: products[0].price + products[0].price
    }
]

router.get('/', (req, res) => {
    res.send(userInvoices)
})

router.get('/:invoiceId', (req, res) => {
    let foundId = userInvoices.findIndex(u => u.id === req.params.invoiceId)
    if(foundId === -1) {
        res.sendStatus(404)
    } else {
        res.json(userInvoices[foundId])
    }
})

router.delete('/:invoiceId', (req, res) => {
    let foundId = userInvoices.findIndex(u => u.id === req.params.invoiceId)
    
    if(foundId === -1) {
        res.sendStatus(404)
    } else {
        userInvoices.splice(foundId, 1)
        res.sendStatus(202)
    }
})

module.exports = router