module.exports.extractFeatures = (text = "") => {
    text = text.toLocaleLowerCase();
    text = text.replace(/\W* /gi, ' ');
    text = text.split(' ');
    return new Set(text);
};