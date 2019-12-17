const mongoose=require("mongoose");
const schema=mongoose.Schema;
let empSchema=new schema(
    {
        _id:{type:String,required:true},
        isAdmin:{type:Boolean,required:true},
        phone:{type:String,required:true},
        password:{type:String,required:false}
      
    }
)
module.exports=mongoose.model("Emp",empSchema,"employees")