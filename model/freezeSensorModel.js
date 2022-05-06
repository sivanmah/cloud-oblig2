const mongoose = require('mongoose')

const sensorSchema = new mongoose.Schema({
        sensorName: {
            type: String,
        },
        time: {
            type: Date,
        },
        measurement: 
            [{
            unit: String,
            value: Number
        }]
})

module.exports = mongoose.model('sensorData', sensorSchema);