const express = require('express')
const router = express.Router()
const Product = require('./models/Product')
const productController = require('./controllers/productController')
const mongoose = require('mongoose')

Product.createMapping((error, mapping) => {
    if (error) {
        console.log('Error Creating mapping');
        console.log(mapping);
        console.log(error);

    } else {
        console.log('Mapping created');
        console.log(mapping);
    }
})

let stream = Product.synchronize();
let count = 0;

stream.on('data', () => {
    count++
})

stream.on('close', () => {
    console.log(`Indexed ${count} documents`);

})
stream.on('error', (error) => {
    console.log(`Error: ${error}`)
})


router.get('/', (req, res) => {
    productController.getAllProducts({})
        .then(products => {
            res.render('products/products', { products: products })
        })
        .catch(err => {
            res.status(err.status).json(err)
        })
})

router.get('/search/', productController.searchProductByQuery)
router.post('/instant-search', productController.instantSearch)

router.get('/getproductsbycategoryid/:id', (req, res) => {
    productController.getProductsByCategoryID(req.params.id)
        .then(products => {
            res.render('products/products', { products: products })
        })
        .catch(err => {
            res.status(err.status).json(err)
        })
})


router.get('/:id', (req, res) => {
    productController.getProductByID(req.params.id)
        .then(product => {
            res.render('products/product', { product: product })
        })
        .catch(err => {
            res.status(err.status).json(err)
        })
})

module.exports = router