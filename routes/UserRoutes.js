const express=require("express")
const router=express.Router()
const Controllers=require("../controllers/controller")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


router.post("/signUp",Controllers.userSignUp)
router.post("/signIn",Controllers.userSignIn)
router.put("/logout",Controllers.userLogOut)



function authorize (req,res,next){
    try{

    let reqToken = req.headers['authorization'];
    const Token = reqToken.replace("Bearer ", '');
    const verifiedtoken = jwt.verify(Token, "martini");
    console.log(verifiedtoken)
    req.token = verifiedtoken;
    console.log(req.token)
    next();
    return;
    }
    catch(err){
        // console.log(err);
        res.send({msg:"you are not authorized",status:false});
    }
}



module.exports = router;