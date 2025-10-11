import React, { useEffect, useState } from "react";
import useMentorStore from "../store/mentor";
import mentorApi from "../apiManager/mentor";
import { Spin } from "antd";
import MentorCard from "./MentorCard";

const TopMentors = () => {
  const [loading, setLoading] = useState(false);
  const [topMentors, setTopMentors] = useState([]);
  const [allMentors, setAllMentors] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { setMentorsData } = useMentorStore();

  // Select random top 4 mentors
  const selectTopMentor = (mentors) => {
    const topSelectedMentors = [];
    const totalMentors = mentors.length;

    while (topSelectedMentors.length < 4 && topSelectedMentors.length < totalMentors) {
      const randomIndex = Math.floor(Math.random() * totalMentors);
      const randomMentor = mentors[randomIndex];
      if (!topSelectedMentors.includes(randomMentor)) {
        topSelectedMentors.push(randomMentor);
      }
    }

    return topSelectedMentors;
  };

  // Fetch mentors from API
  const fetchAllMentors = async () => {
    setLoading(true);
    try {
      const response = await mentorApi.getAllMentors();
      const mentors = response?.data?.mentors || [];
      setMentorsData(mentors);
      setAllMentors(mentors);
      setTopMentors(selectTopMentor(mentors));
    } catch (error) {
      console.error("Failed to fetch mentors:", error.response || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMentors();
  }, []);

  const displayedMentors = showAll ? allMentors : topMentors;

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <section className="relative py-20 bg-gray-100 rounded-2xl">
      <div className="container mx-auto px-6 md:px-12 text-center">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Meet Our Top Mentors
          </h2>
          <p className="text-gray-600 text-lg">
            Connect with experienced professionals ready to guide you on your learning journey.
          </p>
        </div>

        {/* Mentor Cards Grid */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {displayedMentors.map((mentor, index) => (
            <MentorCard key={mentor._id || mentor.id || index} mentor={mentor} />
          ))}
        </ul>

        {/* Show More / Show Top Mentors Button */}
        {allMentors.length > 4 && (
          <div className="flex justify-center mt-12">
            <button
              className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Top Mentors" : "View All Mentors"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TopMentors;
