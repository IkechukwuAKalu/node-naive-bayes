const NaiveBayes = require('../lib/naive_bayes');
const {assert} = require('chai');

describe('/lib/naive_bayes.js', () => {

    let naiveBayes;

    beforeEach(() => {
        naiveBayes = new NaiveBayes();
    });

    afterEach(() => {
        naiveBayes = null;
    });

    describe('#classify()', () => {
        it('should correctly return the class for a text when able to classify', () => {
            naiveBayes.trainInline('make quick money at the online casino', 'bad');
            naiveBayes.trainInline('the quick brown fox jumps', 'good');

            naiveBayes.setThreshold('bad', 3);

            assert.equal(naiveBayes.classify('quick money', 'unknown'), 'bad');
        });

        it('should return a neutral class for a text when unable to classify', () => {
          naiveBayes.trainInline('make quick money at the online casino', 'bad');
          naiveBayes.trainInline('the quick brown fox jumps', 'good');

          naiveBayes.setThreshold('bad', 3);

          assert.equal(naiveBayes.classify('this is some random text', 'unknown'), 'unknown');
      });
    });
});