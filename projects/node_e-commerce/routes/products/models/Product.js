const mongoose = require('mongoose')
const mongoosastic = require('mongoosastic')

const ProductSchema = new mongoose.Schema({
    cat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cat',
        es_type: 'nested',
        es_include_in_parent: true
    },
    name: { type: String, es_type: 'text', default: '' },
    price: { type: Number, es_type: 'long', default: 0 },
    image: { type: String, es_type: 'text', default: '' },
})

ProductSchema.plugin(mongoosastic, {
    hosts: [
        // 'https://umtupmo5du:6iuuqcn43a@apricot-440144920.us-east-1.bonsaisearch.net:443',
        'localhost:9200'
    ],
    populate: [
        {
            path: 'cat'
        }
    ]
})

module.exports = mongoose.model('product', ProductSchema)