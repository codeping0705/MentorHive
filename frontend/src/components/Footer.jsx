import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    { Icon: FaFacebookF, color: "#1877F2", hover: "hover:bg-[#1877F2]" },
    { Icon: FaTwitter, color: "#1DA1F2", hover: "hover:bg-[#1DA1F2]" },
    { Icon: FaLinkedinIn, color: "#0A66C2", hover: "hover:bg-[#0A66C2]" },
    { Icon: FaInstagram, color: "#E4405F", hover: "hover:bg-[#E4405F]" },
    { Icon: FaGithub, color: "#333333", hover: "hover:bg-[#333333]" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 relative overflow-hidden font-mono">
      {/* Decorative gradient shapes */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full mix-blend-multiply opacity-20 blur-3xl animate-pulse sm:w-72 sm:h-72"></div>
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-bl from-pink-500 to-indigo-500 rounded-full mix-blend-multiply opacity-20 blur-3xl animate-pulse sm:w-80 sm:h-80"></div>

      <div className="container mx-auto px-6 md:px-12 py-16 relative z-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">
          {/* About Section */}
          <div className="flex-1 min-w-[220px]">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://img.icons8.com/?size=40&id=50532&format=png"
                alt="MentorHive logo"
                className="w-10 h-10"
              />
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                MentorHive
              </h3>
            </div>

            <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
              Empowering individuals through mentorship and guidance to
              transform ambition into achievement. Join our community and grow
              with expert mentors.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3 mt-6 flex-wrap">
              {socialLinks.map(({ Icon, color, hover }, idx) => (
                <a
                  key={idx}
                  href="#"
                  className={`p-3 rounded-full bg-gray-800 text-white transition-all duration-300 ${hover}`}
                  style={{
                    boxShadow: `0 4px 10px ${color}30`,
                  }}
                >
                  <Icon style={{ color }} className="text-lg" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex-1 min-w-[160px]">
            <h4 className="text-xl sm:text-2xl font-semibold text-white mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm sm:text-base">
              {["Home", "About", "Mentors", "Pricing", "Contact"].map(
                (link, idx) => (
                  <li key={idx}>
                    <a
                      href={`/${link.toLowerCase()}`}
                      className="hover:text-indigo-500 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div className="flex-1 min-w-[160px]">
            <h4 className="text-xl sm:text-2xl font-semibold text-white mb-4">
              Resources
            </h4>
            <ul className="space-y-2 text-sm sm:text-base">
              {[
                "Blog",
                "FAQs",
                "Support",
                "Terms & Conditions",
                "Privacy Policy",
              ].map((res, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="hover:text-indigo-500 transition-colors duration-300"
                  >
                    {res}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex-1 min-w-[220px]">
            <h4 className="text-xl sm:text-2xl font-semibold text-white mb-4">
              Subscribe to Newsletter
            </h4>
            <p className="text-gray-400 mb-4 text-sm sm:text-base">
              Get the latest updates, mentorship tips, and offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 rounded-lg border border-gray-700 bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 flex-1 text-sm sm:text-base"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-300 text-sm sm:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500 text-sm sm:text-base">
          &copy; {new Date().getFullYear()} MentorHive. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
