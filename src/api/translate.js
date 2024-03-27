const fs = require('fs');
const config = require('../config');
function translateJson(jsonFilePath, translations) {
    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    // 递归翻译函数
    function translate(data) {
        if (typeof data === 'string') {
            // 将要翻译的英文单词转换为小写
            const lowerCaseWord = data.toLowerCase();
            // 如果单词在词库中，则直接返回原单词，不进行翻译
            if (config.wordLibrary.includes(lowerCaseWord)) {
                return data;
            }
            // 如果是字符串，查找对应的翻译
            return translations[lowerCaseWord] || data;
        } else if (Array.isArray(data)) {
            // 如果是数组，递归处理每个元素
            return data.map(item => translate(item));
        } else if (typeof data === 'object' && data !== null) {
            // 如果是对象，递归处理每个属性的值
            const newData = {};
            for (const key in data) {
                newData[key] = translate(data[key]);
            }
            return newData;
        } else {
            // 其他类型直接返回
            return data;
        }
    }

    const translatedData = translate(data);

    return translatedData;
}


module.exports = { translateJson };
