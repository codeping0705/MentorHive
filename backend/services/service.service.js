const ServiceModel = require("../models/service.model");

const createService = async (servideData) => {
  return await ServiceModel.create(servideData);
};

const updateService = async (serviceId, mentorId, updateData) => {
  return await ServiceModel.findOneAndUpdate(
    { _id: serviceId, mentor: mentorId },
    updateData,
    { new: true, runValidators: true  }
  );
};

const getServiceByMentor = async (mentorId) => {
  return await ServiceModel.find({ mentor: mentorId });
};

const getServiceById = async (serviceId) => {
  return await ServiceModel.findById(serviceId);
};

module.exports = {
  createService,
  updateService,
  getServiceByMentor,
  getServiceById,
};
