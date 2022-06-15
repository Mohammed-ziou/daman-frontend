const xlsx = require("xlsx");
const path = require("path");
const sendDocViaMail = require("./sendExcelToMail");
const { v4: uuidv4 } = require("uuid");

const exportResToExcel = (responseData) => {
  const data = responseData.questions;
  const workSheetName = responseData.title;
  const filePath = `./${responseData.title}.xlsx`;

  const workBook = xlsx.utils.book_new();
  const workSheetData = data;
  const workSheet = xlsx.utils.json_to_sheet(workSheetData);
  xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
  xlsx.writeFile(workBook, path.resolve(filePath));

  // send the file and the file path to mail sending function
  const fileName = `${uuidv4()}.xlsx`;
  sendDocViaMail("ziou", workSheetName, fileName, filePath);

  // return {
  //   sheetBuffer: xlsx.writeXLSX(
  //     workBook,
  //     { type: "file" },
  //     path.resolve(filePath)
  //   ),
  // };
};

module.exports = exportResToExcel;
