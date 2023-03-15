const express = require('express')
const router = new express.Router()
const Models =require("../../models")
const jwt = require("jsonwebtoken")
const SECERET_KEY = process.env.SECRET_KEY


router.post('/signup', async( req, res) => {
    try {
     let email=req.body.email
     let userName=req.body.userName
     let password=req.body.password
     
     let adminExists = await Models.Admin.findOne({
        where:{
            email:email
        }
     }) 
     if(adminExists){
        return res.json({
            msg:"error",
            error:"Admin withh this email already exists!"
        })
     }
     let admin=await Models.Admin.create(req.body)
     return res.json({
        msg:"success",
        data:admin
     })
   
} catch (error) {
    return res.json({
        message: 'Error',
        error: error.message
    })
   }
 })

router.post('/login', async( req, res) => {
   try {
    console.log(req.body)
    let email=req.body.email
    let password=req.body.password
    
    let user=await Models.Admin.findOne({
        where:{
            email:email,
            password:password
        }
    })
    if(!user){
        return res.json({
            message: 'User not found!',
            data: null
        })
       
    }

    //create token using jwt 
    const matchedPassword = user
    console.log('matched password', user.password + "       "+password)
    let userPassword=user.password
    
    if(userPassword.toString() !== password.toString()){
        return res.json({messsage: "Invalid Credentials"});
    }
    const token = jwt.sign(
        {email: user.email, id: user.id},
        process.env.SECRET_KEY
    );
    return res.json({
        message: 'OK',
        data: user,
        token:token
    })
   } catch (error) {
    return res.json({
        message: 'Error',
        error: error.message
    })
   }
})




module.exports = router