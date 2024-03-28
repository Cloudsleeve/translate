const fs = require('fs');
const config = require('../config');
function translateJson(jsonFilePath, translations) {
    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    function translate(data) {
        if (typeof data === 'string') {
            const lowerCaseWord = data.toLowerCase();
            if (config.wordLibrary.includes(lowerCaseWord)) {
                return data;
            }
            for (const englishWord in translations) {
                if (data.includes(englishWord)) {
                    data = data.replace(new RegExp(englishWord, 'g'), translations[englishWord]);
                }
            }
            return data;
        } else if (Array.isArray(data)) {
            return data.map(item => translate(item));
        } else if (typeof data === 'object' && data !== null) {
            const newData = {};
            for (const key in data) {
                newData[key] = translate(data[key]);
            }
            return newData;
        } else {
            return data;
        }
    }
    const translatedData = translate(data);
    return translatedData;
}


module.exports = { translateJson };
