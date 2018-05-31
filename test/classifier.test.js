const Classifier = require('../lib/classifier');
const {extractFeatures} = require('../lib/utils');
const {assert} = require('chai');

describe('/lib/classifier.js', () => {

    let classifier;

    beforeEach(() => {
        let text = 'hello man, there is a new job offer in the new hotel. in?';
        classifier = new Classifier(extractFeatures(text), null);
    });

    describe('#increaseFeatureCount()', () => {
        it('increase the value of a feature', () => {
            classifier.increaseFeatureCounts('job', 'good');
            classifier.increaseFeatureCounts('job', 'bad');
            classifier.increaseFeatureCounts('job', 'good');
            classifier.increaseFeatureCounts('offer', 'bad');
            
            let featureCount = classifier.featureCounts;
            assert.equal(featureCount.job.good, 2);
            assert.equal(featureCount.job.bad, 1);
            assert.equal(featureCount.offer.bad, 1);
        });
    });

    describe('#increaseCategoryCount()', () => {
        it('should increase the count of a cateogry', () => {
            classifier.increaseCategoryCounts('spam');
            classifier.increaseCategoryCounts('spam');
            classifier.increaseCategoryCounts('ham');

            let cateogryCount = classifier.categoryCounts;
            assert.equal(cateogryCount.spam, 2);
            assert.equal(cateogryCount.ham, 1);
        });
    });

    describe('#getFeatureCount()', () => {
        it('should return the count of a feature in a category', () => {
            classifier.increaseFeatureCounts('job', 'good');
            classifier.increaseFeatureCounts('job', 'bad');
            classifier.increaseFeatureCounts('job', 'good');
            classifier.increaseFeatureCounts('offer', 'bad');

            let fc1 = classifier.getFeatureCount('job', 'good');
            let fc2 = classifier.getFeatureCount('offer', 'bad');
            assert.equal(fc1, 2.00);
            assert.equal(fc2, 1.00);
        });

        it('should return 0.00 for a value not in the object', () => {
            let fc1 = classifier.getFeatureCount('job', 'good');
            assert.equal(fc1, 0.00);
        });
    });

    describe('#getCategoryCount()', () => {
        it('should return the count of a category', () => {
            classifier.increaseCategoryCounts('spam');
            classifier.increaseCategoryCounts('spam');
            classifier.increaseCategoryCounts('ham');

            let cc1 = classifier.getCategoryCount('spam');
            let cc2 = classifier.getCategoryCount('ham');
            assert.equal(cc1, 2.00);
            assert.equal(cc2, 1.00);
        });

        it('should return 0.00 for category not in the object', () => {
            let cc1 = classifier.getCategoryCount('spam');
            assert.equal(cc1, 0.00);
        });
    });

    describe('#getTotalCategoryCount()', () => {
        it('should return the sum of all category values', () => {
            classifier.increaseCategoryCounts('spam');
            classifier.increaseCategoryCounts('spam');
            classifier.increaseCategoryCounts('ham');

            let total = classifier.getTotalCategoryCount();
            assert.equal(total, 3);
        });
    });

    describe('#getCategories()', () => {
        it('should return all the categories', () => {
            classifier.increaseCategoryCounts('spam');
            classifier.increaseCategoryCounts('spam');
            classifier.increaseCategoryCounts('ham');

            let categories = classifier.getCategories();
            assert.isArray(categories);
            assert.equal(categories.length, 2);
            assert.include(categories, 'spam');
            assert.include(categories, 'ham');
        });
    });
});