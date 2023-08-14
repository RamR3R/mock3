const express = require("express");
const BookingModel = require("../Models/bookingModel");
const BookingRouter = express.Router();
const jwt = require("jsonwebtoken");

BookingRouter.post("/booking",async(req,res)=>{
    let obj = {...req.body};
    const data = new BookingModel(obj);
    await data.save();

    res.status(201).json({message : "Flight booked" , data: data});
});

BookingRouter.get("/dashboard",async(req,res)=>{
    let token = req.headers.authorization.split(" ")[1]; 
    var decoded = jwt.verify(token, process.env.jwtkey);
    // console.log(decoded);
    if(decoded)
    {
        console.log(decoded);
        const data = await BookingModel.find({user:decoded._id}).populate("flight").populate("user");
        res.status(200).json({message : "Users Flights Fetched", data:data});
    }
    else{
        res.status(400).json({message : "Login to check it"});
    }
});

BookingRouter.patch("/dashboard/:id",async(req,res)=>{
    
    try{
        let token = req.headers.authorization.split(" ")[1]; 
        var decoded = jwt.verify(token, process.env.jwtkey);
        if(decoded){
        const data = await BookingModel.findByIdAndUpdate({_id:req.params.id},{...req.body},{new:true})
        res.status(204).json({message : "Filght Booking Updated " , data : data});
        }
    }
    catch(err)
    {
        res.send({err : "Enter valid JWT after Login"});
    }
});

BookingRouter.delete("/dashboard/:id",async(req,res)=>{
    
    try{
        let token = req.headers.authorization.split(" ")[1]; 
        var decoded = jwt.verify(token, process.env.jwtkey);
        if(decoded){
        const data = await BookingModel.findByIdAndDelete({_id:req.params.id})
        res.status(202).json({message : "Filght Booking Deleted " , data : data});
        }
    }
    catch(err)
    {
        res.send({err : "Enter valid JWT after Login"});
    }
});


module.exports = BookingRouter;
