const mqtt = require('mqtt')
const host = 'localhost'
const port = '1883'
const clientId = /* `mqtt_${Math.random().toString(16).slice(3)}` */ "Navid"

/* //source: mongodb connection - exercise 7 (w10)
const { MongoClient } = require("mongodb");
const host = 'assignment2-idg2001-group2.herokuapp.com'
const clientId = `mqtt_${Math.random().toString(16).slice(3)}` */

//Source: Exercise 7, week 10 -  Data and open data
/* async function readDB() {
    try {
        const url = "mongodb+srv://navidiish:navidiish@assignment2.2nv9t.mongodb.net/assignment2?retryWrites=true&w=majority"
        const clientMongo = new MongoClient(url);
        await clientMongo.connect();
        console.log("Connected correctly to server");
        const ass2 = "assignment2"; 
        const db = clientMongo.db(ass2);
        const col = db.collection("sensordatas");
        const myDoc = await col.find({ sensorName: "sensor1" }).project({sensorName: 1, sensorUnit: 1, tempValue: 1, time: 1}).toArray(function(err, result) {
        if (err) throw err;
        //console.log(result);

        //exercise session 11
        const senMl_json =[];
        for(let i=0; i<result.length; i++){
            var empty_obj = {}
            if(i == 0){
                empty_obj.bn = "sensor1"
                empty_obj.bt = result[0]["time"]
                senMl_json.push(empty_obj)

                var empty_obj = {}
                empty_obj.u = "Cel"
                //transforming int from string to number
                empty_obj.v = parseFloat(result[i]["tempValue"])
                senMl_json.push(empty_obj)
            } else {
                empty_obj.bt = result[0]["time"]
                senMl_json.push(empty_obj)

                var empty_obj = {}
                empty_obj.u = "Cel"
                empty_obj.v = parseFloat(result[i]["tempValue"])
                senMl_json.push(empty_obj)
            }
        } 
        //speed of encoding data into senml json starts
        console.log(Date.now())
        console.log(senMl_json);
        //speed of encoding data into senml json end
        console.log(Date.now())

        });
    } catch (err) {
        console.log(err.stack);
    }
}
readDB(); */


const connectUrl = `mqtt://${host}:${port}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'test',
    password: '123',
    reconnectPeriod: 1000,
})

const topic = 'test'
client.on('connect', () => {
    console.log('Connected')
    client.subscribe([topic], () => {
    console.log(`Subscribed to topic '${topic}'`)
    })
/* client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
 if (error) {
 console.error(error)
 }
 }) */
})
client.on('message', (topic, payload) => {
    console.log('Received Message:', topic, payload.toString())
})