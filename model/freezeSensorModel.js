const mongoose = require('mongoose')

const sensorSchema = new mongoose.Schema({
    bn: {
        type: String,
        required: true,
    },
    bt: {
        type: Date,
        required: true,
    },
    u: {
        type: String,
        required: true,
    },
    v: {
        type: Number,
        required: true,
    }
}
)

module.exports = mongoose.model('FreezerSensor', sensorSchema);