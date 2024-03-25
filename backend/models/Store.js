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
    storeLat: {
        type: Number,
        required: true
    },
    storeLon: {
        type: Number,
        required: true
    }
})

const Stores = mongoose.model('Store', StoreSchema);

module.exports = Stores