const Product = require("../models/product.model");
const category = require("../models/category.model");


exports.test = function (req, res) {
    res.send("test");
};



exports.product_creat = (req, res) => {
    try {
        let photo = req.file.path;
        photo = photo.replace(/\\/g, '/');
        photo = photo.replace(/ /g, '%20');
        photo = photo.replace(/'()'/,'_');
        let product = new Product({
            English_Name: req.body.English_Name,
            Arabic_Name: req.body.Arabic_Name,
            sci_Name: req.body.sci_Name,
            company: req.body.company,
            category: req.body.category,
            price: req.body.price,
            photo: process.env.baseUrl+"/product/" + photo,
            avilable: req.body.avilable,
            avilableQantaty: req.body.avilableQantaty
        });

        product.save((err) => {
            if (err) return err;
            res.redirect("/product");
        });
    } catch{
        let product = new Product({
            English_Name: req.body.English_Name,
            Arabic_Name: req.body.Arabic_Name,
            sci_Name: req.body.sci_Name,
            company: req.body.company,
            category: req.body.category,
            price: req.body.price,
            photo: process.env.baseUrl+"/product/public/image/products/defult.png",
            avilable: req.body.avilable,
            avilableQantaty: req.body.avilableQantaty
        });

        product.save((err) => {
            if (err) return err;
            res.redirect("/product");
        });
    }
};

exports.product_details_dash = (req, res) => {

    Product.findOne({ _id: req.params.id }).exec().then((product) => {
        if (!product) {
            res.status(404).json({
                massage: "no product to show"
            })
        } else {
            category.find(null).exec().then(category => {
                if (category != null) {
                    res.status(200).json
                        (
                            {
                                product: product,
                                category: category
                            }
                        )
                } else res.status(200).json(product)
            }).catch((err) => {
                console.log(err)
                res.status(404).json({
                    error: err
                })
            })

        }
    }).catch((err) => {
        console.log(err)
        res.status(404).json({
            error: err
        })
    })

};

exports.product_details = (req, res) => {

    Product.findOne({ _id: req.params.id }).exec().then((product) => {
        if (!product) {
            res.status(404).json({
                massage: "no product to show"
            })
        } else {
            res.status(200).json(product)
        }
    }).catch((err) => {
        console.log(err)
        res.status(404).json({
            error: err
        })
    })

};
exports.allproducts = (req, res) => {
    Product.find(null).sort("English_Name").exec().then((product) => {
        if (!product) {
            res.status(404).json({
                massage: "no product to show"
            })
        } else res.status(200).json(product)
    }).catch((err) => {
        console.log(err)
        res.status(404).json({
            error: err
        })
    });
};

exports.allproductsHome = (req, res) => {
    Product.find(null).sort("English_Name").limit(20).exec().then((product) => {
        if (!product) {
            res.status(404).json({
                massage: "no product to show"
            })
        } else {
            category.find(null).exec().then(category => {
                if (category != null) {
                    res.status(200).json
                        (
                            {
                                product: product,
                                categorys: category
                            }
                        )
                } else res.status(200).json(product)
            }).catch((err) => {
                console.log(err)
                res.status(404).json({
                    error: err
                })
            })

        }
    }).catch((err) => {
        console.log(err)
        res.status(404).json({
            error: err
        })
    })
};



exports.allproducts_dash = (req, res) => {
    Product.find(null).sort("English_Name").exec().then((product) => {
        if (!product) {
            res.status(404).json({
                massage: "no product to show"
            })
        } else {
            category.find(null).exec().then(category => {
                if (category != null) {
                    res.status(200).json
                        (
                            {
                                product: product,
                                categorys: category
                            }
                        )
                } else res.status(200).json(product)
            }).catch((err) => {
                console.log(err)
                res.status(404).json({
                    error: err
                })
            })

        }
    }).catch((err) => {
        console.log(err)
        res.status(404).json({
            error: err
        })
    })
};

exports.category = (req, res) => {
    Product.find({ category: req.params.category }).populate("category").sort("English_Name").exec().then((data) => {
        if (!data) {
            res.status(404).json({
                massage: "no product to show"
            })
        } else {
            res.status(200).json({ product: data })
        }
    }).catch((err) => {
        res.status(404).json({
            error: err
        })
    })
};



exports.product_update_dash = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body },
        (err, product) => {
            if (err) return err;
            res.redirect("/product");
        });
};

exports.product_update = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, { $set: req.body },
        (err, product) => {
            console.log(req.body)
            if (err) return err;
            res.json({success:true});
        });
};

exports.product_delete = (req, res) => {
    Product.findByIdAndRemove(req.params.id,
        (err) => {
            if (err) return err;
            res.send("product removed");
        });
};
