const express = require('express');
const router = express.Router();

const URL = require('../models/url');

router.get('/', async(req, res) => {
    const allUrl = await URL.find({});

    res.render('home', {
        urls: allUrl
    });
});

module.exports = router;