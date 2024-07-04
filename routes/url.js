const express = require('express');

const router = express.Router();

const { handleGenerateNewShortUrl, handleGetShortIdAnalyltics, handleGetRedirectUrl, handleGetShortIds } = require('../controllers/url');

router.get('/', handleGetShortIds);

router.post('/', handleGenerateNewShortUrl);

router.get('/:id', handleGetRedirectUrl)

router.get('/analytic/:id', handleGetShortIdAnalyltics)

module.exports = router;