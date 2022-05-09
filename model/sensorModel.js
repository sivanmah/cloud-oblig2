const mongoose = require('mongoose')

const sensorSchema = new mongoose.Schema({
    sensorName: {
        type: String,
    },
    sensorUnit1: {
        type: String,
    },
    tempValue: {
        type: Number,
    },
    sensorUnit2: {
        type: String,
    },
    humidityValue: {
        type: Number,
    },
    time: {
        type: Date,
    }
})

module.exports = mongoose.model('sensorData', sensorSchema);