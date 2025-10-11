const cloudinary = require("cloudinary").v2;
const config = require("../config");
const userService = require("../services/user.service");
const httpStatus = require("../utils/httpStatus");
// Configure Cloudinary
cloudinary.config(config.cloudinary);


const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // temporary storage

const uploadPhoto = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "user_photos",
      use_filename: true,
    });

    // Update user with new photo URL
    const updatedUser = await userService.updateUserPhoto(
      req.user._id,
      result.secure_url
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Photo uploaded successfully",
      photoUrl: updatedUser.photoUrl,
    });
  } catch (error) {
    console.error("Error uploading photo:", error);
    res.status(500).json({ message: "Error uploading photo" });
  }
};

const getUser = async (req, res, next) => {
  const userId = req.user._id;
  const user = await userService.getUserById(userId);

  if (!user) {
    return next(new ApiError(httpStatus.notFound, "User not found"));
  }

  res.status(httpStatus.ok).json({
    success: true,
    user,
  });
};

const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const updatedUser = await userService.updateUserProfile(userId, req.body);

    if (!updatedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ success: false, message: "Error updating profile" });
  }
};

module.exports = {
  uploadPhoto,
  getUser,
  updateUserProfile,
};
