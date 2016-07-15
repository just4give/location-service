/**
 * Created by Mithun.Das on 7/14/2016.
 */
console.log('load locations....');
var mongoose = require('mongoose');
var fs          = require('fs');
var readline    = require('readline');
var stream      = require('stream');
var City = require('./models/City');

var fileName = process.argv[2];

mongoose.connect('mongodb://localhost:27017/geolocation',function(err){
        if(err){

        }else{
            console.log('connected to mongo');
            var instream    = fs.createReadStream(fileName);
            var outstream   = new stream;
            var rl          = readline.createInterface(instream,outstream);

            console.log('***************Parsing, please wait ...');
            var counter=0;
            var cities=[];
            rl.on('line',function(line){
                try{
                    var arr         = line.split('\t');
                    var object   = {};
                    counter++;
                    //Parse them here
                    //Example
                    var cityModel     = new City();



                    cityModel.name = arr[1];
                    cityModel.asciiname = arr[2];
                    cityModel.loc = [arr[4],arr[5]];

                    cityModel.countryCode = arr[8];
                    cityModel.population=arr[14];

                    console.log(counter);
                    //cityModel.save();
                    cities.push(cityModel);
                }
                catch (err){
                    console.log(err);
                }
            });

            rl.on('close',function(){

                City.collection.insert(cities,function(err,docs){
                    if (err) {
                        console.log('error',err);
                    } else {
                        console.info('%d potatoes were successfully stored.', docs.length);
                    }


                })

            });
        }
});
/*

*/
