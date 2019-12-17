const jwt = require('jsonwebtoken');


exports.tokenGen = (req, res, next) => {
    console.log(req.headers);

    try {
        //jwt.verify(req.headers.cookie, process.env.JWT_KEY, null);
        let decoded=jwt.verify(req.headers.cookie, process.env.JWT_KEY, null);
        req.userID=decoded.empname;
        console.log(req.userID)
        next()
    }

    catch (err) {
        try{
            jwt.verify(req.headers.authinticate, process.env.JWT_KEY, null)
            next()
        }
        catch (andr) {
          
            return res.status(401).redirect("/")
        }
    }

}