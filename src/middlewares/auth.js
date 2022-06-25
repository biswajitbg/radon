const jwt = require('jsonwebtoken')
const Blogs = require("../models/blogModel")
const mongoose = require('mongoose')


const authenticate = async function (req, res, next) {
try{
  let token = req.headers['x-api-key']
  if (!token) token = req.headers['x-Api-key']
  if (!token) res.status(400).send({ status: false, msg: "PLease input token " })
  let userBlog = req.params.blogid
  if(userBlog === ":blogid") return res.status(400).send({status:false, msg:"Please enter blogId"})
  let validtoken = jwt.verify(token, "Project1-Blogs")
  if (!validtoken) return res.status(402).send({ status: false, msg: "Please enter valid Token " })
  next()
}catch (err) {
    res.status(500).send({
        status: false,
        msg: err.message,
    })
}

}

const authorise = async function (req, res, next) {
try{
  let data=req.params
  if(!data) return res.status(400).send({status:false, msg:"Please enter blogid in params"})
  let token = req.headers['x-api-key']
  if (!token) {
    return res.status(400).send({ status: false, msg: "Please input token headers" })
  }
  let decodedtoken = jwt.verify(token, "Project1-Blogs")
  if (!decodedtoken) return res.status(402).send({ status: false, msg: "Please enter valid token " })
  let userBlog = req.params.blogid
  if(userBlog === ":blogid") return res.status(400).send({status:false, msg:"Please enter blogId"})
  let userAuth = decodedtoken.userId
  let findBlogs = await Blogs.findOne({_id:userBlog });
  if (!findBlogs) return res.status(402).send({ status: false, msg: "Please enter valid blogId" })
  if (userAuth != findBlogs.authorId) return res.status(404).send({status:false,msg: "Please login with your mail id "})
  next()
}catch (err) {
  res.status(500).send({
      status: false,
      msg: err.message,
  })
}
}


module.exports.authenticate = authenticate
module.exports.authorise = authorise