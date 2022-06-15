const mongoose = require("mongoose");

// const Questions = require("./questionModel");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, "Please input a tilte for the Docoment"],
  },
  options: [
    {
      option: {
        type: String,
        required: [true, "Please input a tilte for the Docoment"],
      },
    },
  ],
});

const responseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true],
  },
  userId: mongoose.Types.ObjectId,
  questions: [
    {
      question: {
        type: String,
        required: [true],
      },
      answer: {
        type: String,
        required: [true],
      },
    },
  ],
});

const docsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please input a tilte for the Docoment"],
  },
  description: {
    type: String,
    required: [true, "Please input a description for the Docoment"],
  },
  questions: [{ type: questionSchema, required: true }],
  response: [responseSchema],
});

docsSchema.set("timestamps", true);

module.exports = mongoose.model("Docx", docsSchema);
