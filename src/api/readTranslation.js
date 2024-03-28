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
    const originalCell = worksheet[`${config.originalCol}${rowIndex}`];
    const translationCell = worksheet[`${config.translationCol}${rowIndex}`];

    if (!originalCell || !translationCell || !originalCell.v || !translationCell.v) {
      consecutiveEmptyRows++;
      if (consecutiveEmptyRows >= config.emptyLineNum) break;
    } else {
      if (config.changeLine) {
        // 处理换行
        const originalWords = originalCell.v.split(/\r?\n/);
        const translationWords = translationCell.v.split(/\r?\n/);
        originalWords.forEach((word, index) => {
          translations[word.toLowerCase()] = translationWords[index] || ""; 
        });
        consecutiveEmptyRows = 0; 
      } else {
        translations[originalCell.v.toLowerCase()] = translationCell.v;
        consecutiveEmptyRows = 0;
      }
    }
    rowIndex++;
  }

  return translations;
}

module.exports = { readTranslationSheet };
