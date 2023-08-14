const express = require("express");
const UserModel = require("../Models/userModel");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt =  require("jsonwebtoken");
require("dotenv").config();

UserRouter.post("/register",async(req,res)=>{
    let obj = {...req.body};
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if(err)
            console.log(err);
            else
            obj.password = hash;
            console.log(hash);
            const data = new UserModel(obj);
            data.save();
            res.status(201).json({Message : "User registered Sucessfully",data : data});
        });
    });    
});

UserRouter.post("/login",async(req,res)=>{
    let obj = {...req.body};
    const data = await UserModel.find({email:req.body.email})
    if(data.length)
    {
        bcrypt.compare(obj.password, data[0].password, function async(err, result) {
            // if(err)
            // res.status(400).json({err : err.message , data :"hashing error"});
            if(result){
                var token = jwt.sign({_id:data[0]._id}, process.env.jwtkey);
                    console.log(token);
                    res.status(201).json({message : "Logged in Sucessfull" , token});                
            }
            
            else
            res.status(400).json({message : "Incorrect Password"});
        });
    }
    else
    res.status(400).json({message : "Enter Valid Email ID or register as new user"});
})



module.exports = UserRouter;