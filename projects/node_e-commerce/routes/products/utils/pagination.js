const Product = require('../models/Product')

const paginate = (req, res) => {
    const perPage = 10
    const page = req.params.page || 1

    Product
        .find({})
        .populate("cat")
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function (err, products) {
            Product.countDocuments().exec(function (err, count) {
                console.log(Math.ceil(count / perPage))
                if (err) return next(err)
                res.render('products/product-main', {
                    products: products,
                    current: page,
                    nextPage: Number(page) + 1,
                    previousPage: Number(page) - 1,
                    pages: Math.ceil(count / perPage)
                })
            })
        })
}


module.exports = paginate