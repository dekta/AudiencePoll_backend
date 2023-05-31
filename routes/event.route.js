const express = require("express");
const jwt = require("jsonwebtoken");
const { EventModel } = require("../models/event.model");

const EventRouter = express.Router();

EventRouter.use(express.json());

// all events routes
EventRouter.post("/allques", async (req, res) => {
  let { token } = req.body;
  if (!token) {
    res
      .status(401)
      .send({ error: "Authorization token not provided , please login" });
    return;
  }
  jwt.verify(token, process.env.JwtKey, async (err, decoded) => {
    if (err) {
      res.status(401).send({ error: "Invalid token" });
      return;
    }
    const userEmail = decoded.email;
    
    let data = await EventModel.find({ userEmail });
    
    res.status(200).send(data);
  });
});

// event Created
EventRouter.post("/ques", async (req, res) => {
  const { eventId, eventName, question, time, userEmail } = req.body;
  try {
    let event = new EventModel({
      eventId,
      eventName,
      question,
      time,
      userEmail
    });
    await event.save();
    res.send({ msg: "event created" });
  } catch (err) {
    res.send(err);
  }
});


// added answer in event
EventRouter.post("/ans", async (req, res) => {
  const { userEmail, eventId } = req.body;
  try{
    let event = await EventModel.findOne({userEmail,eventId})
    if(event){
        res.status(200).send({"answers":event.answers})
    }
    else{
        res.status(501).send({"msg":"no event"})
    }
  }
  catch(err){
    res.status(501).send({"error":"server side error"})
  }
});


// update status
EventRouter.patch("/status", async (req, res) => {
  const {userEmail,eventId} = req.body;
  try{
    let event = await EventModel.findOne({userEmail,eventId})
    if(event){
        let update = {Status:"Expired"}
        let filter = {eventId}
        await EventModel.findOneAndUpdate(filter,update)
        res.status(200).send({"msg":"Status updated"})
    }
    else{
        res.status(501).send({"msg":"no event"})
    }
  }
  catch(err){
    res.status(501).send({"error":"server side error"})
  }
});




module.exports = { EventRouter };
