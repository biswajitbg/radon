const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    body: {
        type: String,
        required: true
    },
    authorId: {
        type: ObjectId,
        ref: 'Author'
    },
    tags: {
        type: [String]

    },
    category: {
        type: String,
        required:true
    },
    subcategory: {
        type:[String]
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    publishedAt: {
        type:Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    deletedAt: {
        type:Date
    }
   
}, { timestamps: true });






module.exports = mongoose.model('dbblog', blogSchema)