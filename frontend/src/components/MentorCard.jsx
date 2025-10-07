import React from "react";

const MentorCard = ({ mentor }) => {
  return (
    <li className="group bg-gradient-to-b from-gray-50 to-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      <div className="relative">
        <img
          src={
            mentor.image ||
            "https://images.unsplash.com/photo-1728577740843-5f29c7586afe?w=500&auto=format&fit=crop&q=60"
          }
          alt={mentor.name}
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-300"></div>
      </div>

      <div className="p-5 text-center">
        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
          {mentor.name}
        </h3>
        <p className="text-gray-500 mt-1">
          {mentor.expertise || "Expert Mentor"}
        </p>
        <div className="mt-3 flex justify-center gap-2 flex-wrap">
          {mentor.skills?.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="text-sm bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
        <button className="mt-4 px-5 py-2 text-sm font-medium rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition">
          View Profile
        </button>
      </div>
    </li>
  );
};

export default MentorCard;
