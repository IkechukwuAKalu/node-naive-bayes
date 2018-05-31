const NaiveBayes = require('./index');
const {extractFeatures} = require('./lib/utils');

const naiveBayes = new NaiveBayes(extractFeatures);

train();
console.log('training once...');
console.log('-----------------------------');
console.log('quick rabbit: ', naiveBayes.classify('quick rabbit', 'unknown'));
console.log('quick money: ', naiveBayes.classify('quick money', 'unknown'));
let t = 3;
naiveBayes.setThreshold('bad', t);
console.log('** setting threshold for "bad" to ', t);
console.log('-----------------------------');
console.log('quick money: ', naiveBayes.classify('quick money', 'unknown'));
console.log('training 10 more times... :-)');
console.log('-----------------------------');
for (let i = 0; i < 10; i++) {
    train();
}

console.log('quick money: ', naiveBayes.classify('quick money', 'unknown'));


function train() {
    naiveBayes.trainInline('Nobody owns the water.', 'good');
    naiveBayes.trainInline('the quick rabbit jumps fences', 'good');
    naiveBayes.trainInline('buy pharmaceuticals now', 'bad');
    naiveBayes.trainInline('make quick money at the online casino', 'bad');
    naiveBayes.trainInline('the quick brown fox jumps', 'good');
}