const asyncHandler = require("express-async-handler");
const Docx = require("../models/docsModel");
// const User = require("../models/userModel");

// const { createExcelFromResArray } = require("../middleware/downloadResponses");

//get method controller
// const getDocs = asyncHandler(async (req, res) => {
//   const { q, pN } = req.query;
//   console.log(q);
//   const docs = await Docx.find({ title: { $regex: q } });
//   res.status(200).json(docs.splice(pN - 1, pN * 10));
// });
const getDocs = asyncHandler(async (req, res) => {
  const { q, pn } = req.query;
  console.log(q, pn);
  const docs = await Docx.find({ title: { $regex: q } });
  res.status(200).json(docs.splice(pn - 1, pn * 10));
});

//post method controller
const postDocs = asyncHandler(async (req, res) => {
  const body = req.body;
  if (!req.body) {
    res.status(400);
    throw new Error("Please add text in the text field");
  }

  const doc = new Docx(body);

  await doc.save();

  res.status(200).json(doc);
});

// get a single doc
const getSingleDoc = asyncHandler(async (req, res) => {
  const doc = await Docx.findById(req.params.id);
  if (!doc) {
    res.status(400);
    throw new Error("Doc not found");
  }

  res.status(200).json(doc);
});

//put method controller
const updateDoc = asyncHandler(async (req, res) => {
  const doc = await Docx.findById(req.params.id);

  if (!doc) {
    res.status(400);
    throw new Error("Doc not found");
  }

  console.log("hello");

  const updatedDoc = await Docx.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedDoc);
});

//delete method controller
const deleteDoc = asyncHandler(async (req, res) => {
  console.log("hello");
  const doc = await Docx.findById(req.params.id);

  if (!doc) {
    res.status(400);
    console.log("hi");
    throw new Error("Doc not found");
  }

  await doc.remove();

  res
    .status(200)
    .json({ id: req.params.id, message: "item sucessfully deleted" });
});

module.exports = {
  getDocs,
  postDocs,
  updateDoc,
  deleteDoc,
  getSingleDoc,
};
