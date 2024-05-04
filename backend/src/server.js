// 필요한 라이브러리들
const 
    express = require('express'),
    cors = require('cors'),
    { default: mongoose } = require('mongoose'),
    path = require('path'),
    fs = require('fs'),
    config = require('config'),
    bodyParser = require('body-parser'),
    serverConfig = config.get('server');
require('dotenv').config()

const mainRouter = require('./routers/main.router');
const pharmacyRouter = require('./routers/pharmacy.router');
const storeRouter = require('./routers/store.router');
const drugRouter = require('./routers/drug.router');

// 필요한 키들을 .env 파일과 config 폴더의 파일에서 불러옴
const mongoURI = process.env.MONGO_URI;
const PORT = serverConfig.port;

const app = express();

// express.json()은 유저가 보낸 array/object 데이터
app.use(express.json());

// FrontEnd에서 값을 보내줄 때 body-parser를 사용하여 req.body로 값을 받아올 수 있음.
app.use(bodyParser.json());

/** React와 NodeJS를 연결하기 위한 연결점 
 *  React 연결 시 frontend Directory에서 npm run build 후 backend Directory로 넘어와 npm run start할 것.
*/
// app.use(express.static(path.join(__dirname, '../../frontend/build')))
// cors는 다른 도메인 주소끼리 ajax 요청을 주고 받을 때 필요
app.use(cors());

// 라우터 사용 설정
app.use('/', mainRouter);
app.use('/pharmacy', pharmacyRouter);
app.use('/store', storeRouter);
app.use('/drug', drugRouter);

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


// const Pharmacies = require('./models/pharmacy.model');
// const Drugs = require('./models/drug.model');
// const Stores = require('./models/store.model');

// Data 업로드를 위한 코드 240325 업로드 완.

// const pharmacy_data = JSON.parse(fs.readFileSync(`${__dirname}/data/pharmacy.json`, 'utf-8'));
// const drug_data = JSON.parse(fs.readFileSync(`${__dirname}/data/drug.json`, 'utf-8'));
// const store_data = JSON.parse(fs.readFileSync(`${__dirname}/data/store.json`, 'utf-8'));
// const store_detail_data = JSON.parse(fs.readFileSync(`${__dirname}/data/store_detail.json`, 'utf-8'));

// const importData = async () => {
//     try {
//         const processedStoreData = store_data.map(store => {
//             return {
//                 storeAddr: store.storeAddr,
//                 storeName: store.storeName,
//                 storeId: detail.storeId,
//                 location: {
//                     type: 'Point',
//                     coordinates: [parseFloat(store.storeLon), parseFloat(store.storeLat)]
//                 }
//             }
//         })

//         await Stores.create(processedStoreData)
//         // await Drugs.create(drug_data)
//         console.log('data successfully created')
//         process.exit()
//     } catch (error) {
//         console.log('error', error)
//     }
// }

// // 24.03.30 약국에 대한 정보 업로드 완
// const importPharmacyData = async () => {
//     try {
//         // 약국 데이터 처리 및 저장
//         const processedPharmacyData = pharmacy_data.map(pharmacy => {
//             const openingHours = [];
//             for (let i = 1; i <= 8; i++) {
//                 const openingKey = `dutyTime${i}s`;
//                 const closingKey = `dutyTime${i}c`;

//                 if (pharmacy.hasOwnProperty(openingKey) && pharmacy.hasOwnProperty(closingKey)) {
//                     let dayOfWeek;
//                     switch (i) {
//                         case 1:
//                             dayOfWeek = '월'
//                             break;
//                         case 2:
//                             dayOfWeek = '화'
//                             break;
//                         case 3:
//                             dayOfWeek = '수'
//                             break;
//                         case 4:
//                             dayOfWeek = '목'
//                             break;
//                         case 5:
//                             dayOfWeek = '금'
//                             break;
//                         case 6:
//                             dayOfWeek = '토'
//                             break;
//                         case 7:
//                             dayOfWeek = '일'
//                             break;
//                         case 8:
//                             dayOfWeek = '공휴일'
//                             break;
//                     }
//                     const openingTime = parseInt(pharmacy[openingKey]);
//                     const closingTime = parseInt(pharmacy[closingKey]);

//                     openingHours.push({ dayOfWeek, openingTime, closingTime });
//                 } 
//             }
//             return { 
//                 dutyAddr: pharmacy.dutyAddr,
//                 dutyName: pharmacy.dutyName,
//                 dutyTel1: pharmacy.dutyTel1,
//                 openingHours,
//                 location: {
//                     type: 'Point',
//                     coordinates: [parseFloat(pharmacy.wgs84Lon), parseFloat(pharmacy.wgs84Lat)]
//                 }
//              };
//         });
//         await Pharmacies.create(processedPharmacyData);
//         // await Drugs.create(drug_data)

//         console.log('Data successfully created');
//         process.exit();
//     } catch (error) {
//         console.error('Error importing data:', error);
//         process.exit(1); // 실패 시 프로세스 종료 코드 1로 설정
//     }
// };

// importData();
// importPharmacyData();