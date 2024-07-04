const shortId = require("shortid");
const URL = require('../models/url');

async function handleGenerateNewShortUrl(req, res) {
    const body = req.body;

    if (!body || !body.url) {
        return res.status(400).json({msg: 'Url required'});
    }

    const shortID = shortId();

    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: []
    });

    return res.status(200).json({ id: shortID});

}

async function handleGetShortIds(req, res) {
    const result = await URL.find();

    return res.status(200).json(result);
}

async function handleGetRedirectUrl(req, res) {
    if (!req.params.id) {
        return res.status(400).json({ error: 'short id required'});
    }

    const shortId = req.params.id;
    
    try {
        const entry = await URL.findOneAndUpdate(
            {
                shortId,
            },
            {
                $push: {
                    visitHistory: {
                        timestamp: Date.now()
                    }
                }
            });
        
        if (!entry) {
            return res.status(400).json({msg: 'Something went wrong'});
        }

        res.redirect(entry.redirectUrl);
        
    } catch (error) {
        return res.status(500).json(error);
    }

}

async function handleGetShortIdAnalyltics(req, res) {
    if (!req.params.id) {
        return res.status(400).json({ error: 'short id required'});
    }

    const shortId = req.params.id;
    const result = await URL.findOne({ shortId });

    return res.status(200).json({ 'Visitor count': result.visitHistory.length, 'Visitor History': result.visitHistory });
}

module.exports = {
    handleGenerateNewShortUrl,
    handleGetShortIds,
    handleGetRedirectUrl,
    handleGetShortIdAnalyltics
}