// 필요한 라이브러리들
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

// 필요한 키들을 .env 파일에서 불러옴
const mongoURI = process.env.MONGO_URI;
const PORT = serverConfig.port;

const app = express();

// express.json()은 유저가 보낸 array/object 데이터
app.use(express.json());
/** React와 NodeJS를 연결하기 위한 연결점 
 *  React 연결 시 frontend Directory에서 npm run build 후 backend Directory로 넘어와 npm run start할 것.
*/
app.use(express.static(path.join(__dirname, '../../frontend/build')))
// cors는 다른 도메인 주소끼리 ajax 요청을 주고 받을 때 필요
app.use(cors());

// 라우터 사용 설정
app.use('/', mainRouter);
app.use('/pharmacy', pharmacyRouter);
app.use('/store', storeRouter);
app.use('/product', productRouter);

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message || '에러 발생');
})

mongoose.set('strictQuery', false);
// mongo db 연결 매개변수로 .env 파일에 있는 URI값을 할당
mongoose.connect(mongoURI)
    // 성공시
    .then(() => console.log('MongoDB connected'))
    // 실패시
    .catch(err => console.log(err))


// express App을 생성.
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));

// // Data 업로드를 위한 코드 240325 업로드 완.

// const pharmacy_data = JSON.parse(fs.readFileSync(`${__dirname}/data/pharmacy.json`, 'utf-8'));
// const store_data = JSON.parse(fs.readFileSync(`${__dirname}/data/store.json`, 'utf-8'));
// const product_data = JSON.parse(fs.readFileSync(`${__dirname}/data/product.json`, 'utf-8'));

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