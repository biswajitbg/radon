const newBook = require('../models/newBook');
const newAuthor = require('../models/newAuthor');
const newPublisher = require('../models/newPublisher');


const createBook = async (req,res)=>{
    const {author , publisher} = req.body;
    if(!author || !publisher){
      return  res.send({msg:" author and publisher both are required"})
    }else{
        const authorId = await newAuthor.findById(author);
        const publisherId = await newPublisher.findById(publisher);
        if(!authorId && !publisherId){
            return  res.send({msg:" author and publisher "})
        }else{
           const data = await newBook.create(req.body);
           res.send({msg:data, status:true})
        }
    }
}

const getAllBook = async(req,res)=>{
    const data = await newBook.find().populate("author").populate('publisher');
    res.send(data);
}


module.exports = {createBook ,getAllBook}