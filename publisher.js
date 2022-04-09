//mqtt publisher
const mqtt = require('mqtt')

const host = 'localhost'
const port = '1883'

//client ID that we are assigning:
const clientId = "Sivan"
//`mqtt_${Math.random().toString(16).slice(3)}`

//Connecting to our broker
const connectUrl = `mqtt://${host}:${port}`

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

//Freezer temperature should be somewhere between -15 to -20 celsious. Lower than that and you have a problem. Your food might go bad.
message = "Hello my Subscribers"

//after the connection to the broker is created, the publisher is sending a message every 1min
client.on('connect', () => {
    setInterval(() => {
        client.publish(topic, message)
        console.log("Message from the publisher: ", message)
    }, 1000)
})
