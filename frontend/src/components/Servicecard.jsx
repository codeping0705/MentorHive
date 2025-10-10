import React from "react";
import { FaPhone, FaEdit } from "react-icons/fa";

const ServiceCard = ({ service, onEdit }) => {
  return (
    <div className="p-5 sm:p-6 lg:p-8 bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 w-full max-w-3xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        {/* Left: Icon + Name */}
        <div className="flex items-center gap-4">
          <div className="p-2 sm:p-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl shadow-sm flex-shrink-0">
            <FaPhone size={18} className="sm:w-4 sm:h-4" />
          </div>
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 leading-tight break-words">
            {service?.name || "Service Name"}
          </h3>
        </div>

        {/* Right: Status */}
        <span
          className={`self-start sm:self-center px-3 py-1 text-xs sm:text-sm lg:text-base font-semibold rounded-full ${
            service?.active
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-500"
          }`}
        >
          {service?.active ? "Enabled" : "Disabled"}
        </span>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Description */}
        <div className="flex flex-col sm:col-span-2 lg:col-span-3">
          <span className="text-gray-500 mb-1 text-xs sm:text-sm lg:text-base">
            Description
          </span>
          <p className="text-gray-800 text-sm sm:text-base lg:text-lg leading-relaxed">
            {service?.description || "No description provided for this service."}
          </p>
        </div>

        {/* Price */}
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1 text-xs sm:text-sm lg:text-base">
            Price
          </span>
          <span className="text-indigo-600 font-semibold text-base sm:text-lg lg:text-xl">
            ₹{service?.price || "N/A"}
          </span>
        </div>

        {/* Duration */}
        <div className="flex flex-col">
          <span className="text-gray-500 mb-1 text-xs sm:text-sm lg:text-base">
            Duration
          </span>
          <span className="text-gray-800 font-semibold text-red-600 text-base sm:text-md lg:text-lg">
            {service?.duration ? `${service.duration} mins` : "Not specified"}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-6 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

      {/* Footer - Edit Button */}
      <div className="flex justify-end">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-500 text-white text-xs sm:text-sm lg:text-base font-medium rounded-lg shadow-md hover:from-indigo-600 hover:to-blue-600 hover:scale-105 transition-all duration-300"
        >
          <FaEdit size={14} className="sm:w-4 sm:h-4" />
          Edit Service
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
