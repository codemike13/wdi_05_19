//route to '// sending hey from cart
require('dotenv').config()
const async = require('async')
const express = require('express');
const router = express.Router();
const Cart = require('./models/Cart')
const cartController = require('../cart/controllers/cartController')
const stripe = require('stripe')(process.env.KEY)
const User = require('../users/models/User')

router.get('/', (req, res) => {
    res.send('Hey from cart ass')
})

router.post('/product', cartController.addProductToCart)

router.get('/cart', cartController.getUserShoppingCart)

router.delete('/remove', cartController.removeProduct)

router.post('/payment', (req, res, next) => {
    const stripeToken = req.body.stripeToken
    console.log('stripeToken: ', stripeToken);

    const currentCharges = req.body.stripeMoney * 100

    stripe.customers
        .create({
            source: stripeToken
        }).then(customer => {
            const result = stripe.charges.create({

                amount: currentCharges,
                currency: 'usd',
                customer: customer.id

            })

            return result
        }).then(result => {
            async.waterfall([
                (callback) => {
                    Cart.findOne({
                        owner: req.user._id
                    }, (error, cart) => {
                        callback(error, cart)
                    })
                },
                (cart, callback) => {
                    let user = req.user
                    for (let order of cart.items) {
                        user.history.push({
                            item: order.item,
                            paid: order.price
                        })
                    }
                    user.save((error, user) => {
                        if (error) return next(error)
                        callback(null, cart)
                    })
                },
                (cart) => {
                    cart.items = []
                    cart.total = 0
                    cart.save()
                        .then(cart => {
                            res.render('cart/thanks')
                        })
                        .catch(err => {
                            throw Error(err)
                        })
                }
            ])
        }).catch(error => {
            let errors = {}
            errors.status = 500,
                errors.message = error
            res.status(errors.status).json(errors)
        })

})

module.exports = router