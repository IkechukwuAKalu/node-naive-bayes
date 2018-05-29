const Classifier = require('../lib/classifier');
const {extractFeatures} = require('../lib/utils');
const {assert} = require('chai');

describe('/lib/classifier.js', () => {

    let classfier;

    beforeEach(() => {
        let text = 'hello man, there is a new job offer in the new hotel. in?';
        classfier = new Classifier(extractFeatures(text), null);
    });

    describe('#increaseFeatureCount', () => {
        it('increase the value of a feature', () => {
            classfier.increaseFeatureCount('job', 'good');
            classfier.increaseFeatureCount('job', 'bad');
            classfier.increaseFeatureCount('job', 'good');
            classfier.increaseFeatureCount('scam', 'bad');
            
            let featureCount = classfier.featureCount;
            assert.equal(featureCount.job.good, 2);
            assert.equal(featureCount.job.bad, 1);
            assert.equal(featureCount.scam.bad, 1);
        });
    });
});