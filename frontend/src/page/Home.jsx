import React from "react";
import Nav from "../components/Nav.jsx";
import { NavLink } from "react-router-dom";
import Hero from "../assets/HeroImage.jpg";
import About from "../assets/aboutImage.jpeg";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa";
import TopMentors from "../components/TopMentors.jsx";

const Home = () => {
  return (
    <>
      <Nav />

      <main className="bg-gray-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 to-purple-50 overflow-hidden py-16 md:py-28">
          <div className="container mx-auto px-6 md:px-12 flex flex-col-reverse md:flex-row items-center gap-12">
            {/* Text */}
            <div className="flex-1 text-center md:text-left z-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Elevate Hub
                </span>
                Transform Ambition Into Achievement
              </h1>
              <p className="mt-6 text-lg md:text-xl text-gray-700">
                Behind every successful journey, there’s a mentor who believed
                first.
              </p>
              <div className="mt-8 flex justify-center md:justify-start gap-4 flex-wrap">
                <NavLink to="">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 transform hover:-translate-y-1">
                    Match with a Mentor
                  </button>
                </NavLink>
              </div>
            </div>

            {/* Image */}
            <div className="flex-1 relative">
              <img
                src={Hero}
                alt="Hero"
                className="rounded-3xl shadow-2xl w-full object-cover relative z-10"
              />
              <div className="absolute -top-16 -left-16 w-64 h-64 bg-purple-200 rounded-full opacity-30 blur-3xl z-0"></div>
              <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-blue-200 rounded-full opacity-30 blur-3xl z-0"></div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-white border border-gray-200 rounded-xl mx-4 md:mx-12">
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-8">
            {/* Image */}
            <div className="flex-1 flex justify-center md:justify-end">
              <img
                src="https://images.pexels.com/photos/5989928/pexels-photo-5989928.jpeg"
                alt="About"
                className="rounded-2xl shadow-xl w-80 md:w-96 lg:w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Divider Line */}
            <div className="hidden md:block w-px bg-gray-300 self-stretch"></div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Elevate Your Career with Elevate Hub
              </h4>
              <p className="text-gray-700 text-lg mb-6">
                <span className="font-semibold text-blue-600">Elevate Hub</span>{" "}
                is a mentorship platform dedicated to helping individuals
                achieve their full potential. We connect learners,
                professionals, and aspiring achievers with experienced mentors
                who guide, inspire, and provide actionable insights. Our mission
                is to empower growth, foster meaningful connections, and
                transform ambition into achievement.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300">
                  Join ElevateHub
                </button>

                <a
                  href="#"
                  className="flex items-center gap-2 text-blue-600 font-semibold hover:underline"
                >
                  Discover More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M10 2a8 8 0 105.293 14.293l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          className="relative py-24 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F1238420946%2Fvector%2Fmentoring-doodle-seamless-pattern-and-line-icons.jpg%3Fs%3D1024x1024%26w%3Dis%26k%3D20%26c%3DoWh8xjERRYrN4QiMfhNY5WiuSgvtPw6yrcQqr2OmfHM%3D&f=1&nofb=1&ipt=7afa999d84aa0fb1647aca36c1241ab7f2cf85fbd03448496a7e299e3648ef09')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>

          <div className="relative container mx-auto px-6 md:px-12 lg:px-20">
            {/* Heading */}
            <div className="text-center max-w-4xl mx-auto mb-20">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Empower Your Career with{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  ElevateHub
                </span>
              </h2>
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                Join a vibrant community of learners and professionals. Connect
                with experienced mentors, gain personalized guidance, and
                accelerate your journey toward success — one step at a time.
              </p>
            </div>

            {/* Cards */}
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Expert Career Guidance",
                  desc: "Gain actionable insights from top industry professionals who’ve been where you want to go.",
                  icon: "💡",
                },
                {
                  title: "Personalized Learning Paths",
                  desc: "Structured mentorship journeys tailored to your strengths, goals, and growth areas.",
                  icon: "📚",
                },
                {
                  title: "Affordable & Flexible",
                  desc: "Choose from flexible plans and learn at your own pace — without financial stress.",
                  icon: "💸",
                },
                {
                  title: "Network & Collaborate",
                  desc: "Build long-lasting connections with mentors and peers across industries worldwide.",
                  icon: "🌐",
                },
                {
                  title: "Track Your Progress",
                  desc: "Visual dashboards that help you stay accountable and celebrate your milestones.",
                  icon: "📈",
                },
                {
                  title: "Global Opportunities",
                  desc: "Access mentorship and learning opportunities from global leaders and innovators.",
                  icon: "🌍",
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="group bg-white/90 border border-gray-200 rounded-3xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 backdrop-blur-lg"
                >
                  {/* Icon */}
                  <div className="w-16 h-16 flex items-center justify-center text-3xl mb-6 rounded-2xl bg-gradient-to-br from-blue-600/10 to-indigo-600/10 text-blue-700 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-700 transition">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.desc}
                  </p>

                  <a
                    href="#"
                    className="inline-block text-blue-600 font-semibold hover:text-blue-700 transition"
                  >
                    Learn More →
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* extra section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12">
            {/* Heading */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Unlock Your Potential with ElevateHub
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto text-lg">
                Follow these steps to make the most of our mentorship platform
                and achieve your goals faster.
              </p>
            </div>

            {/* Timeline / Steps */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 hidden md:block"></div>

              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                    <div className="inline-flex items-center justify-center bg-blue-600 text-white w-16 h-16 rounded-full text-2xl font-bold mb-4">
                      1
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Sign Up & Set Goals
                    </h3>
                    <p className="text-gray-600">
                      Create your account, define your learning or career goals,
                      and get matched with the perfect mentors.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center md:justify-start">
                  <img
                    src="https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg"
                    alt="Sign Up"
                    className="rounded-xl shadow-lg w-full md:w-80"
                  />
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:order-2 md:pl-8 md:text-left">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                    <div className="inline-flex items-center justify-center bg-green-600 text-white w-16 h-16 rounded-full text-2xl font-bold mb-4">
                      2
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Browse & Connect
                    </h3>
                    <p className="text-gray-600">
                      Explore mentor profiles, check reviews, and connect with
                      mentors who align with your goals.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center md:justify-end">
                  <img
                    src="https://images.pexels.com/photos/7550457/pexels-photo-7550457.jpeg"
                    alt="Connect"
                    className="rounded-xl shadow-lg w-full md:w-80"
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                    <div className="inline-flex items-center justify-center bg-purple-600 text-white w-16 h-16 rounded-full text-2xl font-bold mb-4">
                      3
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Schedule Sessions
                    </h3>
                    <p className="text-gray-600">
                      Book one-on-one or group mentorship sessions based on your
                      availability and learning priorities.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center md:justify-start">
                  <img
                    src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                    alt="Schedule"
                    className="rounded-xl shadow-lg w-full md:w-80"
                  />
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:order-2 md:pl-8 md:text-left">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                    <div className="inline-flex items-center justify-center bg-yellow-500 text-white w-16 h-16 rounded-full text-2xl font-bold mb-4">
                      4
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Track Progress
                    </h3>
                    <p className="text-gray-600">
                      Monitor your growth, track milestones, and receive
                      feedback from your mentors to stay on the path to success.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center md:justify-end">
                  <img
                    src="https://images.pexels.com/photos/3184345/pexels-photo-3184345.jpeg"
                    alt="Track"
                    className="rounded-xl shadow-lg w-full md:w-80"
                  />
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row items-center mb-12">
                <div className="md:w-1/2 md:pr-8 md:text-right">
                  <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                    <div className="inline-flex items-center justify-center bg-pink-600 text-white w-16 h-16 rounded-full text-2xl font-bold mb-4">
                      5
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Achieve & Grow
                    </h3>
                    <p className="text-gray-600">
                      Apply what you learn, achieve your goals, and unlock new
                      opportunities with your mentor’s guidance.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center md:justify-start">
                  <img
                    src="https://images.pexels.com/photos/3184319/pexels-photo-3184319.jpeg"
                    alt="Achieve"
                    className="rounded-xl shadow-lg w-full md:w-80"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  Mentorship Fields Selection section*/}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container mx-auto px-6 md:px-12 text-center">
            {/* Heading */}
            <div className="mb-12 max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Choose Your Field of Mentorship
              </h2>
              <p className="text-gray-700 text-lg md:text-xl">
                Select the area where you want guidance. Our mentors specialize
                in diverse fields to help you succeed.
              </p>
            </div>

            {/* Fields Buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              {[
                { label: "Technology", color: "from-blue-500 to-blue-700" },
                { label: "Business", color: "from-purple-500 to-purple-700" },
                { label: "Marketing", color: "from-green-500 to-green-700" },
                { label: "Finance", color: "from-yellow-400 to-yellow-600" },
                { label: "Design", color: "from-pink-500 to-pink-700" },
                {
                  label: "Health & Wellness",
                  color: "from-indigo-500 to-indigo-700",
                },
                { label: "Leadership", color: "from-red-500 to-red-700" },
              ].map((field, index) => (
                <button
                  key={index}
                  className={`px-6 py-3 bg-gradient-to-r ${field.color} text-white font-semibold rounded-lg shadow-md transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-lg`}
                >
                  {field.label}
                </button>
              ))}
            </div>

            {/* Image with Permanent Overlay + Content */}
            <div className="relative max-w-5xl mx-auto rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.pexels.com/photos/5921485/pexels-photo-5921485.jpeg"
                alt="Mentorship"
                className="w-full h-auto object-cover"
              />

              {/* Transparent Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-center p-6">
                <div className="text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">
                    Unlock Your Growth Journey
                  </h3>
                  <p className="mb-4 text-gray-200">
                    Connect with experts and take the next step toward success.
                  </p>
                  <button className="px-6 py-3 bg-white text-gray-900 font-semibold rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-100 hover:scale-105 hover:shadow-lg">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*Top Mentors Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <TopMentors />
          </div>
        </section>

        {/* get started section */}
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                Unlock Your <span className="text-blue-600">Potential</span>{" "}
                with
                <span className="text-purple-600"> ElevateHub</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-700 mb-8">
                Elevate your career and personal growth with the right
                mentorship. Learn from industry experts, gain real-world
                insights, and transform your ambition into achievement.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300">
                  Get Started
                </button>
                <button className="px-6 py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-gray-300 transition duration-300">
                  Learn More
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"
                alt="Unlock Potential"
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-black opacity-20 rounded-xl"></div>
            </div>
          </div>
        </section>

        {/* pricing plan section*/}
        <section
          className="relative py-24 md:py-32 bg-gray-50 overflow-hidden"
          style={{
            backgroundImage:
              "url('https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fthumbs.dreamstime.com%2Fb%2Fmoney-finance-currency-doodle-set-doodle-hand-drawn-icon-set-outline-drawing-dollar-banknotes-coins-money-bag-line-money-357422320.jpg&f=1&nofb=1&ipt=81e74195dc000af177b2a60754be30f2ece92da53404b828d759ed50130cf720')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Overlay for clarity */}
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>

          {/* Content */}
          <div className="relative container mx-auto px-6 md:px-12 text-center">
            <div className="max-w-3xl mx-auto mb-12">
              <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Flexible Mentorship Plans
              </h2>
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed">
                Choose a plan that fits your journey. Whether you're just
                starting or scaling up your career, our flexible and affordable
                mentorship options are designed to help you thrive — at your own
                pace.
              </p>
            </div>

            {/* View Pricing Button */}
            <div>
              <NavLink
                to="/pricing"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300"
              >
                View Pricing
              </NavLink>
            </div>
          </div>

          {/* Decorative bottom gradient fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
        </section>

        {/*FAQ  */}
        <section className="py-16 md:py-24 bg-gray-100">
          <div className="container mx-auto px-6 md:px-12">
            {/* Heading */}
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Got Questions? Find Us Here!
              </h2>
              <p className="text-gray-700 text-lg md:text-xl">
                Explore our mentorship programs or locate our office. We’re here
                to help!
              </p>
            </div>

            {/* Flex container for Map & FAQ */}
            <div className="flex flex-col md:flex-row gap-12">
              {/* Map */}
              <div className="flex-1">
                <div className="rounded-xl overflow-hidden shadow-lg w-full h-80 md:h-[36rem]">
                  <iframe
                    title="ElevateHub Location"
                    className="w-full h-full border-0"
                    src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-73.94%2C40.78&layer=mapnik&marker=40.74,-73.98"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="flex-1 max-w-full">
                <div className="max-w-4xl mx-auto space-y-6">
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center md:text-left">
                    Frequently Asked Questions
                  </h3>

                  {/* FAQ Items */}
                  {[
                    {
                      question: "What is ElevateHub?",
                      answer:
                        "ElevateHub is a mentorship platform that connects learners, professionals, and aspiring achievers with experienced mentors to guide, inspire, and empower growth.",
                    },
                    {
                      question: "How do I match with a mentor?",
                      answer:
                        "Once you sign up, you can select your goals and interests, and ElevateHub will suggest mentors best suited to guide you on your career or learning journey.",
                    },
                    {
                      question: "Is mentorship flexible and affordable?",
                      answer:
                        "Yes! Mentorship sessions are flexible, and ElevateHub provides affordable plans so that guidance is accessible without financial stress.",
                    },
                    {
                      question: "Can I track my progress?",
                      answer:
                        "ElevateHub offers tools to track your progress with your mentor, so you can monitor growth, set milestones, and celebrate achievements along the way.",
                    },
                    {
                      question:
                        "What types of mentorship programs are offered?",
                      answer:
                        "We offer one-on-one mentorship, group sessions, career-specific guidance, skill-based learning, and networking opportunities with industry leaders.",
                    },
                    {
                      question: "Can I change my mentor if needed?",
                      answer:
                        "Absolutely! If you feel that a different mentor aligns better with your goals, you can request a mentor change easily through your dashboard.",
                    },
                  ].map((faq, index) => (
                    <div
                      key={index}
                      className="bg-white border border-gray-200 rounded-xl shadow-sm"
                    >
                      <button
                        className="w-full text-left px-6 py-4 flex justify-between items-center font-semibold text-gray-900 hover:bg-gray-100 rounded-xl focus:outline-none transition duration-300"
                        onClick={(e) => {
                          const content = e.currentTarget.nextElementSibling;
                          content.classList.toggle("hidden");
                          e.currentTarget.querySelector(
                            "span:last-child"
                          ).textContent = content.classList.contains("hidden")
                            ? "+"
                            : "−";
                        }}
                      >
                        <span>{faq.question}</span>
                        <span className="text-gray-500">+</span>
                      </button>
                      <div className="px-6 py-4 hidden text-gray-700">
                        {faq.answer}
                      </div>
                    </div>
                  ))}

                  {/* Contact Button */}
                  <div className="text-center mt-6">
                    <button className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-xl hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 transition-all duration-300">
                      Still have questions? Contact Us!
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="bg-gray-900 text-gray-300 relative overflow-hidden">
          {/* Decorative gradient shapes */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-tr from-indigo-600 to-purple-600 rounded-full mix-blend-multiply opacity-20 blur-3xl animate-pulse sm:w-72 sm:h-72"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-bl from-pink-500 to-indigo-500 rounded-full mix-blend-multiply opacity-20 blur-3xl animate-pulse sm:w-80 sm:h-80"></div>

          <div className="container mx-auto px-6 md:px-12 py-16 relative z-10">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-10">
              {/* About */}
              <div className="flex-1 min-w-[220px]">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                  Elevate Hub
                </h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  Empowering individuals through mentorship and guidance to
                  transform ambition into achievement. Join our community and
                  grow with expert mentors.
                </p>
                {/* Social Icons */}
                <div className="flex gap-3 mt-6 flex-wrap">
                  {[
                    FaFacebookF,
                    FaTwitter,
                    FaLinkedinIn,
                    FaInstagram,
                    FaGithub,
                  ].map((Icon, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="p-3 bg-gray-800 rounded-full hover:bg-gradient-to-r hover:from-indigo-500 hover:to-purple-600 transition-all duration-300 text-white"
                    >
                      <Icon className="text-lg" />
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
              &copy; {new Date().getFullYear()} Elevate Hub. All rights
              reserved.
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

export default Home;
