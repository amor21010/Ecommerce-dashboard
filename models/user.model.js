const moongose = require('mongoose');
const schema = moongose.Schema;
let userSchema = new schema({
    fullName: { type: String, require: true },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },
    password: { type: String, required: true },
    photo: { type: String, required: false, default: "http://192.168.1.8:8088/product/public/image/user.png" },
    blocked: { type: Boolean, required: false, default: false },
    verfied: { type: Boolean, required: false, default: false },
    address: { type: String, required: true },
    age: { type: Number, required: true, default: 18 },
    gender: { type: String, required: true, default: "male" },
    token: { type: String, required: false }


});
module.exports = moongose.model("User", userSchema, "user")
