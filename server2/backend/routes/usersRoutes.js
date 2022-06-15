const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUsers,
} = require("../controllers/userController");
const { protect, isAdminProtect } = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);

router.route("/").get(protect, isAdminProtect, getAllUsers);

router.get("/me", protect, getSingleUser);

router
  .route("/editusers/:id")
  .put(protect, updateUser)
  .delete(protect, deleteUser);

module.exports = router;
