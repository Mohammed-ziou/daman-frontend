const asyncHandler = require("express-async-handler");
const Docx = require("../models/docsModel");
const User = require("../models/userModel");

const { createExcelFromResArray } = require("../middleware/downloadResponses");

// handles responses
const responseDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const body = req.body;

  const doc = await Docx.findById(id);

  if (!doc) {
    console.log("Docoment not found in the database");
  }
  if (!userId) {
    console.log("no user id found");
  }
  // exportResToExcel(body);
  body.userId = userId;
  doc.response.push(body);
  //   doc.response.userId = userId;

  const updatedDoc = await Docx.findByIdAndUpdate(id, doc, {
    new: true,
  });

  //   increment a counter for the responses a user gets
  const user = await User.findById(userId);
  user.responsesCollected++;
  const updateduser = await User.findByIdAndUpdate(userId, user, {
    new: true,
  });

  res.status(200).json(updatedDoc);
});

//get responses controller
const getResponseDoc = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const docs = await Docx.findById(id);
  const { response } = docs;
  res.status(200).json(response);
});

// download responses
const downloadResponses = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const docs = await Docx.findById(id);

  if (!docs) {
    res.status(401);
    throw new Error("Docomuent not found");
  }

  const { response } = docs;

  createExcelFromResArray(response, res);
});

// get all the responses the user collected in the last week
const getResponsesForUser = asyncHandler(async (req, res) => {
  //   const docId = req.params;
  //   const userId = req.user.id;
  //   const user = await User.findById(userId);
  //   if (!user) {
  //     res.status(401);
  //     throw new Error("Docomuent not found");
  //   }
  //   const doc = await Docx.findById(ObjectId(docId));
  //   const resArray = doc.response;
  //   let numberOfResponses = [];
  //   for (let i = 0; i < resArray.length; i++) {
  //     if (resArray[i].userId == userId) {
  //       numberOfResponses.push(resArray[i]);
  //     }
  //   }
  //   res.json(numberOfResponses.length);
});

module.exports = {
  responseDoc,
  getResponseDoc,
  downloadResponses,
  getResponsesForUser,
};
