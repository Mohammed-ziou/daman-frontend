const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const { model } = require("mongoose");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.token && req.headers.token.startsWith("Bearer")) {
    try {
      // get token from header
      token = req.headers.token.split(" ")[1];

      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

      //   get user from the token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("unauthorized request");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("unauthorized request, no token");
  }
});

const isAdminProtect = (req, res, next) => {
  if (!req.user.isAdmin) return res.status(403).send("Acess Denied");
  console.log("hello");
  console.log(req.user);
  next();
};

module.exports = { protect, isAdminProtect };
