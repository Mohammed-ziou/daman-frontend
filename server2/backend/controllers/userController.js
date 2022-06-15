const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");
const User = require("../models/userModel");
const colors = require("colors");

const registerUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400);
    throw new Error("Please fill all the fields");
  }

  const userExist = await User.findOne({ name: name });
  console.log(userExist);

  if (userExist) {
    res.status(400);
    throw new Error("User already Exists");
  }

  //   hash password
  const salt = await bycrpt.genSalt(10);
  const hashedPassword = await bycrpt.hash(password, salt);

  //   create user
  const user = await User.create({
    name,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("something went wrong while registering the user");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;

  const user = await User.findOne({ name: name });
  if (!user) {
    res.status(400);
    throw new Error("user not register, check your input or try registering");
  }

  if (user && (await bycrpt.compare(password, user.password))) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("wrong password");
  }
});

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30d",
  });
};

const getSingleUser = asyncHandler(async (req, res) => {
  console.log("hello");
  const { _id, name, isAdmin, responsesCollected } = await User.findById(
    req.user.id
  );
  res.status(200).json({ id: _id, name, isAdmin, responsesCollected });
});

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

const updateUser = asyncHandler(async (req, res) => {
  const id = req.params.id;
  console.log("id");
  const user = await User.findById(id);
  if (!user) {
    res.status(400);
    throw new Error("user not found");
  }
  console.log(req.body);
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  console.log(`"cccccccccccccccccccccccccccccc"`.red.bgCyan);
  console.log(updatedUser);
  res.status(200).json(updatedUser);
});

const deleteUser = asyncHandler(async (req, res) => {
  const userId = req.body.id;
  const user = await User.findById(userId);
  console.log(user);
  await User.findByIdAndDelete(userId);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
};
