const User = require("../models/user.model");
const Oreder = require('../models/order.model')
const bcrybt = require('bcrypt');


exports.test = function (req, res) {
    res.send("test");
};
exports.create = function (req, res) {
    User.find({ email: req.body.email })
        .exec()
        .then(data => {
            if (data.length != 0) {
                return res.status(409).json({ message: "email already exicts" })
            } else {
                console.log(req.body.password)
                bcrybt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {

                        console.log(err)
                        return res.status(500).json({ error: err });
                    } else {
                        console.log(hash);
                        if (req.file != null || req.file != undefined) {
                            let photo = req.file.path;
                            photo = photo.replace(/\\/g, '/');
                            photo = photo.replace(/ /g, '%20');
                            let user = new User({
                                fullName: req.body.fullName,
                                phone: req.body.phone,
                                email: req.body.email,
                                password: hash,
                                photo: process.env.baseUrl + "/user/" + photo,
                                blocked: req.body.blocked,
                                verfied: req.body.verfied,
                                address: req.body.address,
                                age: req.body.age,
                                gender: req.body.gender
                            });
                            user.save((err) => {
                                if (err) {
                                    res.send("fail\n" + err);
                                    console.log(err)
                                } else
                                    res.send(user);
                                console.log(user)
                            });
                        } else if ((req.body.gender).toLowerCase() == "male") {
                            let user = new User({
                                fullName: req.body.fullName,
                                phone: req.body.phone,
                                email: req.body.email,
                                password: hash,
                                photo: process.env.baseUrl + "/user/public/image/user.png",
                                blocked: req.body.blocked,
                                verfied: req.body.verfied,
                                address: req.body.address,
                                age: req.body.age,
                                gender: req.body.gender
                            })
                            user.save((err) => {
                                if (err) {
                                    res.send("fail\n" + err);
                                    console.log(err)
                                } else
                                    res.send(user);
                                console.log(user)
                            });
                        }
                        else if ((req.body.gender).toLowerCase() == "female") {
                            let user = new User({
                                fullName: req.body.fullName,
                                phone: req.body.phone,
                                email: req.body.email,
                                password: hash,
                                photo: process.env.baseUrl + "/user/public/image/userFemale.png",
                                blocked: req.body.blocked,
                                verfied: req.body.verfied,
                                address: req.body.address,
                                age: req.body.age,
                                gender: req.body.gender
                            })
                            user.save((err) => {
                                if (err) {
                                    res.send("fail\n" + err);
                                    console.log(err)
                                } else
                                    res.send(user);
                                console.log(user)
                            });
                        }
                    };
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(400).json({ message: err })
        });

};

exports.user_details = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
            return err;
        }
        Oreder.find({ owner: user._id }, (err, order) => {
            if (err) {
                console.log(err);
                return err;
            }

            res.send({ user, order });
        });
    });
};

exports.user_details_android = (req, res) => {
    User.findById(req.params.id, (err, user) => {
        if (err) {
            console.log(err);
            return err;
        }
        res.send(user);
    });

};
exports.allusers = (req, res) => {
    let query = User.find(null);
    query.sort("fullName");
    query.exec((err, user) => {
        if (err) return err;
        res.send(user);
    })

};

exports.allusersHome = (req, res) => {
    let query = User.find(null).limit(20);
    query.sort("fullName");
    query.exec((err, user) => {
        if (err) return err;
        res.send(user);
    })

};


exports.user_update = (req, res) => {
    if (req.body.password != null || req.body.password != "") {
        bcrybt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ error: err });
            } else {

                if ((req.body.gender).toLowerCase() == "female") {
                    req.body.photo = process.env.baseUrl + "/user/public/image/userFemale.png";
                } else {
                    req.body.photo = process.env.baseUrl + "/user/public/image/user.png";
                }
                req.body.password = hash;
                User.findByIdAndUpdate(req.params.id, { $set: req.body },
                    (err, user) => {
                        if (err) return err;
                        console.log(req.body)
                        res.send("user updated");
                    });
            };

        });
    } else {
        if ((req.body.gender).toLowerCase() == "female") {
            req.body.photo = process.env.baseUrl + "/user/public/image/userFemale.png";
        } else {
            req.body.photo = process.env.baseUrl + "/user/public/image/user.png";
        }
        User.findByIdAndUpdate(req.params.id, { $set: req.body },
            (err, user) => {
                if (err) return err;
                console.log(req.body)
                res.send("user updated");
            });
    }
}

exports.user_update_Photo = (req, res) => {
    if (req.body != null) {
        let photo = req.body.photo;
        photo = photo.replace(/\\/g, '/');
        photo = photo.replace(/ /g, '%20');
        User.findByIdAndUpdate(req.params.id, { $set: { photo: process.env.baseUrl + "/user/" + photo } },
            (err, user) => {
                if (err) return err;
                console.log(req.file)
                res.send("user updated");
            });
    } else return res.send("failed").status(400);
    console.log(req.body)
};


exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.id,
        (err) => {
            if (err) return err;
            res.send("User removed");
        });
};

exports.login = (req, res, next) => {
    console.log(req.body)
    User.findOne({ email: req.body.email })
        .exec().then(user => {
            if (user != null) {
                console.log(user)
                bcrybt.compare(req.body.password, user.password, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.status(401).json({ message: "auth faild" })
                    };
                    if (result == true) {
                        console.log(" ' " + user.fullName + " ' " + " ' " + user.phone + " ' " + " ' " + user.email + " ' " + " loged by mobile");
                        res.send(user);

                    } else {
                        res.send({ success: false, code: 404 });
                    }
                })
            }
        }).catch(err => {
            console.log(err)
            res.send({ success: false, code: 404, error: err });
        });

}



exports.forgetPass = (req, res) => {
    User.findOne({ email: req.body.email, phone: req.body.phone }).exec().then(user => {
        var password = "";
        var length = 10,
            charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#?";

        for (var i = 0, n = charset.length; i < length; ++i) {
            password += charset.charAt(Math.floor(Math.random() * n));
        }
        bcrybt.hash(password, 10, (err, hash) => {
            if (err) return res.status(500).json({ error: err });
            else {
                req.body.password = hash;
                User.findByIdAndUpdate({ _id: req.params.id }, { $set: { password: req.body.password } },
                    (err, user) => {
                        if (err) return err;
                        console.log(req.body)
                        res.send(password);
                    });
            };
        });

    })


}


