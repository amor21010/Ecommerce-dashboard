const Order = require("../models/order.model");
const Emp = require('../models/emp.model')
const User = require('../models/user.model')
const Product = require('../models/product.model')
exports.test = function (req, res) {
    res.send("test");
};




exports.create = function (req, res) {

    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    var hours = today.getHours()
    if (hours < 12) {

        var time = hours + ":" + today.getMinutes() + ":" + today.getSeconds();

        var dateTime = date + ' ' + time;
    } else {
        hours = hours - 12;
        var time = hours + ":" + today.getMinutes() + ":" + today.getSeconds();

        var dateTime = date + ' ' + time + ' ' + 'P.M';
    }

    let order = new Order({
        time: dateTime,
        owner: req.body.owner,
        seller: req.body.seller,
        delivary: req.body.delivary,
        totalPrice: Math.abs(req.body.totalPrice) + Math.abs(process.env.fee),
        status: "waiting",
        products: []
    });

    order.save((err) => {
        if (err) res.send("fail\n" + err);
        else
            res.send(order);
    });
};

exports.addProduct = function (req, res) {


    Order.updateOne({ _id: req.params.id }, {
        $push: {
            products: [{
                productName: req.body.productID,
                Quantity: req.body.Quantity
            }]
        }
    }, (err) => {
        if (err) return err;
        res.status(200).json({ success: true, msg: 'produt add' });
    }
    )

}

exports.removeProduct = function (req, res) {


    Order.updateOne({ _id: req.params.id, "products.productName": req.body.productId }, {
        $pull: {
            products: {
                productName: req.body.productId
            }
        }


    }, (err) => {
        if (err) {
            console.log(err)
            return err;
        }
        res.status(200).json({ success: true, msg: 'produt add' });

    })
}

exports.updateQ = function (req, res) {

    Order.updateOne({ _id: req.params.id, "products.productName": req.body.productID }, {

        $set: {

            "products.$.Quantity": req.body.Quantity
        }

    }, (err) => {
        if (err) {
            console.log(err)
            return err;
        }
        console.log(req.body);
        res.status(200).redirect("/order/" + req.params.id);
    })


}
exports.updateQ_and = function (req, res) {

    Order.updateOne({ _id: req.params.id, "products.productName": req.body.productID }, {

        $set: {

            "products.$.Quantity": req.body.Quantity
        }

    }, (err) => {
        if (err) {
            console.log(err)
            return err;
        }
        console.log(req.body);
        res.status(200).json({ success: true });
    })


}

exports.update = function (req, res) {
    console.log(req.body, req.params.id)


    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    var hours = today.getHours()
    if (hours < 12) {

        var time = hours + ":" + today.getMinutes() + ":" + today.getSeconds();

        var dateTime = date + ' ' + time;
    } else {
        hours = hours - 12;
        var time = hours + ":" + today.getMinutes() + ":" + today.getSeconds();

        var dateTime = date + ' ' + time + ' ' + 'P.M' + ' (updated)';
    }

    const currentOrder = Order.find({ _id: req.params.id })
    console.log(req.body);

    if (req.body.owner != null) {
        Order.updateOne(currentOrder, { "$set": { time: dateTime, owner: req.body.owner } }, (err) => {
            if (err) return err;
        })
    };

    if (req.body.seller != null) {
        Order.updateOne(currentOrder, { "$set": { time: dateTime, seller: req.body.seller } }, (err) => {
            if (err) return err;
        })
    };
    if (req.body.delivary != null) {
        Order.updateOne(currentOrder, { "$set": { time: dateTime, delivary: req.body.delivary } }, (err) => {
            if (err) return err;
        })
    };
    if (req.body.status != null) {
        Order.updateOne(currentOrder, { "$set": { time: dateTime, status: req.body.status } }, (err) => {
            if (err) return err;
        })
    };
    if (req.body.totalPrice != null) {
        console.log()
        Order.updateOne(currentOrder, { "$set": { time: dateTime, totalPrice: req.body.totalPrice } }, (err) => {
            if (err) return err;
        })
    };
    if (req.body.products != null) {
        Order.updateOne(currentOrder, { "$set": { time: dateTime, products: req.body.products } }, (err) => {
            if (err) return err;

        })
    }

    res.status(200).redirect("/order");

};


exports.order_details_android = (req, res) => {
    Order.findById(req.params.id).populate("products.productName").exec().
        then(order => {
            if (!order) return res.status(404).json({
                massage: "not found"
            })
            res.status(200).send(order)
        }

        ).catch(err => {
            console.log(err)
            res.status(404).json({
                massage: "not found"
            })
        }
        )
}
exports.user_orders = (req, res) => {
    Order.find({ owner: req.params.username }).exec().then(result => {
        if (result.length != 0) {
            res.send(result).status(200)
        } else res.status(404).json({ massage: "no Orders yet" });
    }).catch(err => {
        res.status(500).json({ error: err })
    })
}


exports.order_details_dash = (req, res) => {
    Order.findById(req.params.id).populate('products.productName').select('*' - '__v').exec().
        then(order => {
            User.find({ _id: order.owner }).exec().then((user) => {

                Emp.find({ isAdmin: false }).exec().then((emp) => {
                    if (!emp) return res.status(404).json({
                        order: order,
                        user: user,
                        emps: null
                    })
                    else res.status(200).json({
                        emps: emp,
                        user: user,
                        order: order
                    })

                })



            }).catch(err => {
                console.log(err)
                res.status(404).json({
                    massage: "user not found"
                }).redirect("/")
            })
        }).catch(err => {
            console.log(err)
            res.status(404).json({
                massage: "order not found"
            })
        }
        )
}


exports.allorders = (req, res) => {
    Order.find(null).populate("owner").exec().
        then(order => {
            if (order.length != 0)
                res.status(200).json({
                    order: order
                })
        }).catch(err => {
            console.log(err)
            res.status(404).json({
                massage: " not found"
            })
        })

};

exports.allordersHome = (req, res) => {
    Order.find(null).populate("owner").sort("time").limit(20).exec().
        then(order => {
            if (order.length != 0)
                res.status(200).json({
                    order: order
                })
        }).catch(err => {
            console.log(err)
            res.status(404).json({
                massage: " not found"
            })
        })

};


// exports.checkTotal = (req, res) => {
//     Order.findOne({ _id: req.params.id }, (err, order) => {
//         console.log(order.products.length)
//         for (i = 0; i < order.products.length; i++) {

//             Product.findOne({ _id: order.products[i].productName }, (errr, product) => {
//                 console.log(product);
//                 var Quantity = Math.abs(order.products[i].Quantity);
//                 Order.updateOne({ _id: req.params.id }, {
//                     $set: {
//                         totalPrice: Math.abs(order.totalPrice) + Quantity * Math.abs(product.price) + Math.abs(process.env.fee),
//                     }
//                 }, error => { console.log(error) });
//                 console.log(product)
//             });
//             if (err) {
//                 console.log(err);
//                 return err;
//             }


//         }
//     })
// } 