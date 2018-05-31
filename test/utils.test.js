const utils = require('../lib/utils');
const {assert} = require('chai');

describe('/lib/utils.js', () => {

    describe('#extractFeatures()', () => {
        it('should extract the unique words from a text', () => {
            let features = utils.extractFeatures("Hello you- man. how are you >? # Man");
            assert.typeOf(features, 'Set');
            assert.equal(features.size, 5);
        });

        it('should not contain special characters', () => {
            let features = utils.extractFeatures("Hello you- man. how+ are you >? # Man doing?");
            assert.typeOf(features, 'Set');
            assert.equal(features.size, 6);
            assert.notInclude(features, '?');
        });
    });
});