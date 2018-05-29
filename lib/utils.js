module.exports.extractFeatures = (text = "") => {
    text = text.replace(/\W* /gi, ' ');
    text = text.split(' ');
    text = text.map((word) => word.toLowerCase());
    return new Set(text);
};