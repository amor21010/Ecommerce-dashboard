const Category = require('../models/category.model')


exports.create = (req, res) => {
    try{ 
    let photo = req.file.path;
    photo = photo.replace(/\\/g, '/');
    photo = photo.replace(/ /g, '%20');
    let category = new Category({
        _id: req.body.category,
        icon: process.env.baseUrl+"/product/" + photo,
  
    });
    category.save().then(
        (data) => {
            if (!data) {
                res.status(409).json({
                    error: err
                })
            } else {
                res.status(200).json(data)
            }

        }
    
    ).catch(
        (err) => {
            res.status(409).json({
                error: err
            })
        }
    )}catch{
  
        let category = new Category({
            _id: req.body.category,
            icon:process.env.baseUrl+"/category/public/image/category/pills.png"
      
        });
        category.save().then(
            (data) => {
                if (!data) {
                    res.status(409).json({
                        error: err
                    })
                } else {
                    res.status(200).json(data)
                }
    
            }
        
        ).catch(
            (err) => {
                res.status(409).json({
                    error: err
                })
            }
        )

    }
};
exports.remove=(req,res)=>{
 Category.findByIdAndRemove({_id:req.params._id})
 .then((data)=>{
     if(!data) res.status(400).json("category dosen't excist")
     else res.status(201).json(data)
 }).catch(
    res.status(400).json("category dosen't excist")
 )

}






exports.allcategory = (req, res) => {
    Category.find(null).sort("category").exec().then((data) => {
        if (!data) {
            res.status(404).json({
                massage: "no product to show"
            })
        } else {
            res.status(200).json(data)
        }
    }).catch((err) => {
        res.status(404).json({
            massage: "no product to show"
        })
    })
};

