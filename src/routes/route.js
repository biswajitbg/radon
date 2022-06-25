const express = require('express');
const router = express.Router();
const AuthorController= require("../controllers/authorController")
const BlogsController=require("../controllers/blogsController")
const Middle=require("../middlewares/auth")





router.post("/authors",AuthorController.createAuthor)
router.post("/blogs", BlogsController.createBlogs)
router.post("/login",AuthorController.loginAuthor )
router.get("/blogs",Middle.authenticate,BlogsController.findBlogs)
router.put("/blogs/:blogid",Middle.authenticate, Middle.authorise, BlogsController.updateBlogs )
router.delete("/blogs/:blogid",Middle.authenticate, Middle.authorise,BlogsController.deleteBlog )
router.delete("/blogs",Middle.authenticate,BlogsController.deleteBlogsByparams )

// if api is invalid OR wrong URL
router.all("/**", function (req, res) {
    res.status(404).send({
        status: false,
        msg: "The api you request is not available"
    })
})



module.exports = router;




