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

//Topic
var topic = "test"
//message
//var message = "hello world"

//using math.random to generate data every time it loops through the code
// Function from: https://www.geeksforgeeks.org/how-to-generate-random-number-in-given-range-using-javascript/
function getRandomInt(min, max) { 
    return Math.round(Math.random() * (max - min) + min);
} 

//after the connection to the broker is created, the publisher is sending a message every 10sec - source: https://www.youtube.com/watch?v=-8NgIdT_OBc&ab_channel=LintangWisesa
client.on('connect', () => {
    setInterval(function() {
    //inspired by: https://localcoder.org/local-broker-mqtt-based-publish-subscribe-using-android-application
    //garbage data
    let message = {
            "sensorName": "sensor1",
            "sensorUnit1": "Cel",
            "tempValue": getRandomInt(19, 26), //random number between -10 and 40
            "sensorUnit2": "Percent",
            "humidityValue": getRandomInt(20, 60), //random percentage between 0 and 100
            "time": Date.now(),
    }
    message = JSON.stringify(message)
    client.publish(topic, message)
    console.log("message sent!", message)
    }, 10000) //prints this message with interval 10000ms (10sec.)

    setInterval(function() {
        //inspired by: https://localcoder.org/local-broker-mqtt-based-publish-subscribe-using-android-application
        //garbage data
        let message = {
                "sensorName": "sensor2",
                "sensorUnit1": "Cel",
                "tempValue": getRandomInt(19, 26), //random number between -10 and 40
                "sensorUnit2": "Percent",
                "humidityValue": getRandomInt(20, 60), //random percentage between 0 and 100
                "time": Date.now(),
        }
        message = JSON.stringify(message)
        client.publish(topic, message)
        console.log("message sent!", message)
        }, 10000) //prints this message with interval 10000ms (10sec.)
});


//another source: https://github.com/mqttjs/MQTT.js/issues/364


//other sources:
//normal humidity level: https://buythermopro.com/knowledge/ideal-temperature-and-humidity-for-office/
//normal temperature level: https://www.ohsrep.org.au/offices_temperature_and_humidity_-_what_are_the_rules