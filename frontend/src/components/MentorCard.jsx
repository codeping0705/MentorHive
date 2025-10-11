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
  FaClock,
} from "react-icons/fa";

const MentorCard = ({ mentor }) => {
  const { name, email, photoUrl, profile = {}, social = {} } = mentor;
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsTabletOrMobile(window.innerWidth <= 1024);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const handleFlip = () => {
    if (isTabletOrMobile) setFlipped((prev) => !prev);
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${flipped || hovered ? 180 : 0}deg)`,
    transition: "transform 0.6s",
    transformStyle: "preserve-3d",
  };

  const sideStyle =
    "absolute inset-0 w-full h-full shadow-lg backface-hidden flex flex-col rounded-3xl overflow-hidden";

  return (
    <li
      className="relative w-full sm:w-80 h-[30rem] mx-auto cursor-pointer"
      onMouseEnter={() => !isTabletOrMobile && setHovered(true)}
      onMouseLeave={() => !isTabletOrMobile && setHovered(false)}
    >
      <div style={cardStyle} className="relative w-full h-full">
        {/* FRONT SIDE */}
        <div
          className={`${sideStyle} bg-blue-50 border border-blue-100 p-0 justify-start`}
        >
          <div className="w-full h-[70%] bg-blue-100 overflow-hidden">
            <img
              src={
                photoUrl ||
                "https://media.istockphoto.com/id/1450340623/photo/portrait-of-successful-mature-boss-senior-businessman-in-glasses-asian-looking-at-camera-and.jpg?s=612x612&w=0&k=20&c=f0EqWiUuID5VB_NxBUEDn92W2HLENR15CFFPzr-I4XE="
              }
              alt={name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex flex-col items-center justify-start p-4 h-[60%] overflow-auto">
            <h3 className="text-xl font-bold text-gray-900 mt-2 text-center">
              {name}
            </h3>

            {profile.title && (
              <p className="text-blue-700 text-sm sm:text-base mt-1">
                {profile.title}
              </p>
            )}
            {profile.company && (
              <div className="flex items-center gap-2 mt-1 text-gray-700 text-sm sm:text-base">
                <FaBriefcase className="text-blue-500" /> {profile.company}
              </div>
            )}

            {isTabletOrMobile && (
              <button
                onClick={handleFlip}
                className="mt-4 px-6 py-2 bg-blue-300 text-gray-900 font-medium rounded-full shadow hover:bg-blue-400 transition"
              >
                View Details
              </button>
            )}
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className={`${sideStyle} bg-white border border-blue-100 p-4 rotate-y-180 flex flex-col justify-between`}
          style={{ transform: "rotateY(180deg)" }}
        >
          <div className="flex flex-col gap-3 flex-1 overflow-auto">
            <div className="flex flex-col items-center mb-2">
              <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              {profile.title && (
                <p className="text-blue-700 text-sm">{profile.title}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg shadow-sm text-gray-700 break-all">
                <FaEnvelope className="text-blue-500" /> {email}
              </div>
              {profile.college && (
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg shadow-sm text-gray-700">
                  <FaUniversity className="text-blue-500" /> {profile.college}
                </div>
              )}
              {profile.company && (
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg shadow-sm text-gray-700">
                  <FaBriefcase className="text-blue-500" /> {profile.company}
                </div>
              )}
              {profile.experience && (
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg shadow-sm text-gray-700">
                  <FaClock className="text-blue-500" /> {profile.experience} yrs
                </div>
              )}
              {profile.location && (
                <div className="flex items-center gap-3 p-2 bg-blue-50 rounded-lg shadow-sm text-gray-700">
                  <FaMapMarkerAlt className="text-blue-500" /> {profile.location}
                </div>
              )}

              {/* Tags / Skills */}
              {profile.tags && profile.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3 justify-center">
                  {profile.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-3 py-1 rounded-full font-medium shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Social Icons + Back Button */}
          <div className="flex flex-col gap-3 mt-4">
            <div className="flex justify-center gap-4 text-blue-600 text-xl sm:text-2xl">
              {social.linkedin && (
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-800"
                >
                  <FaLinkedin />
                </a>
              )}
              {social.github && (
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-800"
                >
                  <FaGithub />
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-800"
                >
                  <FaTwitter />
                </a>
              )}
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-800"
                >
                  <FaFacebook />
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-800"
                >
                  <FaInstagram />
                </a>
              )}
            </div>

            {isTabletOrMobile && (
              <button
                onClick={handleFlip}
                className="mt-2 px-6 py-2 bg-blue-200 text-gray-900 font-medium rounded-full shadow hover:bg-blue-300 transition"
              >
                Back
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default MentorCard;
