const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const path = require('path');
const fs = require('fs');
const config = require('config');
const serverConfig = config.get('server');
require('dotenv').config()

const mainRouter = require('./routers/main.router');
const pharmacyRouter = require('./routers/pharmacy.router');
const storeRouter = require('./routers/store.router');
const productRouter = require('./routers/product.router');

const mongoURI = process.env.MONGO_URI;
const PORT = serverConfig.port;

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../../frontend/build')))
app.use(cors());

app.use('/', mainRouter);
app.use('/pharmacy', pharmacyRouter);
app.use('/store', storeRouter);
app.use('/product', productRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || '에러 발생');
})

mongoose.set('strictQuery', false);
mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

    
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));


// const pharmacy_data = JSON.parse(fs.readFileSync('./data/pharmacy.json', 'utf-8'));
// const store_data = JSON.parse(fs.readFileSync('./data/store.json', 'utf-8'));
// const product_data = JSON.parse(fs.readFileSync('./data/product.json','utf-8'));

// Data 업로드를 위한 코드 240325 업로드 완.
// const importData = async () => {
//     try {
//         await Pharmacies.create(pharmacy_data)
//         await Stores.create(store_data)
//         await Products.create(product_data)
//         console.log('data successfully created')
//         process.exit()
//     } catch (error) {
//         console.log('error', error)
//     }
// }
// importData()