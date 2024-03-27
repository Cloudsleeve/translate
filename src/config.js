module.exports = {
  jsonFilePath: "E:/练习/translate/source/json/a.json", // 输入json文件路径
  translationExcelPath: "E:/练习/translate/source/excel/tr.xlsx", // 输入翻译excel文件路径
  sheetName: "Hair Gleam", // 输入excel文件sheet名称
  outputFilePath: "E:/练习/translate/source/json/output.json", // 输出json文件路径
  wordLibrary: [
    "video",
    "item",
    "text",
    "subtext",
    "title",
    "subtitle",
    "url",
    "media",
    "radio",
    "small",
    "true",
    "false",
    "left",
    "right",
    "top",
    "bottom",
    "center",
    "block",
    "image",
  ],  //忽略词库
  originalCol: "A", //原文列索引
  translationCol: "C", //翻译列索引
  emptyLineNum: 10 ,  //空行数
  changeLine: false   //是否处理表格换行文案
};
