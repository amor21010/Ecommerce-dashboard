const moongose = require('mongoose');
const Product = require("../models/product.model");
const schema = moongose.Schema;


let orderSchema = new schema({
    time: { type: String, required: true },
    owner: { type: String, required: true, ref: "User" },
    seller: { type: String, required: false },
    delivary: { type: String, required: false },
    status: { type: String, default: "waiting" },
    totalPrice: { type: String, required: true },
    products: [{
        productName: { type: String, required: false, unique: false, ref: "Product" },
        Quantity: { type: String, required: false }
    }]

});

module.exports = moongose.model("order", orderSchema, "order");