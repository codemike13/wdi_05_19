const Product = require('../models/Product')

const paginate = require('../utils/pagination')

module.exports = {
    getAllProducts: (params) => {
        return new Promise((resolve, reject) => {

            Product.find(params)
                .populate('cat')
                .exec()
                .then(products => {
                    resolve(products)
                })
                .catch(err => {
                    let errors = {}
                    errors.status = 500
                    errors.message = err

                    reject(errors)
                })
        })
    },
    getProductByID: (id) => {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                .then(product => {
                    resolve(product)
                })
                .catch(err => {
                    let errors = {}
                    errors.status = 500
                    errors.message = err

                    reject(errors)
                })
        })
    },
    getProductsByCategoryID: (id) => {
        return new Promise((resolve, reject) => {
            Product.find({ cat: id })
                .populate('cat')
                .exec()
                .then(products => {
                    resolve(products)
                })
                .catch(err => {
                    let errors = {}
                    errors.status = 500
                    errors.message = err

                    reject(errors)
                })
        })
    },
    getPageIfUserLoggedIn: (req, res, next) => {
        if (req.user) {
            paginate(req, res, next)
        } else {
            res.render('index')
        }
    },
    searchProductByQuery: (req, res) => {
        if (req.query.q) {
            Product.search({
                query_string: {
                    query: req.query.q
                }
            }, (error, results) => {
                console.log(`results: `, results)
                if (error) {
                    let errors = {}
                    errors.status = 500
                    errors.message = error
                    res.status(errors.status).json(errors)
                } else {
                    let data = results.hits.hits
                    console.log(data.length)
                    res.render('search/search-results', { data: data })
                }
            })
        }
    },
    instantSearch: (req, res) => {

        Product.search({
            query_string: {
                query: req.body.q2
            }
        }, (error, results) => {
            console.log(`results: `, results)
            if (error) {
                let errors = {}
                errors.status = 500
                errors.message = error
                res.status(errors.status).json(errors)
            } else {
                let products = results.hits.hits
                res.send({ products: products })
            }
        })
    },
    editProduct: (params, id) => {
        return new Promise((resolve, reject) => {
            Product.findById(id)
                .then(product => {
                    product.name = req.params.name,
                        product.cat.name = req.params.category,
                        product.price = req.params.newId
                    product.save()
                        .then(product => {
                            resolve(product)
                        })
                        .catch(err => {
                            reject(err)
                        })
                })
                .catch(err => {
                    let errors = {}
                    errors.status = 500
                    errors.message = err

                    reject(errors)
                })
        })
    }
}
