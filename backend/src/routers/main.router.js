const express = require('express');
const path = require('path');
const mainRouter = express.Router();

// 메인 라우터에서 루트 페이지로 간다면 react 파일의 Index.html을 불러옴
mainRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
});

module.exports = mainRouter;