const express = require("express");
const router = express.Router();
const {
  getDocs,
  postDocs,
  updateDoc,
  deleteDoc,
  getSingleDoc,
} = require("../controllers/docController");
const {
  responseDoc,
  getResponseDoc,
  downloadResponses,
  getResponsesForUser,
} = require("../controllers/responseController");
const { protect } = require("../middleware/authMiddleware");

// Docs routes

// get and creat doc
router.route("/").get(protect, getDocs).post(protect, postDocs);
// edit and delete doc by id
router
  .route("/:id")
  .put(protect, updateDoc)
  .delete(protect, deleteDoc)
  .get(getSingleDoc);

// Response routes

// 1. Adds a response to a doc by it's id, responses array found in every doc.
// 2. Also sends it via nodemailer to the required email address
router.route("/:id/response").put(protect, responseDoc);
// get all responses by the docs id
router.route("/:id/responses").get(protect, getResponseDoc);
// downloads a zip file containing all the responses each response in a seprate .xlsx (excel spreadsheet)
router.route("/:id/download").get(downloadResponses);

module.exports = router;

// get all the responses a user collected
// router.route("/:id/userresponses").get(protect, getResponsesForUser);
