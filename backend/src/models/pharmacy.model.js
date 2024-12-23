const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OperatingHour = new Schema({
    dayOfWeek: {
        type: String,
        required: true
    },
    open: {
        type: Number,
        required: true
    },
    close: {
        type: Number,
        required: true
    }
});

const PharmacySchema = new Schema({
    dutyName: {
        type: String,
        required: true
    },
    dutyAddr: {
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
    OperatingHours: [OperatingHour]
})


// 인덱스 설정: location 필드를 위한 2dsphere 인덱스
PharmacySchema.index({ location: '2dsphere' });

const Pharmacy = mongoose.model('pharmacy', PharmacySchema);

module.exports = Pharmacy