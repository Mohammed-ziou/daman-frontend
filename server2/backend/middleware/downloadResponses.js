const xlsx = require("xlsx");
const path = require("path");
const zip = require("express-zip");

const createExcelFromResArray = (responseArray, res) => {
  for (let i = 0; i < responseArray.length; i++) {
    const data = responseArray[i].questions;
    const workSheetName = responseArray[i].title;
    const filePath = `./downloads/${i}.xlsx`;

    const workBook = xlsx.utils.book_new();
    const workSheetData = data;
    const workSheet = xlsx.utils.json_to_sheet(workSheetData);
    xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
    xlsx.writeFile(workBook, path.resolve(filePath));
    // creates the excel files downloads them to the clients and deletes them from the server
  }
  console.log("hello");
  downloadResExcelArray(res, responseArray.length);
};

const downloadResExcelArray = (res, arraylenght) => {
  const resFolderArray = [];
  for (let i = 0; i < arraylenght; i++) {
    resFolderArray.push({ path: `./downloads/${i}.xlsx`, name: `${i}.xlsx` });
  }

  //   zip and download
  res.zip(resFolderArray);
  console.log(resFolderArray);
};

module.exports = { createExcelFromResArray };
