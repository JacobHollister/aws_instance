const natural = require('natural');
const SpellCorrector = require('spelling-corrector');
const SW = require('stopword');
const aposToLexForm = require('apos-to-lex-form');

const spellCorrector = new SpellCorrector();
spellCorrector.loadDictionary();

const { WordTokenizer } = natural;
const tokenizer = new WordTokenizer();

const { SentimentAnalyzer, PorterStemmer } = natural;
const analyzer = new SentimentAnalyzer('English', PorterStemmer, 'afinn');

const analyzeSentiment = (text) => {
    const formattedText = aposToLexForm(text).toLowerCase().replace(/[^a-zA-Z\s]+/g, '')
    const tokenizedReview = tokenizer.tokenize(formattedText);
    
    tokenizedReview.forEach((word, index) => {
        tokenizedReview[index] = spellCorrector.correct(word);
    })
    
    const filteredReview = SW.removeStopwords(tokenizedReview);
    
    const analysis = analyzer.getSentiment(filteredReview);

    return analysis
} 

module.exports = {
    analyzeSentiment
}