const express = require('express');
// const externalModule = require('./logger')
const extramodule = require('../logger/logger.js')
const helper = require('../util/helper.js')
const validator= require('../validator/formatter')


const router = express.Router();

router.get('/test-me', function (req, res) {
    extramodule.welcome();

    helper.date2();

    helper.month2();

    validator.trim2()
    validator.Lower()
    validator.upper()

    // module.log1()

    // console.log('The constant in logger route has a value '+externalModule.endpoint)
    // console.log('The current batch is '+externalModule.batch)
    // externalModule.log()
    // res.send('My first ever api!')

});

router.get('/test-me1', function (req, res) {
    res.send('this is my first assignment')
});

router.get('/test-me2', function (req, res) {
    res.send('My third api!')
});

router.get('/test-me3', function (req, res) {
    res.send('My 4th api!')
});

router.get('/test-me4', function (req, res) {
    res.send('My last api!')
});


module.exports = router;
// adding this comment for no reason