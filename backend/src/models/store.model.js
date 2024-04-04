const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StoreSchema = new Schema({
    storeAddr: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    },
    location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number] // [경도, 위도]
    }
})

StoreSchema.index({ location: '2dsphere'})

const Stores = mongoose.model('Store', StoreSchema);

module.exports = Stores