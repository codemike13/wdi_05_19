const Cart = require('../models/Cart')
const Product = require('../../products/models/Product')


module.exports = {

    createUserCart: (req, res) => {
        let newCart = new Cart()
        newCart.owner = req.user._id
        newCart.save()
        res.redirect('/')
        // console.log("This is owner", newCart.owner)
    },
    addProductToCart: (req, res) => {
        Cart.findOne({ owner: req.user._id })
            .then(cart => {

                const totalPrice = parseFloat(req.body.priceValue)

                cart.items.push({
                    item: req.body.productID,
                    price: totalPrice,
                    quantity: parseInt(req.body.quantity),
                })
                cart.total = (cart.total + totalPrice).toFixed(2)
                cart.save()
                    .then(cart => {
                        req.flash("success", `${req.body.productID} has been added to the cart!`)
                        res.redirect('/')
                    }).catch(err => {
                        throw Error(err)
                    })

            }).catch(err => {
                throw Error(err)
            })

    },
    getUserShoppingCart: (req, res) => {
        Cart.findOne({ owner: req.user._id })
            .populate("items.item")
            .exec()
            .then(cart => {
                res.render('cart/cart', { cart: cart })
            }).catch(err => { throw Error(err) })
    },
    removeProduct: (req, res) => {
        //Remove item 
        //Updates total
        Cart.findOne({ owner: req.user._id })
            .then(cart => {
                cart.items.pull(req.body.item)
                cart.total = (cart.total - parseFloat(req.body.price).toFixed(2))
                cart.save()
                    .then(cart => {
                        req.flash("success", "Removed")
                        res.redirect("back")
                    }).catch(err => {
                        let errors = {}
                        errors.status = 500
                        errors.message = err
                        res.status(error.status).json(errors)
                    })
            })
            .catch(err => {
                let errors = {}
                errors.status = 500
                errors.message = err
                res.status(error.status).json(errors)
            })
    }

}

    // .catch(err => {
    //     let errors = {}
    //     errors.status = 500
    //     errors.message = err
    //     res.status(error.status).json(errors)
    // })