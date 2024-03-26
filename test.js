const fs = require('fs');
const xlsx = require('xlsx');

// 读取指定表格的翻译映射
function readTranslationSheet(translationExcelPath, sheetName) {
    const workbook = xlsx.readFile(translationExcelPath);
    const worksheet = workbook.Sheets[sheetName];
    const translations = {};
    let consecutiveEmptyRows = 0;
    let rowIndex = 1;

    while (true) {
        const englishCell = worksheet[`A${rowIndex}`];
        const germanCell = worksheet[`B${rowIndex}`];

        if (!englishCell || !germanCell || !englishCell.v || !germanCell.v) {
            consecutiveEmptyRows++;
            if (consecutiveEmptyRows >= 5) break; // 连续5行为空时跳出循环
        } else {
            translations[englishCell.v.toLowerCase()] = germanCell.v;
            consecutiveEmptyRows = 0; // 重置计数器
        }

        rowIndex++;
    }
    console.log(translations);
    return translations;
}


// 翻译JSON文件
function translateJson(jsonFilePath, translations) {
    const data = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));

    // 递归翻译函数
    function translate(data) {
        if (typeof data === 'string') {
            // 将要翻译的英文单词转换为小写
            const lowerCaseWord = data.toLowerCase();
            // 如果单词在词库中，则直接返回原单词，不进行翻译
            if (wordLibrary.includes(lowerCaseWord)) {
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

// 将翻译后的JSON写回文件
function writeTranslatedJson(translatedJson, outputFilePath) {
    fs.writeFileSync(outputFilePath, JSON.stringify(translatedJson, null, 4), 'utf-8');
}

// 主函数
function main(jsonFilePath, translationExcelPath, sheetName, outputFilePath) {
    const translations = readTranslationSheet(translationExcelPath, sheetName);
    const translatedJson = translateJson(jsonFilePath, translations);
    writeTranslatedJson(translatedJson, outputFilePath);
}

// 运行主函数
const jsonFilePath = 'E:/练习/code/source/json/a.json';
const translationExcelPath = 'E:/练习/code/source/excel/ka.xlsx';
const sheetName = 'H12 PRO'; 
const outputFilePath = 'E:/练习/code/source/json/output.json';
const wordLibrary = ['Video', 'item', 'word3']; 
main(jsonFilePath, translationExcelPath, sheetName, outputFilePath);
