/**
 * Created by Mithun.Das on 7/14/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var citySchema = new Schema({
    name: String,
    asciiname:String,
    countryCode:String,
    population:Number,
    loc: {
        type: [Number],  // [<longitude>, <latitude>]
        index: '2d'      // create the geospatial index
    }
});

// the schema is useless so far
// we need to create a model using it
var City = mongoose.model('City', citySchema);

// make this available to our users in our Node applications
module.exports = City;