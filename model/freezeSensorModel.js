const mongoose = require('mongoose')

const sensorSchema = new mongoose.Schema({
        sensorName: {
            type: String,
        },
        time: {
            type: Date,
        },
        unit: {
            type: String,
        },
        value: {
            type: Number,
        }
})

module.exports = mongoose.model('sensorData', sensorSchema);