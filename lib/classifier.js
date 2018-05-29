module.exports = class Classifier {

    constructor(features, fileName = null) {
        this.featureCount = {}; // ex {'job': {'good': 8, 'bad': 2}}
        this.documentCount = {};
        this.features = features;
    }

    increaseFeatureCount(feature, category) {
        if (! this.featureCount[feature]) {
            this.featureCount[feature] = {};
        }
        if (! this.featureCount[feature][category]) {
            this.featureCount[feature][category] = 0;
        }
        this.featureCount[feature][category] += 1;
    }
};