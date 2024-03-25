const express = require('express');
const path = require('path');
const mainRouter = express.Router();

mainRouter.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
});

mainRouter.get('/pharmacy', (req, res) => {
    res.json({message: 'It is Pharmacy'});
})

mainRouter.get('/store', (req, res) => {
    res.json({message: 'It is Store'});
})

mainRouter.get('/product', (req, res) => {
    res.json({message: 'It is Product'});
})

module.exports = mainRouter;