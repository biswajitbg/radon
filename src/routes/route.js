const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})


router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
router.get("/cowin/getByPin", CowinController.getByPin)

router.post("/cowin/getOtp", CowinController.getOtp)
router.get("/cowin/getByDistrictsId", CowinController.getByDistrictsId)
router.get("/weather/getWeather", CowinController.getWeather)
router.get("/weather/getSortedCities", CowinController.getSortedCities)
router.get("/Meme/getAllMemes", CowinController.getAllMemes)
router.post("/Meme/createMeme", CowinController.createMeme)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;