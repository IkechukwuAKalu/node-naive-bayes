const NaiveBayes = require('./index');

const naiveBayes = new NaiveBayes();

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

//naiveBayes.trainInline('join bet to make excess cash in one day', 'bad', true, './aa.txt');
naiveBayes.trainFromFile('./aa.txt');

// used to switch between both training modes easily by changing the function to call
function train() {
    trainFromFile();
}

// helper method to train from file
function trainFromFile() {
    naiveBayes.trainFromFile('./data.txt');
}

// helper method for training the classifier
function trainInline() {
    naiveBayes.trainInline('Nobody owns the water.', 'good');
    naiveBayes.trainInline('the quick rabbit jumps fences', 'good');
    naiveBayes.trainInline('buy pharmaceuticals now', 'bad');
    naiveBayes.trainInline('make quick money at the online casino', 'bad');
    naiveBayes.trainInline('the quick brown fox jumps', 'good');
}