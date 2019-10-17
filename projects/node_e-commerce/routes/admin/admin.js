const express = require('express')
const router  = express.Router()

const categoryValidation = require('./utils/categoryValidation')
const categoryController = require('./controllers/categoryController')

router.get('/', (req, res) => {
    res.send('hey from admin')
})

router.get('/add-category', (req, res) => {
    res.render('products/addcategory')
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

module.exports = router