const express = require('express');
const { createAuthor } = require('../controllers/newAuthorController');
const { createBook, getAllBook } = require('../controllers/newBookController');
const { createPublisher } = require('../controllers/newPublisherController');
const router = express.Router();



router.post('/create-author',createAuthor)



router.post('/create-publisher',createPublisher)



router.post('/create-book',createBook)
router.get('/get-all-book',getAllBook)


module.exports = router;