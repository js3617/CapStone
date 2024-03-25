const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    drugName: {
        type: String,
        required: true
    },
    drugCategory: {
        type: [String],
        required: true
    },
    drugDose: {
        type: String,
        required: true
    },
    drugCaution: {
        type: [String],
        require: true
    }
})

const Products = mongoose.model('Product', ProductSchema);

module.exports = Products