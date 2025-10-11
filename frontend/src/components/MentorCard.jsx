import React, { useState, useEffect } from "react";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaUniversity,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaBriefcase,
  FaClock
} from "react-icons/fa";

const MentorCard = ({ mentor }) => {
  const { name, email, photoUrl, username, profile = {}, social = {} } = mentor;
  const [isMobile, setIsMobile] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFlip = () => {
    if (isMobile) setFlipped((prev) => !prev);
  };

  const transformStyle = {
    transform: `perspective(1000px) rotateY(${(flipped || hovered) ? 180 : 0}deg)`,
    transition: "transform 0.6s",
    transformStyle: "preserve-3d"
  };

  const sideStyle = "absolute inset-0 w-full h-full rounded-2xl shadow-lg backface-hidden flex flex-col p-6";

  return (
    <li
      className="relative w-full sm:w-72 h-[28rem] mx-auto font-sans cursor-pointer"
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
    >
      <div style={transformStyle} className="relative w-full h-full">
        {/* FRONT SIDE */}
        <div className={`${sideStyle} bg-white border border-gray-200`}>
          <div className="flex flex-col items-center">
            <img
              src={photoUrl || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
              alt={name}
              className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-indigo-200 shadow-sm"
            />
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 text-center mt-2">{name}</h3>

            {profile.title && <p className="text-blue-600 text-sm sm:text-base mt-1">{profile.title}</p>}
            {profile.company && (
              <div className="flex items-center gap-1 sm:gap-2 mt-1 text-sm sm:text-base text-gray-700">
                <FaBriefcase className="text-blue-500" />
                <span>{profile.company}</span>
              </div>
            )}
            {profile.experience && (
              <div className="flex items-center gap-1 sm:gap-2 mt-1 text-sm sm:text-base text-gray-700">
                <FaClock className="text-blue-500" />
                <span>{profile.experience} yrs</span>
              </div>
            )}
            {/* Skills */}
            {profile.skills && profile.skills.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mt-2">
                {profile.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-indigo-100 text-blue-700 text-xs sm:text-sm px-2 py-1 rounded-full shadow-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {isMobile && (
              <button
                onClick={handleFlip}
                className="mt-4 px-5 py-2 text-sm sm:text-base font-medium rounded-full bg-blue-600 text-white hover:bg-indigo-700 transition duration-300"
              >
                View Details
              </button>
            )}
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className={`${sideStyle} bg-white border border-gray-200 rotate-y-180`}
          style={{ transform: "rotateY(180deg)" }}
        >
          {/* Header */}
          <div className="bg-blue-50 rounded-lg p-3 flex flex-col items-center text-center mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-blue-700">{name}</h3>
            <p className="text-gray-500 text-sm sm:text-base">@{username}</p>
            {profile.title && <p className="text-blue-500 text-sm sm:text-base">{profile.title}</p>}
          </div>

          {/* Info Sections */}
          <div className="flex flex-col gap-2 flex-1 overflow-auto">
            {profile.location && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded shadow-sm text-gray-700 text-sm sm:text-base">
                <FaMapMarkerAlt className="text-blue-500" />
                <span>{profile.location}</span>
              </div>
            )}
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded shadow-sm text-gray-700 text-sm sm:text-base break-all">
              <FaEnvelope className="text-blue-500" />
              <span>{email}</span>
            </div>
            {profile.college && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded shadow-sm text-gray-700 text-sm sm:text-base">
                <FaUniversity className="text-blue-500" />
                <span>{profile.college}</span>
              </div>
            )}
            {profile.company && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded shadow-sm text-gray-700 text-sm sm:text-base">
                <FaBriefcase className="text-blue-500" />
                <span>{profile.company}</span>
              </div>
            )}
            {profile.experience && (
              <div className="flex items-center gap-2 p-2 bg-gray-50 rounded shadow-sm text-gray-700 text-sm sm:text-base">
                <FaClock className="text-blue-500" />
                <span>{profile.experience} yrs</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-3 mt-3 text-gray-600 text-lg sm:text-xl">
            {social.linkedin && <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-700"><FaLinkedin /></a>}
            {social.github && <a href={social.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-700"><FaGithub /></a>}
            {social.twitter && <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-700"><FaTwitter /></a>}
            {social.facebook && <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-700"><FaFacebook /></a>}
            {social.instagram && <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-700"><FaInstagram /></a>}
          </div>

          {isMobile && (
            <button
              onClick={handleFlip}
              className="mt-3 px-4 py-2 text-sm sm:text-base font-medium rounded-full bg-blue-500 text-white hover:bg-blue-600 transition duration-300"
            >
              Back
            </button>
          )}
        </div>
      </div>
    </li>
  );
};

export default MentorCard;
