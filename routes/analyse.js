// Package Imports
const express = require('express')
const router = express.Router()

// Utility Imports
const { analyzeSentiment } = require('../util/sentiment')

// @desc    Returns analysed sentiment data for tweet
// @route   POST /api/v1/analyse
// @access  Public
router.route('/').post((req, res) => {
    try {
        const text = req.body.text
        console.log("text: ", text)
        
        const analysis = analyzeSentiment(text)
        
        res.status(200).json({sentiment: analysis})
    } catch (e) {
        console.log("error: ", e)
        res.status(500).json({message: "Could not analyse tweet"})
    }
})

module.exports = router
