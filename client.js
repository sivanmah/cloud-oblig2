const mqtt = require('mqtt')
const host = 'assignment2-idg2001-group2.herokuapp.com'
/* const port = '1883' */
const clientId = `mqtt_${Math.random().toString(16).slice(3)}`

const connectUrl = `ws://${host}`
const client = mqtt.connect(connectUrl, {
    clientId,
    clean: true,
    connectTimeout: 4000,
    username: 'test',
    password: '123456',
    reconnectPeriod: 1000,
})

const topic = 'office'
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