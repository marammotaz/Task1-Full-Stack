const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WeatherSchema = new Schema({
    name: {
    type: String,
    required: true,
    },
    country: {
    type: String,
    required: true,
    },
    Temp: {
    type: String,
    required: true,
    },
    LocalTime: {
    type: String,
    required: true,
    },
    winddegree: {
    type: String,
    required: true,
    },
    cloud: {
    type: String,
    required: true,
    },

 }, { timestamps: true });

const WEATHER = mongoose.model('WEATHER', WeatherSchema);
module.exports = WEATHER;