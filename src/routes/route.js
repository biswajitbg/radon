const express = require('express');
const router = express.Router();
const Bookmodel = require("../models/bookModel.js")
const BookController= require("../controllers/bookController.js")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/NewBooks", BookController.newBooks  )

router.get("/allBooks",BookController.newBookList )

module.exports = router;