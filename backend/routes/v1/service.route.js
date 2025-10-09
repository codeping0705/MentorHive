const express = require("express");
const serviceController = require("../../controllers/service.controller");
const validate = require("../../middleware/validate");
const { createServiceSchema } = require("../../validations/service.validation");
const authMiddleware = require("../../middleware/auth");
const asyncHandler = require("../../helper/asyncHandler");

const router = express.Router();

// Create service
router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  validate(createServiceSchema),
  asyncHandler(serviceController.createService)
);

// Update service
router.put(
  "/:serviceId",
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  validate(createServiceSchema),
  asyncHandler(serviceController.updateService)
);

// Get services for mentor
router.get(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.getServiceByMentor)
);

// Get service by ID
router.get(
  "/:serviceId",
  authMiddleware.protect,
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.getServiceById)
);

module.exports = router;
