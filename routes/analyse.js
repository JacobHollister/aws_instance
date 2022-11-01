// Package Imports
const express = require('express')
const router = express.Router()

// Utility Imports
const { analyzeSentiment } = require('../util/sentiment')

router.route('/').post((req, res) => {
    const tweet = req.body
    const analysis = analyzeSentiment(tweet.data.text)
    //console.log(analysis)
    
    res.status(200).json({...tweet, sentiment: analysis})
})

module.exports = router
