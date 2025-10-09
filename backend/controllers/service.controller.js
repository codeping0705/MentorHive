const ServiceModel = require("../models/service.model");
const serviceService = require("../services/service.service");
const httpStatus = require("../utils/httpStatus");
const ApiError = require("../helper/ApiError");

const createService = async (req, res) => {
  try {
    const mentorId = req.user._id;
    console.log("req.user:", req.user);

    const { name, description, duration, price } = req.body;

    // Validate mandatory fields (redundant if using validate middleware)
    if (!name || !description || !duration || !price) {
      return res.status(httpStatus.badRequest).json({
        success: false,
        message: "All fields are required (name, description, duration, price)",
      });
    }

    const service = await serviceService.createService({
      mentorId,
      name,
      description,
      duration,
      price,
    });
    res.status(httpStatus.created).json({
      success: true,
      message: "Service Created!",
      service,
    });
  } catch (error) {
    console.error("Create service error:", error);
    res.status(httpStatus.internalServerError).json({
      success: false,
      message: "Failed to create service",
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const mentorId = req.user._id;
    const { name, description, duration, price, active } = req.body;

    const updatedService = await serviceService.updateService(
      serviceId,
      mentorId,
      { name, description, duration, price, active }
    );

    if (!updatedService) {
      throw new ApiError(httpStatus.notFound, "Service not found");
    }

    res.status(httpStatus.ok).json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    console.error("Update service error:", error);
    res.status(error.statusCode || httpStatus.internalServerError).json({
      success: false,
      message: error.message || "Failed to update service",
    });
  }
};

const getServiceByMentor = async (req, res) => {
  try {
    const mentorId = req.user._id;
    const services = await serviceService.getServiceByMentor(mentorId);

    if (!services || services.length === 0) {
      return res.status(httpStatus.notFound).json({
        success: false,
        message: "No services found for this mentor",
      });
    }

    res.status(httpStatus.ok).json({
      success: true,
      services,
    });
  } catch (error) {
    console.error("Get services error:", error);
    res.status(httpStatus.internalServerError).json({
      success: false,
      message: "Failed to fetch services",
      error: error.message,
    });
  }
};

const getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.serviceId;
    const service = await serviceService.getServiceById(serviceId);

    if (!service) {
      return res.status(httpStatus.notFound).json({
        success: false,
        message: "Service not found",
      });
    }

    res.status(httpStatus.ok).json({
      success: true,
      service,
    });
  } catch (error) {
    console.error("Get service by id error:", error);
    res.status(httpStatus.internalServerError).json({
      success: false,
      message: "Failed to fetch service",
      error: error.message,
    });
  }
};

module.exports = {
  createService,
  updateService,
  getServiceByMentor,
  getServiceById,
};
