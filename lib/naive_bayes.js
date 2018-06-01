/**
 * This class implements the Naive Bayes algorithm for classification
 */

const Classifier = require('./classifier');
const {extractFeatures} = require('./utils');

module.exports = class NaiveBayes extends Classifier {

    /**
     * @param {Function} ef - helper method to extract the words or features
     */
    constructor(ef = extractFeatures) {
        super(ef);
        this.thresholds = {}; // used to set the thresholds for categories
    }

    /**
     * Sets the threshold for a category
     * @param {String} category - the category to be affected
     * @param {Number} threshold - the threshold to use
     */
    setThreshold(category, threshold) {
        this.thresholds[category] = threshold;
    }

    /**
     * @param {String} category - the category for the threshold
     * @returns the threshold for the category
     */
    getThreshold(category) {
        return this.thresholds[category] ? this.thresholds[category] : 1.0;
    }

    /**
     * Calculates the probabilty of a document in a category
     * @param {String} doc - the document for the probability to be calculated
     * @param {String} category - the category of the document
     */
    calcDocumentProb(doc, category) {
        let features = this.extractFeatures(doc);
        let product = 1;
        features.forEach((feature) => product *= this.calcWeightedProb(feature, category));
        return product;
    }

    /**
     * Calculates the probability of a category
     * @param {String} doc - the document in the category
     * @param {String} category - the category of the document
     */
    calcCategoryProb(doc, category) {
        let categoryProb = this.getCategoryCount(category) / this.getTotalCategoryCount();
        let documentProb = this.calcDocumentProb(doc, category);
        return categoryProb * documentProb;
    }

    /**
     * This classifies a text or document into one of the categories returns the default value
     * @param {String} doc - the document to classify
     * @param {String} def - the default value to return
     * @returns the category or the default value
     */
    classify(doc, def = null) {
        let probabilities = {};
        let max = 0;
        let best;
        let categories = this.getCategories();
        // find category with highest probability
        categories.forEach((category) => {
            probabilities[category] = this.calcCategoryProb(doc, category);
            if (probabilities[category] > max) {
                max = probabilities[category];
                best = category;
            }
        });
        // ensure the probability exceeds the threshold * next best
        for (let category in probabilities) {
            if (category === best) continue;
            let prob = probabilities[category] * this.getThreshold(best);
            if (prob > probabilities[best]) return def;
        }
        return best;
    }
};