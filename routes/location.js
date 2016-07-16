var express = require('express');
var router = express.Router();
var City = require('../models/City');
var ApiKey = require('../models/ApiKey');

var auth = function(req, res,next){
  var apiKey =  req.query.apiKey;
  ApiKey.findOne({key:apiKey,active:true},function(err,key){

    if(err || !key){
      res.status(403);
      res.end();
    }else{
      next();
    }
  })

}
router.get('/city/:countryCode',auth, function(req, res, next) {

      var countryCode = req.params.countryCode.toUpperCase();

      City.find({countryCode:countryCode,population:{$gte:50000}},{asciiname:true,population:true},function(err, docs) {
        res.json(docs);
      });

});
router.get('/location',auth,function(req,res,next){
    //changes on 7/15 10PM EST
  var distance = 50000 / 6371;

  City.findOne({population:{$gte:50000},'loc': { $near: [
      req.query.lat,
      req.query.lang
    ],
    $maxDistance: distance }}, function(err,data){
        res.json(data);
  });
})

module.exports = router;
