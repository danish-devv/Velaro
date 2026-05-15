import mongoose from "mongoose"

const userSchema=new mongoose.Schema({
name:{
    type:String,
required:[true,"Name is required"],
trim:true
},
email:{
    type:String,
    required:[true,"Email is required"],
    unique:true,
    lowercase:true,
    trim:true,
},
password:{
    type:String,
    required:[true,"password is required"],
    minlength:6,
},
    isAdmin:{
        type:Boolean,
        default:false
    }
},
{timestamps:true}
)

const userModel=mongoose.model('User',userSchema)

export default userModel