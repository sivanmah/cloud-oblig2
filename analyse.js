//source: mongodb connection - exercise 7 (w10)
const { MongoClient } = require("mongodb");

const cbor = require('cbor-x')

//Source: Exercise 7, week 10 -  Data and open data
async function readDB() {
    try {
        const url = "mongodb+srv://navidiish:navidiish@assignment2.2nv9t.mongodb.net/assignment2?retryWrites=true&w=majority"
        const clientMongo = new MongoClient(url);
        await clientMongo.connect();
        console.log("Connected correctly to server");
        const ass2 = "assignment2"; 
        const db = clientMongo.db(ass2);
        const col = db.collection("sensordatas");
        const myDoc = await col.find({ sensorName: "sensor1" }).project({sensorName: 1, sensorUnit1: 1, tempValue: 1, sensorUnit2:1, humidityValue:1, time: 1}).toArray(function(err, result) {
        if (err) throw err
        //console.log(result);

        //exercise session 11
        const senMl_json =[];
        for(let i=0; i<result.length; i++){
            var empty_obj = {}
            if(i == 0){
                empty_obj.bn = "sensor1"
                empty_obj.bt = result[0]["time"]
                senMl_json.push(empty_obj)

                //Value1
                var empty_obj = {}
                empty_obj.u = "Cel"
                //transforming int from string to number
                empty_obj.v = parseFloat(result[i]["tempValue"])
                senMl_json.push(empty_obj)

                //Value2
                var empty_obj = {}
                empty_obj.u = "Percent"
                //transforming int from string to number
                empty_obj.v = parseFloat(result[i]["humidityValue"])
                senMl_json.push(empty_obj)
            } else {
                empty_obj.bt = result[i]["time"]
                senMl_json.push(empty_obj)

                //Value1
                var empty_obj = {}
                empty_obj.u = "Cel"
                empty_obj.v = parseFloat(result[i]["tempValue"])
                senMl_json.push(empty_obj)

                //Value2
                var empty_obj = {}
                empty_obj.u = "Percent"
                //transforming int from string to number
                empty_obj.v = parseFloat(result[i]["humidityValue"])
                senMl_json.push(empty_obj)
            }
        } 
        //speed of encoding data into senml json starts
        console.log(Date.now())
        console.log(senMl_json)
        //speed of encoding data into senml json end
        console.log(Date.now())


        //speed of encoding data into cbor starts
        //console.log(Date.now())
        //cbor senml
        let serialisedBuffer = cbor.encode(senMl_json)
        //console.log(serialisedBuffer) //gives us a buffer of binary data
        //speed of encoding data into cbor end
        //console.log(Date.now())

        });
    } catch (err) {
        console.log(err.stack);
    }
}
readDB();