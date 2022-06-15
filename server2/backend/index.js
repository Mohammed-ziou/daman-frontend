// const xlsx = require("xlsx");
// const path = require("path");
// const fs = require("fs");
// const dotenv = require("dotenv").config();
// const sendDocViaMail = require("./middleware/sendExcelToMail");

// // response data
// const responseData = {
//   id: 1239459,
//   title: "zio42",
//   description: "String",
//   questions: [
//     {
//       question: "String",
//       option: "yo",
//     },
//     {
//       question: "momo",
//       option: "mkmk",
//     },
//     {
//       question: "mmem",
//       option: "me",
//     },
//   ],
// };

// const data = responseData.questions;
// const workSheetName = `${responseData.title}`;
// const filePath = `./${responseData.id}.xlsx`;

// const exportExcel = (data, workSheetName, filePath) => {
//   const workSheetData = data;
//   const workBook = xlsx.utils.book_new();
//   const workSheet = xlsx.utils.json_to_sheet(workSheetData);
//   xlsx.utils.book_append_sheet(workBook, workSheet, workSheetName);
//   xlsx.writeFile(workBook, path.resolve(filePath));
// };

// const fileName = `${responseData.id}.xlsx`;

// exportExcel(data, workSheetName, filePath);

// sendDocViaMail(responseData.from, responseData.title, fileName, filePath);

// const array = [];
// for (let i = 0; i < 10; i++) {
//   array.push({ file: `${i}` });
// }
// console.log(array);

// const express = require("express");
// const path = require("path");
// const zip = require("express-zip");

// const app = express();

// app.listen(4000);

// app.get("/download", (req, res) => {
//   const resFolderArray = [];
//   for (let i = 0; i < 3; i++) {
//     resFolderArray.push({ path: `./downloads/${i}.xlsx`, name: `${i}.xlsx` });
//   }

//   //   zip and download
//   res.zip(resFolderArray);
// });
