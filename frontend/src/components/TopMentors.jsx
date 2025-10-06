import React, { useEffect, useState } from "react";
import useMentorStore from "../store/mentor";
import mentorApi from "../apiManager/mentor";
import MentorCard from "./MentorCard";
import { Spin } from "antd";

const TopMentors = () => {
  const [loading, setLoading] = useState(false);
  const { mentorsData, setMentorsData } = useMentorStore();

  const fetchAllMentors = async () => {
    setLoading(true);
    try {
      const response = await mentorApi.getAllMentors();
      const allMentors = response?.data?.mentors || [];
      setMentorsData(allMentors);
    } catch (error) {
      console.error("Failed to fetch mentors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMentors();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-16 bg-gray-50 min-h-screen">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-8 border-b pb-3">
        🌟 Top Mentors
      </h1>

      {mentorsData.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">
          No mentors available yet.
        </p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mentorsData.map((mentor) => (
            <MentorCard key={mentor._id} mentor={mentor} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TopMentors;
