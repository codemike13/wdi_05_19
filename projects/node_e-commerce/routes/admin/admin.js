const express = require('express')
const router = express.Router()
const categoryValidation = require('./utils/categoryValidation')
const categoryController = require('./controllers/categoryController')
const createProductController = require('./controllers/createProductController')
const productController = require('../products/controllers/productController')



router.get('/', (req, res) => {
    res.send('hey from admin')
})

router.get('/add-category', (req, res) => {
    res.render('products/addcategory')
})

router.get('/editproductbyid/:id', (req, res) => {
    productController.getProductByID(req.params.id)
        .then(product => {
            res.render('admin/editProduct', { product: product })
        })
        .catch(err => {
            res.status(err.status).json(err)
        })
})

router.put('/editproductbyid/:id', (req, res) => {
    productController.editProduct(req.body, req.params.id)
        .then(product => {
            req.flash('success', 'Successfully updated product!')

        })
        .catch(err => {
            req.flash('errors', err);

        })
})

router.post('/add-category', categoryValidation, (req, res) => {
    categoryController.addCategory(req.body)
        .then(category => {
            req.flash('success', `Category ${category.name} created!`)

            res.redirect('/api/admin/add-category')
        })
        .catch(error => {
            req.flash('errors', error.message)

            res.redirect('/api/admin/add-category')
        })
})

router.get('/get-all-categories', categoryController.getAllCategories)

router.get('/create-fake-product/:categoryName/:categoryID', createProductController.createProductByCategoryID)

module.exports = router