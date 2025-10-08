const ServiceModel = require("../models/service.model");
const serviceService = require("../services/service.service");
const httpStatus = require("../utils/httpStatus");

const createService = async (req, res, next) => {
  try {
    const mentorId = req.user._id;
    const { name, description, duration, price } = req.body;
    const service = await serviceService.createService({
      mentorId: mentorId,
      name,
      description,
      duration,
      price,
    });
    res.ststus(httpStatus.created).json({
      success: true,
      message: "Service Created!",
      service,
    });
  } catch (error) {
    console.error(error);
  }
};
