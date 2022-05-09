const express = require('express');
const router = express.Router();
const SensorModel = require('./model/sensorModel')

router.get('/latest', 
    async (req, res) => {
        try {
            const showData = await SensorModel.find({}).sort({_id: -1}).limit(1);
            res.json(showData)
        }catch(err){
           res.status(400).json({ message: err })    
        }
    }
)

router.get('/all',
    async (req, res) => {
        try {
            const showData = await SensorModel.find({});
            res.json(showData)
        }catch(err){
              res.status(400).json({ message: err })
        }
    }  
)

router.get('/minandmax',
    async (req, res) => {
        try {
            const minTemp = await SensorModel.find({}).sort({tempValue: 1}).limit(1);
            const maxTemp = await SensorModel.find({}).sort({tempValue: -1}).limit(1);
            const minHumidity = await SensorModel.find({}).sort({humidityValue: 1}).limit(1);
            const maxHumidity = await SensorModel.find({}).sort({humidityValue: -1}).limit(1);
            res.json({minTemp, maxTemp, minHumidity, maxHumidity})
            }catch(err){
                res.status(400).json({ message: err })
            }
    }
)

module.exports = router;