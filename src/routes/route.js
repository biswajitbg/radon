const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')
const lodash = require('lodash')

const router = express.Router();

router.get('/test-me', function (req, res) {
    myHelper.printDate()
    myHelper.getCurrentMonth()
    myHelper.getCohortData()
    let firstElement = underscore.first(['Sabiha','Akash','Pritesh'])
    console.log('The first element received from underscope function is '+firstElement)
    res.send('My first ever api!')
});

router.get('/hello', function (req, res) {

  const monthsArray = lodash.chunk(["january","febraury","march","april","may","june","july","august","september","october","november","december"],4);
//   const chiki = lodash.chunk(months,4) 
  console.log(monthsArray)

  const oddNUmber=[1,3,5,7,9,11,13,15,17,19]
  const f = lodash.tail(oddNUmber)
  console.log(f)

  
  var array1 = [1,2,3]
  var array2 = [2,3,4]
  var array3 = [3,4,5]
  var array4 = [4,5,6]
  var array5 = [5,6,7]
  var array6 = [6,7,8]
  var array7 = [7,8,9]
  const b = lodash.union(array1,array2,array3,array4,array4,array5,array6,array7)
  console.log(b)

  const object = [["horror","The Shining"],["drama","Titanic"],["thriller","Shutter Island"],["fantasy","Pans Labyrinth"]]
  const d = lodash.fromPairs(object)
  console.log(d)
   
    res.send('Hello there!')
});

router.get('/candidates', function(req, res){
    console.log('Query paramters for this request are '+JSON.stringify(req.query))
    let gender = req.query.gender
    let state = req.query.state
    let district = req.query.district
    console.log('State is '+state)
    console.log('Gender is '+gender)
    console.log('District is '+district)
    let candidates = ['Akash','Suman']
    res.send(candidates)
})

router.get('/candidates/:canidatesName', function(req, res){
    console.log('The request objects is '+ JSON.stringify(req.params))
    console.log('Candidates name is '+req.params.canidatesName)
    res.send('Done')
})


module.exports = router;
// adding this comment for no reason