/**
 * The base classifier class
 */

module.exports = class Classifier {

    /**
     * @param {Function} extractFeatures - helper method to extract words
     */
    constructor(extractFeatures) {
        this.featureCounts = {}; // ex {'job': {'good': 8, 'bad': 2}}
        this.categoryCounts = {}; // ex {'spam': 2, 'ham': 6}
        this.extractFeatures = extractFeatures;
    }

    /**
     * This increases the count of a feature in a category
     * @param {String} feature - the word
     * @param {String} category - the category of the feature
     */
    increaseFeatureCounts(feature, category) {
        if (! this.featureCounts[feature]) this.featureCounts[feature] = {};
        if (! this.featureCounts[feature][category]) this.featureCounts[feature][category] = 0;
        this.featureCounts[feature][category] += 1;
    }

    /**
     * This increases the count of category
     * @param {String} category - the category in the classifier
     */
    increaseCategoryCounts(category) {
        if (! this.categoryCounts[category]) this.categoryCounts[category] = 0;
        this.categoryCounts[category] += 1;
    }

    /**
     * @param {String} feature - the word or feature
     * @param {String} category - the category of the feature
     * @returns the number of times the feature appeared or 0 if none
     */
    getFeatureCount(feature, category) {
        if (this.featureCounts[feature] && this.featureCounts[feature][category]) {
            return parseFloat(this.featureCounts[feature][category]).toFixed(2);
        }
        return parseFloat('0').toFixed(2);
    }

    /**
     * @param {String} category 
     * @returns the number of times a category appears or 0 if none
     */
    getCategoryCount(category) {
        if (this.categoryCounts[category]) {
            return parseFloat(this.categoryCounts[category]).toFixed(2);
        }
        return parseFloat('0').toFixed(2);
    }

    /**
     * @returns the total number of categories
     */
    getTotalCategoryCount() {
        let values = Object.values(this.categoryCounts);
        let total = 0;
        values.forEach((v) => total += v);
        return total;
    }

    /**
     * @returns the categories present
     */
    getCategories() {
        return Object.keys(this.categoryCounts);
    }

    /**
     * @private
     * Calculates the probabilty that a feature appears in a document category
     * @param {String} feature - the feature or word
     * @param {String} category - the category
     * @returns the probabilty of appearance
     */
    calcFeatureProb(feature, category) {
        let categoryCount = this.getCategoryCount(category);
        if (categoryCount == 0.00) return 0;
        return this.getFeatureCount(feature, category) / categoryCount;
    }

    /**
     * This assumes an initial probabilty to prevent features being classified
     * wrongly due to lack of adequate training data
     * @param {String} feature - the feature/word
     * @param {String} category - the feature category
     * @param {Number} weight - the assumed weight
     * @param {Number} ap - the assumed probabilty
     * @returns the weighted probabilty
     */
    calcWeightedProb(feature, category, weight = 1.0, ap = 0.5) {
        let probabilty = this.calcFeatureProb(feature, category);
        let categories = this.getCategories();
        let total = 0;
        categories.forEach((cat) => total += Number(this.getFeatureCount(feature, cat)));
        return ((weight * ap) + (total * probabilty)) / (weight + total);
    }

    /**
     * Trains the classifier with text supplied inline
     * @param {String} text - the text to train the classifier with
     * @param {String} category - the category of the text
     */
    trainInline(text, category) {
        let features = this.extractFeatures(text);
        features.forEach((f) => this.increaseFeatureCounts(f, category));
        this.increaseCategoryCounts(category);
    }

    trainFromFile() {

    }
};