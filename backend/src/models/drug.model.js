const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DrugSchema = new Schema({
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
    },
    drugID: {
        type: String,
        required: true
    },
    drugImage: {
        type: String
    }
})

const Drugs = mongoose.model('drug', DrugSchema);

module.exports = Drugs