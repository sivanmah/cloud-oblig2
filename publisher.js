//mqtt publisher
const mqtt = require('mqtt');

const host = 'localhost';
const port = '1883';

//client ID that we are assigning:
const clientId = "Sivan";
//`mqtt_${Math.random().toString(16).slice(3)}`

//Connecting to our broker
const connectUrl = `mqtt://${host}:${port}`;

//our mqtt client
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    //username and pass is needed if we want to secure our mqtt 
    username: 'test',
    password: '123',
    //reconnects every 1000ms to the broker
    reconnectPeriod: 1000,
})

topic = "freezer-sensor"


//Getting a random integer between two values
function temperatureValue(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.ceil(Math.random() * (max - min + 1) + min);
}
//source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random


//Freezer temperature should be somewhere between -15 to -20 celsious. Lower than that and you have a problem - your food might go bad. 
//Our max temperature here is 0
//Our min temperature here is -20
const garbageData = 
    {
        "bn": "Temperature Sensor",
        "bt": new Date().toString(),
        "u": "cel",
        "v": temperatureValue(-20, -15),
    };

// JSON.stringify() method converts a JavaScript object or value to a JSON string
const garbageDataToString = JSON.stringify(garbageData);
//Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify


//after the connection to the broker is created, the publisher is sending a message every 5sec
client.on('connect', () => {
    setInterval(() => {

        client.publish(topic, garbageDataToString);
        console.log("Message from the publisher: ", garbageDataToString);
    }, 5000);
    //publish every 60000 (1min.) instead of every 5000. We would like to see the random number every 1min.
});
