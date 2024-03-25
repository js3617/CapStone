const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const Pharmacies = require('./models/Pharmacy');
const Stores = require('./models/Store');
const Products = require('./models/Product');

dotenv.config({ path: 'backend/.env'})

const mongoURI = process.env.MONGO_URI

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
mongoose.set('strictQuery', false);

const pharmacy_data = JSON.parse(fs.readFileSync('./data/pharmacy.json', 'utf-8'));
const store_data = JSON.parse(fs.readFileSync('./data/store.json', 'utf-8'));
const product_data = JSON.parse(fs.readFileSync('./data/product.json','utf-8'));

const importData = async () => {
    try {
        await Pharmacies.create(pharmacy_data)
        await Stores.create(store_data)
        await Products.create(product_data)
        console.log('data successfully created')
        process.exit()
    } catch (error) {
        console.log('error', error)
    }
}

// importData()

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));