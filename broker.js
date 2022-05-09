const aedes = require('aedes')()
const httpServer = require("http").createServer()
const ws = require("websocket-stream")
const port = process.env.PORT || 80
ws.createServer({ server: httpServer }, aedes.handle)
const SensorModel = require('./model/sensorModel')


httpServer.listen(port, function () {
    console.log('Aedes listening on port:', port)
    aedes.publish({ topic: 'office', payload: "I'm broker " + aedes.id })
   })

const mongoose = require('mongoose')
//connect to mongodb - source: https://www.youtube.com/watch?v=-8NgIdT_OBc&ab_channel=LintangWisesa
/* var mongo = require('mongodb')
var mongC = mongo.MongoClient */
var mongoURL = "mongodb+srv://navidiish:navidiish@assignment2.2nv9t.mongodb.net/assignment2?retryWrites=true&w=majority"



//client connected
aedes.on('client', function (client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m',
   'to broker', aedes.id)
   })

aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) +
   '\x1b[0m', 'to broker', aedes.id)
   })
   
//client subscribed to topic
aedes.on('subscribe', function (subscriptions, client) {
    console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
    '\x1b[0m subscribed to topics: ' + subscriptions.map(s => s.topic).join('\n'),
   'from broker', aedes.id)
   })

aedes.on('unsubscribe', function (subscriptions, client) {
    console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
    '\x1b[0m unsubscribed to topics: ' + subscriptions.join('\n'), 'from broker',
   aedes.id)
   })

//message published
aedes.on('publish', async function (packet, client) {
    console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)
    var message = packet.payload.toString()
    //transforming to object before sending to db
    var parseMessage = JSON.parse(message)
/*     if(message.slice(0,1) != "{" && message.slice(0,4) != "mqtt" ){ */
        mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true })
            const sensor = new SensorModel({
                sensorName: parseMessage.sensorName, 
                sensorUnit1: parseMessage.sensorUnit1,
                tempValue: parseMessage.tempValue,
                sensorUnit2: parseMessage.sensorUnit2,
                humidityValue: parseMessage.humidityValue,
                time: parseMessage.time,
        })
        await sensor.save()
/*     } ()=>{ */
        console.log("data saved to mongodb")
/*         client.close() */
/*     } */
/*             myCol.insertMany({
                message: {
                    name: String,
                    unit: String,
                    value: Number,
                    time: Date,
                }
            }, ()=>{
                console.log("data saved to mongodb, Navidiish")
                client.close()
            }) */

})

