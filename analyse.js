//source: mongodb connection - exercise 7 (w10)
const { MongoClient } = require("mongodb")
const cbor = require('cbor-x')
var xmlify = require('xmlify')
const fs = require('fs')

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

        //speed of encoding data into cbor starts
        //console.log(Date.now())
        //cbor senml
        //let serialisedBuffer = cbor.encode(senMl_json)
        //fs.writeFileSync('cbor_senml.cbor', serialisedBuffer)
        //speed of encoding data into cbor end
        //console.log(Date.now())
        //console.log(serialisedBuffer.length)

        //Encoding json data to xml file - had to npm install "xmlify".
/*      console.log(Date.now())
        var xml = xmlify(senMl_json)
        fs.writeFileSync('sensor1.xml', xml)
        console.log(Date.now())
        console.log(xml.length) */


        //Encoding to json file
/*      let jsonData = JSON.stringify(senMl_json)
        console.log(Date.now())
        fs.writeFileSync("jsonData.json", jsonData)
        console.log(Date.now())
        console.log(jsonData.length) */ //calculates the size of the jsonData variable.

        });
    } catch (err) {
        console.log(err.stack)
    }
}
readDB();
