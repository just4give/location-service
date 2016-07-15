/**
 * Created by Mithun.Das on 7/14/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var apiKey = new Schema({
    key: String,
    active: Boolean
});

// the schema is useless so far
// we need to create a model using it
var ApiKey = mongoose.model('ApiKey', apiKey);

// make this available to our users in our Node applications
module.exports = ApiKey;