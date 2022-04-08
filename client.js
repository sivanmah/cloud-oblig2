const mqtt = require('mqtt')

const host = 'localhost'
const port = '1883'

//client ID that we are assigning:
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

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


//Subscribing to a topic
    //setting a variable called "topic" - it is the topic we want to send data to
    const topic = 'Aedes/hello'
    //methiod when client connects to a broker
    client.on('connect', () => {
        console.log('Connected')
        //method when client subscribes
        client.subscribe([topic], () => {
            console.log(`Subscribe to topic '${topic}'`)
        })
        //method for when client publishes to the broker
        client.publish(topic, 'nodejs mqtt test', { qos: 0, retain: false }, (error) => {
            if (error) {
            console.error(error)
            }
        })
    })
    //method when message is recieved from a topic
    client.on('message', (topic, payload) => {
        console.log('Received Message:', topic, payload.toString())
    })