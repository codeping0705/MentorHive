const express = require("express");
const serviceController = require("../../controllers/service.controller");
const validate  = require("../../middleware/validate");
const { createServiceSchema } = require("../../validations/service.validation");
const asyncHandler = require("../../helper/asyncHandler");
const authMiddleware = require("../../middleware/auth");

const router = express.Router();

// Create service
router.post(
  "/",
  authMiddleware.restrictTo("mentor"),
  validate(createServiceSchema),
  asyncHandler(serviceController.createService)
);

// Update service
router.put(
  "/:serviceId",
  authMiddleware.restrictTo("mentor"),
  validate(createServiceSchema),
  asyncHandler(serviceController.updateService)
);

// Get all services by mentor
router.get(
  "/",
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.getServiceByMentor)
);

// Get service by ID
router.get(
  "/:serviceId",
  authMiddleware.restrictTo("mentor"),
  asyncHandler(serviceController.getServiceById)
);

module.exports = router;
