const mongoose = require("mongoose");
const schema = mongoose.Schema;

let productSchema = new schema({
    English_Name: { type: String, required: true, unique: true },
    Arabic_Name: { type: String, required: true },
    sci_Name: { type: String, required: false },
    company: { type: String, required: false },
    category: { type: String, required: false, ref: "category" },
    price: { type: String, required: false },
    photo: { type: String, required: false, default: process.env.baseUrl+"/product/public/image/product.png" },
    avilable: { type: Boolean, required: true, default: false },
    avilableQantaty: { type: Number, required: true, default: 1 }
});
module.exports = mongoose.model("Product", productSchema, "product");