const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true],
  },
  loaction: { type: { type: String }, coordinates: [Number] },
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

responseSchema.set("timestamps", true);

module.exports = mongoose.model("Response", responseSchema);
