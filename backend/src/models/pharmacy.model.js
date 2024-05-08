const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OpeningHoursSchema = new Schema({
    dayOfWeek: {
        type: String,
        required: true
    },
    openingTime: {
        type: Number,
        required: true
    },
    closingTime: {
        type: Number,
        required: true
    }
});

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
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number] // [경도, 위도]
    },
    openingHours: [OpeningHoursSchema]
})

// 인덱스 설정: location 필드를 위한 2dsphere 인덱스
PharmacySchema.index({ location: '2dsphere' });

const Pharmacies = mongoose.model('Pharmacy', PharmacySchema);

module.exports = Pharmacies