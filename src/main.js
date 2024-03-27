const fs = require('fs');
const config = require('./config');
const readTranslation  = require('./api/readTranslation');
const translate  = require('./api/translate');




// 将翻译后的JSON写回文件
function writeTranslatedJson(translatedJson, outputFilePath) {
    fs.writeFileSync(outputFilePath, JSON.stringify(translatedJson, null, 4), 'utf-8');
}

// 主函数
function main(jsonFilePath, translationExcelPath, sheetName, outputFilePath) {
    const translations = readTranslation.readTranslationSheet(translationExcelPath, sheetName);
    const translatedJson = translate.translateJson(jsonFilePath, translations);
    writeTranslatedJson(translatedJson, outputFilePath);
}


main(config.jsonFilePath, config.translationExcelPath, config.sheetName, config.outputFilePath);
