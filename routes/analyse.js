// Package Imports
const express = require('express')
const router = express.Router()

// Utility Imports
const { analyzeSentiment } = require('../util/sentiment')

// @desc    Returns analysed sentiment data for tweet
// @route   POST /api/v1/analyse
// @access  Public
router.route('/').post((req, res) => {
    const tweet = req.body
    
    const analysis = analyzeSentiment(tweet.data.text)
    
    res.status(200).json({...tweet, sentiment: analysis})
})

module.exports = router
