// Package imports
const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
const aposToLexForm = require('apos-to-lex-form');

// Initiate Spelling Corrector
const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

// Initiate Word Tokenizer
const { WordTokenizer } = natural;
const tokenizer = new WordTokenizer();

// Setup sentiment analyzer
const { SentimentAnalyzer, PorterStemmer } = natural;
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

// Returns sentiment of a given string of text
const analyzeSentiment = (text) => {
    // Remove special characters
    const formattedText = aposToLexForm(text).toLowerCase().replace(/[^a-zA-Z\s]+/g, '')

    // Tokenize words
    const tokenizedText = tokenizer.tokenize(formattedText);
    
    // Correct Spelling of each word
    tokenizedText.forEach((word, index) => {
        tokenizedText[index] = spellCorrector.correct(word);
    })
    
    // Remove stop words
    const filteredText = SW.removeStopwords(tokenizedText);
    
    // Analyse sentiment of correct string
    const analysis = analyzer.getSentiment(filteredText);

    return analysis
} 

module.exports = {
    analyzeSentiment
}