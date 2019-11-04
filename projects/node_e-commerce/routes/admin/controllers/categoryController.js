const Category = require('../../products/models/Category')

module.exports = {
    addCategory: (params) => {
        return new Promise((resolve, reject) => {
            const category = new Category()
            category.name = params.name

            category.save()
                .then(category => {
                    resolve(category)
                })
                .catch(error => {
                    let errors = {}
                    errors.confirmation = false

                    if (error.code === 11000) errors.message = `Category ${category.name} already exists`
                    else errors.message = error

                    reject(errors)
                })

        })
    },
    getAllCategories: (req, res) => {
        Category.find({})
            .then(cat => {
                res.render('categories/create-fake-product', { cat: cat })
            })
            .catch(error => {
                req.flash('errors', error)
            })
    }
}