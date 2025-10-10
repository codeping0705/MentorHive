import React from "react";
import { FaPhone, FaEdit } from "react-icons/fa";

const ServiceCard = ({ service, onEdit }) => {
  return (
    <div className="p-5 mb-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
      
      {/* Top Section: Icon + Name + Status */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 text-blue-500 rounded-lg flex items-center justify-center">
            <FaPhone size={20} />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">
            {service?.name}
          </h3>
        </div>

        {/* Status Pill */}
        <span
          className={`px-3 py-1 text-sm font-semibold rounded-full ${
            service?.active
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {service?.active ? "Enabled" : "Disabled"}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-gray-600 text-sm line-clamp-3">
        {service?.description}
      </p>

      {/* Price & Duration */}
      <div className="flex justify-between items-center mb-4 text-gray-700 text-sm">
        <div>
          <span className="font-medium">Price:</span> ₹{service?.price}
        </div>
        <div>
          <span className="font-medium">Duration:</span> {service?.duration} mins
        </div>
      </div>

      {/* Edit Button */}
      <div className="flex justify-end">
        <button
          onClick={onEdit}
          className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 font-medium rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors duration-300"
        >
          <FaEdit size={16} />
          Edit
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
