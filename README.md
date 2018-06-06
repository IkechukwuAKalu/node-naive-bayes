# Node-Naive-Bayes

This is a Nodejs implementation of the Naive Bayes classifer. This is basically part of my final year project which also includes a real-time messaging app to show the classifier in action.

The algorithm used here is based on a book, "Programming Collective Intelligence" by Toby Segaran.

## Usage

```js
const NaiveBayes = require('node-naive-bayes');

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
    This function accepts two parameters; first is the `training text` and second is the `category`

    **Update:** You can now save training data to a file so that they can be easily reused later. You do this by passing `true` as the third parameter and then the `path` to the file as the fourth.
    ```js
    ...
    naiveBayes.trainInline('join bet to make excess cash in one day', 'bad', true, './my_file.txt');
    ...
    // next time just do like below, to reuse the training data
    naiveBayes.trainFromFile('./my_file.txt');
    ```
- **From files**

    This has the format of `text:::category` and are separated by new lines.

    Example is: `make quick money at the online casino:::bad`

    After which, you let the classifier know about the file like below
    ```js
    naiveBayes.trainFromFile('path_to_file');
    ```

## Contribution
Feel free to contact me or send PRs for improvements