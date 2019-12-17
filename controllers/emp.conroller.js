const Emp = require('../models/emp.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.allEmp = (req, res) => {
    Emp.find(null).then((emps) => {
        if (!emps) res.status(404).json({ massage: "no users avilable" });
        res.status(200).json(emps);

    }).catch((err) => {
        res.status(404).json({ massage: err });
    })
}


exports.admins = (req, res) => {
    Emp.find({ isAdmin: true }).then((emps) => {
        if (!emps) res.status(404).json({ massage: "no users avilable" });
        res.status(200).json(emps);

    }).catch((err) => {
        res.status(404).json({ massage: err });
    })
}

exports.delivery = (req, res) => {
    Emp.find({ isAdmin: false }).then((emps) => {
        if (!emps) res.status(404).json({ massage: "no users avilable" });
        res.status(200).json({ dlvry: emps });

    }).catch((err) => {
        res.status(404).json({ massage: err });
    })
}
exports.details = (req, res) => {
    console.log(req.params.id)
    if (req.params.id == null || req.params.id == undefined)
        Emp.find(null).then((emps) => {
            if (!emps) res.status(404).json({ massage: "no users avilable" });
            let decoded = jwt.verify(req.headers.cookie, process.env.JWT_KEY, null);
            userID = decoded.empname;
            console.log(userID)
            Emp.find({ _id: userID }).then((emp) => {
                if (!emps || emps.length == 0) res.status(404).json({ massage: "no users avilable" });
                res.status(200).json({ emp: emp, emps: emps });

            }).catch((err) => {
                res.status(404).json({ massage: err });
            })


        }).catch((err) => {
            res.status(404).json({ massage: err });
        })
    else {
        Emp.find(null).then((emps) => {
            if (!emps) res.status(404).json({ massage: "no users avilable" });
            userID = req.params.id;
            console.log(userID)
            Emp.find({ _id: userID }).then((emp) => {
                if (!emps || emps.length == 0) res.status(404).json({ massage: "no users avilable" });
                res.status(200).json({ emp: emp, emps: emps });

            }).catch((err) => {
                res.status(404).json({ massage: err });
            })


        }).catch((err) => {
            res.status(404).json({ massage: err });
        })
    }
}




exports.create = (req, res) => {
    let password = req.body.password;
    if (password != null) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.status(500).json({ error: err });

            else {
                let emp = new Emp(
                    {
                        _id: req.body.empName,
                        phone: req.body.phone,
                        isAdmin: true,
                        password: hash
                    }
                )
                emp.save().then((user) => {
                    if (!user) res.status(500).json("user wasn't saved");
                    res.status(201).json(user);

                }).catch((err) => {
                    console.log(err);
                    res.status(500).json({ Error: err })
                }
                )
            }
        });
    } else {
        let emp = new Emp(
            {
                _id: req.body.empName,
                phone: req.body.phone,
                isAdmin: false,
                password: null
            }
        )
        emp.save().then((user) => {
            if (!user) res.status(500).json("user wasn't saved");
            res.status(201).json(user);

        }).catch((err) => {
            console.log(err);
            res.status(500).json({ Error: err })
        }
        )
    }
}
exports.loggin = (req, res, next) => {
    console.log(req.body)
    Emp.findOne({ _id: req.body.userName }).then(emp => {
        if (emp != null) {
            bcrypt.compare(req.body.password, emp.password, (err, result) => {
                if (err) {
                    console.log(err)
                    return err;
                } if (result == true) {
                    const token = jwt.sign({ empname: emp._id, phone: emp.phone },
                        process.env.JWT_KEY,
                        { expiresIn: "1h" }
                    )
                    // console.log(token);
                    //req.header.authorization=token
                    // res.header("Authorization", token)
                    res.send({ success: true, token: token })

                }
                else {
                    res.send({ success: false, code: 404 });
                }
            })
        } else {
            res.send("user not found")
        }
    }).catch(error => {
        console.log(error)
        return error;
    })
}


exports.remove = (req, res) => {
    Emp.findByIdAndDelete(req.params.id).then((emps) => {
        if (!emps) return res.status(404).json({ massage: "no users avilable" });
        res.status(200).json({ massage: "users deleted" });

    }).catch((err) => {
        res.status(404).json({ massage: err });
    })
}
exports.logout = (req, res) => {
    console.log(req.headers.cookie)
    req.headers.cookie = (null, { expires: Date.now() });
    console.log(req.headers.cookie)
    res.redirect("/")
}
exports.patch = (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        let decoded = jwt.verify(req.headers.cookie, process.env.JWT_KEY, null);
        userID = decoded.empname;

        console.log(userID)
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.status(500).json({ error: err });
            req.body.password = hash
            Emp.findOneAndUpdate({ _id: userID }, req.body, (err, res) => {
                if (err) return (err);
                res.code(201).json({ success: true })
            })

        })
    }

    else {
        userID = req.params.id;
        console.log(userID)
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) return res.status(500).json({ error: err });
            req.body.password = hash
            Emp.findOneAndUpdate({ _id: userID }, req.body, (err, res) => {
                if (err) return (err);
                res.code(201).json({ success: true })
            })


        })
    }
}