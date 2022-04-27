//mqtt subscriber
const mqtt = require('mqtt')

const host = 'localhost'
const port = '1883'

//client ID that we are assigning:
const clientId = "Navid"
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

//getting the message from the publisher
client.on('message', (topic, message) => {
    message = message.toString()
    console.log(message)
    //client.end()
})

//Creating the connection by subscribing to the specific topic
client.on('connect', () => {
    client.subscribe(topic)
})

client.on('error', (error) => {
    console.log('Connection failed:', error)
})