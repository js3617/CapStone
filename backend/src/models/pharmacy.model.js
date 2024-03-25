const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PharmacySchema = new Schema({
    dutyAddr: {
        type: String,
        required: true
    },
    dutyName: {
        type: String,
        required: true
    },
    dutyTel1: {
        type: String
    },
    wgs84Lat: {
        type: Number,
        required: true
    },
    wgs84Lon: {
        type: Number,
        required: true
    },
    dutyTime1c: {
        type: String
    },
    dutyTime1: {
        type: String
    },
    dutyTime2c: {
        type: String
    },
    dutyTime2s: {
        type: String
    },
    dutyTime3c: {
        type: String
    },
    dutyTime3s: {
        type: String
    },
    dutyTime4c: {
        type: String
    },
    dutyTime4s: {
        type: String
    },
    dutyTime5c: {
        type: String
    },
    dutyTime5s: {
        type: String
    },
    dutyTime6c: {
        type: String
    },
    dutyTime6s: {
        type: String
    },
    dutyTime7c: {
        type: String
    },
    dutyTime7s: {
        type: String
    },
    dutyTime8c: {
        type: String
    },
    dutyTime8s: {
        type: String
    },
})

const Pharmacies = mongoose.model('Pharmacy', PharmacySchema);

module.exports = Pharmacies