const UserModel=require("../models/model")

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const privateKey2= "martini"

const Controllers = {};

Controllers.userSignUp=async function(req,res){
    const data = req.body;
    try{
        const user = await UserModel.findOne({email:data.email});
        if(user){
            res.status(404).send({msg:"user already exists", status:false});
        }
        else{
            const hashedPassword = await bcrypt.hash(data.password,5);
            const result=await UserModel.create({
                email:data.email,
                password:hashedPassword,
                username:data.username
            })
            res.status(201).send({msg:"signup successfull",status:true});
        }
    }
    catch(err){
        res.status(404).send({msg:"unknown error occured",status:false,err:err});
    }   
}

Controllers.userSignIn=async function(req,res){
    const data=req.body
    try{
        const user=await UserModel.findOne({email:data.email})
       if(user){
       const comparison=await bcrypt.compare(data.password,user.password)
       console.log(comparison)
       if(comparison){
        const generatedToken=jwt.sign({email:data.email},privateKey2,{expiresIn:'72h',algorithm:'HS512'})//generation of token 
        console.log(generatedToken)
        res.status(200).send({msg:"login successfull",status:true,token:generatedToken,username:user.username})//This username can be rendered in the UI!
       }
       else{
        res.status(404).send({msg:"login is not successfull,check your password",status:false})
       }}
       else{
        res.status(404).send({msg:"login is notsuccessfull,email does not exists",status:false})
       }
    }
    catch(err){
        res.status(404).send(err)
    }
}

Controllers.userLogOut=async function(req,res){
    try{
        res.send({msg:"User has been logged out! Please click on the button below to navigate to home page."})
        //A button for navigating to home page can be created in UI after calling this route.
    }
    catch(err){
        res.send({msg:"User couldn't be logged out",error:err})
    }  
}

module.exports = Controllers;