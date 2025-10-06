import React from "react";

const MentorCard = ({ mentor }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition duration-300 rounded-xl overflow-hidden border border-gray-200">
      <img
        src={mentor.avatar || "https://via.placeholder.com/300"}
        alt={mentor.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-900">{mentor.name}</h2>
        <p className="text-sm text-gray-500 mt-1">{mentor.expertise || "Expertise not specified"}</p>
        <p className="text-gray-400 text-sm mt-2">{mentor.bio || "No bio available"}</p>
      </div>
    </div>
  );
};

export default MentorCard;
