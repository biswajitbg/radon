const newPublisher = require('../models/newPublisher');

const createPublisher = async (req,res)=>{
    const data = await newPublisher.create(req.body);
    res.send({msg:data,status:true})
}

module.exports = {createPublisher}