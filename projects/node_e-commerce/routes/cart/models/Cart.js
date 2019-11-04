//Owner , user Id
//total number (price*quantity)
//items
//
//item, ref to product
//price
//
const mongoose = require('mongoose')

const CartSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    total: { type: Number, default: 0 },
    items: [{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        },
        price: { type: Number, defalut: 0 },
        quantity: { type: Number, defalut: 1 },
    }]
})

module.exports = mongoose.model('cart', CartSchema)