const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const { userVerification } = require("../middleware/auth");

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", userVerification,  userController.getUserData)

router.put("/users/:userId", userVerification,  userController.updateUser)

router.delete("/users/:userId", userVerification, userController.deleteUser);

module.exports = router;