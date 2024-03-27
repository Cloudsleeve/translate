const xlsx = require("xlsx");
const config = require("../config");
// 读取指定表格的翻译映射
function readTranslationSheet(translationExcelPath, sheetName) {
  const workbook = xlsx.readFile(translationExcelPath);
  const worksheet = workbook.Sheets[sheetName];
  const translations = {};
  let consecutiveEmptyRows = 0;
  let rowIndex = 1;

  while (true) {
    const englishCell = worksheet[`${config.originalCol}${rowIndex}`];
    const germanCell = worksheet[`${config.translationCol}${rowIndex}`];

    if (!englishCell || !germanCell || !englishCell.v || !germanCell.v) {
      consecutiveEmptyRows++;
      if (consecutiveEmptyRows >= config.emptyLineNum) break;
    } else {
      if (config.changeLine) {
        // 处理换行
        const englishWords = englishCell.v.split(/\r?\n/);
        const germanWords = germanCell.v.split(/\r?\n/);
        englishWords.forEach((word, index) => {
          translations[word.toLowerCase()] = germanWords[index] || ""; 
        });
        consecutiveEmptyRows = 0; 
      } else {
        translations[englishCell.v.toLowerCase()] = germanCell.v;
        consecutiveEmptyRows = 0;
      }
    }
    rowIndex++;
  }
  console.log(translations);
  return translations;
}

module.exports = { readTranslationSheet };
