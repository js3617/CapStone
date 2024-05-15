// 필요한 라이브러리들
const 
    express = require('express'),
    cors = require('cors'),
    { default: mongoose } = require('mongoose'),
    path = require('path'),
    config = require('config'),
    bodyParser = require('body-parser'),
    fs = require('fs-extra'),
    flash = require('connect-flash'),
    methodOverride = require('method-override'),
    serverConfig = config.get('server');
require('dotenv').config()

const
    mainRouter = require('./routers/main.router'),
    pharmacyRouter = require('./routers/pharmacy.router'),
    storeRouter = require('./routers/store.router'),
    drugRouter = require('./routers/drug.router');

// 필요한 키들을 .env 파일과 config 폴더의 파일에서 불러옴
const mongoURI = process.env.MONGO_URI;
const PORT = serverConfig.port;

const app = express();

// express.json()은 유저가 보낸 array/object 데이터
app.use(express.json());

// FrontEnd에서 값을 보내줄 때 body-parser를 사용하여 req.body로 값을 받아올 수 있음.
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'data/images')));
app.use(flash());
app.use(methodOverride('_method'));

/** React와 NodeJS를 연결하기 위한 연결점 
 *  React 연결 시 frontend Directory에서 npm run build 후 backend Directory로 넘어와 npm run dev할 것.
*/
app.use(express.static(path.join(__dirname, '../../frontend/build')))
// cors는 다른 도메인 주소끼리 ajax 요청을 주고 받을 때 필요
app.use(cors());

// app.use('/images', express.static(path.join(__dirname, 'data/images')));
// app.use(flash());
// app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

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