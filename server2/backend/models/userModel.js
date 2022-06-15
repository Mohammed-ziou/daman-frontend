const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please set a name for the user"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please set a password for the user"],
  },
  isAdmin: { type: Boolean, default: false },
  responsesCollected: { type: Number, default: 0 },
});

userSchema.set("timestamps", true);

module.exports = mongoose.model("User", userSchema);
