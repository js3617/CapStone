const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OperatingHour = new Schema({
    dayOfWeek: {
        type: String,
        required: true
    },
    open: {
        type: String,
        required: true
    },
    close: {
        type: String,
        required: true
    }
});

const HospitalSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    type:{
        type: String,
        required:true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: String
    },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number] // [경도, 위도]
    },
    OperatingHours: [OperatingHour]
})


// 인덱스 설정: location 필드를 위한 2dsphere 인덱스
HospitalSchema.index({ location: '2dsphere' });

const Hospitals = mongoose.model('hospital', HospitalSchema);

module.exports = Hospitals