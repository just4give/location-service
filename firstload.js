/**
 * Created by Mithun.Das on 7/14/2016.
 */
var mongoDb         = require('mongodb');
var mongoClient     = mongoDb.MongoClient;
var dbname          = 'geolocation';
var collectionName  = 'cities';
var url             = 'mongodb://localhost:27017/'+dbname;
var filename        = process.argv[2];
console.log('***************Process started');

mongoClient.connect(url,function(err,db){
    if(err){
        console.log('error on connection '+err);
    }
    else{
        console.log('***************Successfully connected to mongodb');
        var collection  = db.collection(collectionName);
        var fs          = require('fs');
        var readline    = require('readline');
        var stream      = require('stream');
        var instream    = fs.createReadStream(filename);
        var outstream   = new stream;
        var rl          = readline.createInterface(instream,outstream);

        console.log('***************Parsing, please wait ...');
            var counter=0;
        rl.on('line',function(line){
            try{
                var arr         = line.split('\t');
                var object   = {};
                counter++;
                //Parse them here
                //Example

                object['name'] = arr[1];
                object['asciiname'] = arr[2];
                object['loc'] = [Number(arr[4]),Number(arr[5])];

                object['countryCode'] = arr[8];
                object['population']=Number(arr[14]);

                console.log(counter,'Line', object);
                collection.insertOne(object);
            }
            catch (err){
                console.log(err);
            }
        });

        rl.on('close',function(){
            db.close();
            console.log('***************completed');
        });
    }
});