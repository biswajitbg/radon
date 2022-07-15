const express = require('express');
const router = express.Router();
const college = require('../controller/collegeController')

router.post("/functionup/colleges",college.createCollege)
router.post("/functionup/interns",college.createIntern)
router.get("/functionup/collegeDetails",college.getCollegeDetails)
module.exports = router;