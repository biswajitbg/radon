const express = require('express');
const myHelper = require('../util/helper')
const underscore = require('underscore')
const lodash = require('lodash');
const res = require('express/lib/response');
const { get } = require('lodash');

const router = express.Router();
// sabhia mam assignmets
// qs.1

router.get('/movies',function(req,res){
    
const moviesName = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins"]
    res.send({movies:moviesName})
 
})

router.get('/movies/:indexNumber',function(req,res){
    const moviesName = ["Rang de basanti", "The shining", "Lord of the rings", "Batman begins","pirates of the carribian","harry potter"]
    let y= req.params.indexNumber
    if(y> moviesName.length){
        res.send('use valid undex')

    }else{
        res.send({moviesName:"the movie is  "+ moviesName[y]})
    }
})
// qs.2

router.get('/films',function(req,res){
    const arrMovies = [{
        "id": 1,
        "name": "The Shining"
      }, {
        "id": 2,
        "name": "Incendies"
      }, {
        "id": 3,
        "name": "Rang de Basanti"
      }, {
        "id": 4,
        "name": "Finding Nemo"
      }]
      res.send({films:arrMovies})


})
//qs.3

router.get('/films/:filmId',function(req,res){
    const arrMovies = [{
        "id": 1,
        "name": "The Shining"
      }, {
        "id": 2,
        "name": "Incendies"
      }, {
        "id": 3,
        "name": "Rang de Basanti"
      }, {
        "id": 4,
        "name": "Finding Nemo"
      }]

    let x= req.params.filmId
    if(x>arrMovies.lenght){
        res.send("no movies exists with this Id")   
    }else{
        
        let y = JSON.stringify(arrMovies[x])
    let z = y.replace(/\\/g, 'br');
    res.send(z)
    }
})


module.exports = router;
// adding this comment for no reason