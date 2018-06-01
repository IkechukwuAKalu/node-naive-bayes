# Node-Naive-Bayes

This is a Nodejs implementation of the Naive Bayes classifer. This is basically part of my final year project which also includes a real-time messaging app to show the classifier in action.

The algorithm used here is based on a book, "Programming Collective Intelligence" by Toby Segaran.

## Usage

```js
const NaiveBayes = require('./index');

const naiveBayes = new NaiveBayes();

naiveBayes.trainInline('the quick rabbit jumps fences', 'good');

console.log('quick rabbit: ', naiveBayes.classify('quick rabbit', 'unknown'));
```

You can set thresholds for a category so that the classifier does not classify an item or document wrongly when it does not have enough information
```js
naiveBayes.setThreshold('bad', 3);
```

### Training methods
There are two methods of training the classifier;
- **Inline**
```js
naiveBayes.trainInline('make quick money at the online casino', 'bad');
```
- **From files**
```js
naiveBayes.trainFromFile('path_to_file');
```

## Contribution
Feel free to contact me or send PRs for improvements