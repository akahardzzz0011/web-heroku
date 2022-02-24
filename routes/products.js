const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid')
let productData = require('../data/products.json')

let products = productData.products

router.get('/', (req, res) => {
    res.send(products)
})

router.get('/:productId', (req, res) => {
    let foundId = products.findIndex(p => p.id === req.params.productId)
    console.log(typeof req.params.productId);
    console.log(foundId);
    if(foundId === -1) {
        let searchedItem = req.params.productId
        let foundProducts = products.filter(p => p.description.toLowerCase().includes(searchedItem.toLowerCase()))
        if(foundProducts.length > 0) {
            res.json(foundProducts)
            console.log("desc found");
        } else {
            foundProducts = products.filter(p => p.price === Number(searchedItem))
            if(foundProducts.length > 0) {
                res.json(foundProducts)
                console.log("price found");
            } else {
                foundProducts = products.filter(p => p.amount === Number(searchedItem))
                if(foundProducts.length > 0) {
                    res.json(foundProducts)
                    console.log("amount found");
                } else {
                    res.sendStatus(404)
                }
            }
        }
    } else {
        res.json(products[foundId])
    }
})

router.post('/', (req, res) => {
    console.log(req.body.addedProduct);

    products.push({
        id: uuidv4(),
        description: req.body.addedProduct.description,
        currency: req.body.addedProduct.currency,
        price: Number(req.body.addedProduct.price),
        priceCents: Number(req.body.addedProduct.priceCents),
        previousPrice: req.body.addedProduct.previousPrice,
        image: req.body.addedProduct.image,
        image02: req.body.addedProduct.image02,
        amount: Number(req.body.addedProduct.amount)
    })
    res.sendStatus(201)

})

router.put('/:productId', (req, res) => {
    let item = products.find(p => p.id === req.params.productId)
    if(item) {
        item.description = req.body.modifiedProduct.description,
        item.currency = req.body.modifiedProduct.currency,
        item.price = Number(req.body.modifiedProduct.price),
        item.priceCents = Number(req.body.modifiedProduct.priceCents),
        item.previousPrice = req.body.modifiedProduct.previousPrice,
        item.image = req.body.modifiedProduct.image,
        item.image02 = req.body.modifiedProduct.image02,
        item.amount = Number(req.body.modifiedProduct.amount)
        
        res.sendStatus(202)
    } else {
        res.sendStatus(404)
    }
})

router.delete('/:productId', (req, res) => {
    let foundId = products.findIndex(u => u.id === req.params.productId)
    console.log(req.params.productId);
    if(foundId === -1) {
        res.sendStatus(404)
    } else {
        products.splice(foundId, 1)
        res.sendStatus(202)
    }
})
module.exports = router