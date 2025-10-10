import React from "react";
import {
  FaMapMarkerAlt,
  FaStar,
  FaBriefcase,
  FaUsers,
  FaClock,
} from "react-icons/fa";

const MentorCard = ({ mentor }) => {
  return (
    <li className="group bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 hover:-translate-y-1 font-mono">
      {/* Mentor Image */}
      <div className="relative">
        <img
          src={
            mentor.image ||
            "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?w=500&auto=format&fit=crop&q=60"
          }
          alt={mentor.name}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
      </div>

      {/* Mentor Info */}
      <div className="p-6">
        {/* Name & Role */}
        <h3 className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
          {mentor.name}
        </h3>
        <p className="text-gray-600 mt-1 text-sm">{mentor.expertise || "Expert Mentor"}</p>

        {/* Company */}
        {mentor.company && (
          <div className="flex items-center justify-center mt-3 text-gray-700 text-sm">
            <FaBriefcase className="text-indigo-500 mr-2" />
            {mentor.company}
          </div>
        )}

        {/* Location */}
        {(mentor.location || mentor.address) && (
          <div className="flex items-center justify-center mt-1 text-gray-600 text-sm">
            <FaMapMarkerAlt className="text-indigo-500 mr-2" />
            {mentor.location || mentor.address}
          </div>
        )}

        {/* Rating */}
        {mentor.rating && (
          <div className="flex justify-center items-center mt-3 gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  i < Math.round(mentor.rating)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-gray-700 text-sm ml-1">
              {mentor.rating.toFixed(1)}
            </span>
          </div>
        )}

        {/* Experience, Mentees, Rate */}
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-gray-700 text-sm">
          {mentor.experience && (
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <FaClock className="text-indigo-500" />
              <span>{mentor.experience} yrs exp</span>
            </div>
          )}
          {mentor.mentees && (
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <FaUsers className="text-indigo-500" />
              <span>{mentor.mentees} mentees</span>
            </div>
          )}
          {mentor.rate && (
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              💰 <span>₹{mentor.rate}/hr</span>
            </div>
          )}
        </div>

        {/* Skills */}
        {mentor.skills?.length > 0 && (
          <div className="mt-4 flex justify-center flex-wrap gap-2">
            {mentor.skills.slice(0, 4).map((skill, index) => (
              <span
                key={index}
                className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        )}

        {/* View Profile Button */}
        <button className="mt-6 px-6 py-2.5 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md hover:shadow-lg">
          View Profile
        </button>
      </div>
    </li>
  );
};

export default MentorCard;
