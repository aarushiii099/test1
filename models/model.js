const mongoose=require("mongoose")
const Schema=mongoose.Schema

const UserSchema=new Schema({
    email:{
        type:String,
        required:[true,"enter email ! email is mandatory"],
        unique:true,
        validate:{
            validator:function(exp){
            return /[a-zA-Z0-9]+@[a-zA-Z]+.[a-zA-Z]{2,3}$/.test(exp)
            },
            message:property=>`${property.value} is not valid` 
        }
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    }
})


const UserModel=mongoose.model("UserModel",UserSchema)


module.exports=UserModel