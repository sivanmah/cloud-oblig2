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
    {
        unit: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        }
    },
    {
        unit: {
            type: String,
            required: true,
        },
        value: {
            type: Number,
            required: true,
        }
    }
}
)

module.exports = mongoose.model('Freezer-sensor', sensorSchema);