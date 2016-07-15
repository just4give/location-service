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

      City.find({countryCode:countryCode},{name:true},function(err, docs) {
        res.json(docs);
      });

});
router.get('/location',auth,function(req,res,next){
  var distance = 1000 / 6371;

  City.findOne({'loc': { $near: [
      req.query.lat,
      req.query.lang
    ],
    $maxDistance: distance }}, function(err,data){
        res.json(data);
  });
})

module.exports = router;
