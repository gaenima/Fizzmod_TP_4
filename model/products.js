const mongoose = require('mongoose')

const Schema = mongoose.Schema

const productsShema = new Schema({
    name: String,
    price: Number,
    description: String,
    photo: String
})

const products = mongoose.model('products', productsShema)

module.exports = {
    products
}