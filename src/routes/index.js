const express = require('express');
const router = express.Router();
const sqlPool = require('../database');

router.get('/', (req, res)=>{
    res.render('index');
});


module.exports = router;
