const BlogsModel = require("../models/blogsModel")

const deleteBlog = async function (req, res) {
    try {
        const date = Date.now()

        const allBlogs = await BlogsModel.findOne({ $and: [{ _id: req.params.blogid }, { isDeleted: false }] })
        if (!allBlogs) return res.status(404).send({ status: false, msg: "No such id is present" })
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
        //console.log(deletedBlog)
        if (!deletedBlog) return res.status(404).send({ status: false, msg: "Please input Data in Params" })
        res.status(200).send({ status: true, msg: "Deleted Blog", data: deletedBlog })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message,
        })
    }

}


module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogsByparams = deleteBlogsByparams