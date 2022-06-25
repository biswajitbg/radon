const BlogsModel = require("../models/blogModel")
const AuthorModel = require("../models/authorModel")



const createBlogs = async function (req, res) {

    try {
        let data = req.body
        if (data.authorId == undefined) return res.status(400).send({ status: false, msg: 'Please enter author id' })
        let check = await AuthorModel.findById(data.authorId)

        if (!check)
            return res.status(400).send({ status: false, msg: 'Invalid authord id' })
        const createblog = await BlogsModel.create(data)
        if (!createblog) return res.status(401).send({ status: false, msg: 'Please check your inputs' })
        res.status(201).send({ status: true, msg: 'createdblogs', data: createblog })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message,
        })
    }

}


const findBlogs = async function (req, res) {

    try {


        let data = req.query
        const allBlogs = await BlogsModel.find({ isDeleted: false, isPublished: true, ...data }).count()
        if (allBlogs == false) return res.status(404).send({ status: false, msg: "No such Blogs are present" });
        return res.status(200).send({ status: true, msg: "Found Blogs", data: allBlogs })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message,
        })
    }

}



const updateBlogs = async function (req, res) {
    try {
        const titl = req.body.title
        const bod = req.body.body
        const tag = req.body.tags
        const subcat = req.body.subcategory
        const date = Date.now()

        const allBlogs = await BlogsModel.findOne({ $and: [{ _id: req.params.blogid }, { isDeleted: false }] })
        if (!allBlogs) return res.status(404).send({ status: false, msg: "No such id is present" })
        const updatedBlog = await BlogsModel.findByIdAndUpdate({ _id: req.params.blogid }, { $set: { title: titl, body: bod, tags: tag, subcategory: subcat, isPublished: true, publishedAt: date } }, { new: true })

        res.status(200).send({ status: true, msg: "updated Blog", data: updatedBlog })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message,
        })
    }
}

const deleteBlog = async function (req, res) {
    try {
        const date = Date.now()

        const allBlogs = await BlogsModel.findOne({ $and: [{ _id: req.params.blogid }, { isDeleted: false }] })
        if (!allBlogs) return res.status(404).send({ status: false, msg: "No such Document is present" })
        const deletedBlog = await BlogsModel.findByIdAndUpdate({ _id: req.params.blogid }, { $set: { isDeleted: true, deletedAt: date } }, { new: true })
        res.status(200).send({ status: true, msg: "Deleted Blog", data: deletedBlog })
    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message,
        })
    }
}

const deleteBlogsByparams = async function (req, res) {

    
    try {
        const cat = req.query.category
        const authid = req.query.authorId
        const tag = req.query.tags
        const subcat = req.query.subcategory
        const publish = req.query.isPublished
        const date = Date.now()
        const deletedBlog = await BlogsModel.findOneAndUpdate({ $or: [{ authorId: authid }, { category: cat }, { tags: tag }, { subcategory: subcat }, { isPublished: publish }] }, { $set: { isDeleted: true, deletedAt: date } }, { new: true })
        // console.log(deletedBlog)
        if (!deletedBlog) return res.status(404).send({ status: false, msg: "Please input Data in Params" })
        res.status(200).send({ status: true, msg: "Deleted Blog", data: deletedBlog })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message,
        })
    }

}



module.exports.createBlogs = createBlogs
module.exports.updateBlogs = updateBlogs
module.exports.findBlogs = findBlogs
module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogsByparams = deleteBlogsByparams

