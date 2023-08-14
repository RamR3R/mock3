const express = require("express");
const FlightRouter = express.Router();
const FlightModel = require("../Models/filghtModel")

FlightRouter.get("/flights/:id",async(req,res)=>{
    let q = {};

    if(req.params.id)
    q = {__id : req.params.id}
    else
    q = {};

    const data = await FlightModel.find(q);
    console.log(data);
    res.status(200).json({data : data});
});

FlightRouter.get("/flights",async(req,res)=>{
    const data = await FlightModel.find();
    res.status(200).json({data : data});
});

FlightRouter.post("/flights",async(req,res)=>{

    const data = new FlightModel({...req.body});
    data.save();
    res.status(201).json({data : data});
});

FlightRouter.patch("/flights/:id",async(req,res)=>{

    try{
        const data = await FlightModel.findByIdAndUpdate({_id:req.params.id},{...req.body},{new:true})
    res.status(204).json({message : "Filght details pathced " , data : data});
    }
    catch(err)
    {
        res.send({err : err.message});
    }
});

FlightRouter.delete("/flights/:id",async(req,res)=>{

    try{
        const data = await FlightModel.findByIdAndDelete(req.params.id,{new:true})
        res.status(202).json({message : "Filght delted" , data : data});
    }
    catch(err)
    {
        res.send({err : err.message});
    }
});

module.exports = FlightRouter;
