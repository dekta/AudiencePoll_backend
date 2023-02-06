const express = require("express");

const {EventModel} = require("../models/event.model");

const EventRouter = express.Router();

EventRouter.use(express.json())


EventRouter.get("/allques",async (req,res)=>{
    let data = await EventModel.find()
    res.send(data)
})

EventRouter.get("/getAns",async(req,res)=>{
    res.send("ok")
    //let code = req.code
    // let data =  await AnsModel.find({})
    // res.send(data)
    // if(data.eventCode==code){
    //     res.send(data)
    // }
    
})



module.exports = {EventRouter}