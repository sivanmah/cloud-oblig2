//Our broker using aedes

//Implementing aedes library:
const aedes = require('aedes')()
//A server to run on where we are using the net package:
const server = require('net').createServer(aedes.handle)
const port = 1883


server.listen(port, function() {
    console.log("aedes is listening on port:" , port)
    aedes.publish({ topic: "freezer-sensor"})
})

aedes.on("ready", () => {
    console.log("ready to receive.")
})


//Connection to mongodb
const mongoose = require('mongoose')
const url = `mongodb+srv://navidiish:navidiish@assignment2.2nv9t.mongodb.net/assignment2?retryWrites=true&w=majority`
const FreezerSensorModel = require("./model/freezeSensorModel");
mongoose.connect(url, { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('connection to mongoDB established'))
.catch((err) => console.log(err));
//------------
 


//when a client connects to our broker
aedes.on('client', function (client) {
    console.log('Client Connected: \x1b[33m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
})




//When a client disconnects
aedes.on('clientDisconnect', function (client) {
    console.log('Client Disconnected: \x1b[31m' + (client ? client.id : client) + '\x1b[0m', 'to broker', aedes.id)
 })


 

//When a topic is subscribed to:
aedes.on('subscribe', function (subscriptions, client) {
    console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
    '\x1b[0m subscribed to topics: ' + subscriptions.map(s => s.topic).join('\n'),
    'from broker', aedes.id)
})


/* 
//When a topic is unsubscribed from:
aedes.on('unsubscribe', function (subscriptions, client) {
    console.log('MQTT client \x1b[32m' + (client ? client.id : client) +
    '\x1b[0m unsubscribed to topics: ' + subscriptions.join('\n'), 'from broker',
    aedes.id)
})

 */


//Then when a message is published to a topic, our broker is stating these:
aedes.on('publish', async function (packet) {


    console.log('Client \x1b[31m' + (client ? client.id : 'BROKER_' + aedes.id) + '\x1b[0m has published', packet.payload.toString(), 'on', packet.topic, 'to broker', aedes.id)
}) 



//Displaying monogodb data:
//FreezerSensorModel.find({}, function(err, data) { console.log(data.length); });

