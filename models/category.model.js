const mongoose =require("mongoose");
const schema = mongoose.Schema;

let CategorySchema=new schema({
    _id:{type:String,required:true},
    icon:{type:String,required:false},

});
module.exports=mongoose.model("category",CategorySchema,"category");