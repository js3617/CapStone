const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static("public_html"))
app.listen(port, function() {
    console.log(`listening on http://localhost:${port}`);
});

// http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire?serviceKey=Q0=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C&Q1=%EA%B0%95%EB%82%A8%EA%B5%AC&QT=1&QN=%EC%82%BC%EC%84%B1%EC%95%BD%EA%B5%AD&ORD=NAME&pageNo=1&numOfRows=10

app.get("/pharmacy_list", (req, res) => {
        let api = async() => {
            let response = null;
            try {
                response = await axios.get("http://apis.data.go.kr/B552657/ErmctInsttInfoInqireService/getParmacyListInfoInqire", {
                    params: {
                        "serviceKey": "ue27ha+kNp+7swLlOwIXRlvluavlSj673TPUUvLA7wlgUuIh8N9fYz1EnuaoMFfz7dRy5Z+ljAh9GstAaxds4w==",
                        "Q0": req.query.Q0, // 주소(시도)
                        "Q1": req.query.Q1, // 주소(시구군)
                        "QT": req.query.QT, // 월~일요일, 공휴일: 1~8
                        "QN": req.query.QN, // 기관명
                        "ORD": req.query.ORD, // 순서
                        "pageNo": req.query.pageNo, // 페이지 번호
                        "numOfRows": req.query.numOfRows // 목록 건수
                    }
                })
            } catch (e) {
                console.log(e);
            }
            return response; 
        }
        api().then((response) => {
            res.setHeader("Access-Control-Allow-Origin", "*");
            res.json(response.data.response.body);
        });
})