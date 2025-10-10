import React, { useRef, useState } from "react";
import { Button, Avatar, Input, Modal, Form, Spin, message } from "antd";
import { 
  AiOutlineMail, 
  AiOutlineUser, 
  AiOutlineEdit, 
  AiOutlineHome, 
  AiOutlineBank, 
  AiOutlineClockCircle 
} from "react-icons/ai";
import { 
  AiFillLinkedin, 
  AiFillGithub, 
  AiFillTwitterCircle, 
  AiFillFacebook, 
  AiFillInstagram 
} from "react-icons/ai";

import Dashboard from "../dashboard/Dashboard";
import useUserStore from "../../store/user";
import userAPI from "../../apiManager/user";

const Profile = () => {
  const { setUser, user: mentorData } = useUserStore();
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("photo", file);
      try {
        const response = await userAPI.uploadImage(formData);
        setUser({ ...mentorData, photoUrl: response.data.photoUrl });
        message.success("Profile image updated!");
      } catch (error) {
        console.error(error);
        message.error("Failed to upload image");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEditProfile = () => setIsEditing(true);

  const handleSubmit = async (values) => {
    const updatedUserData = {
      tags: values.skills.split(",").map(tag => tag.trim()),
      title: values.title,
      bio: values.bio,
      company: values.company,
      location: values.location,
      experience: values.experience,
      social: {
        linkedin: values.social?.linkedin,
        github: values.social?.github,
        twitter: values.social?.twitter,
        facebook: values.social?.facebook,
        instagram: values.social?.instagram,
      },
    };

    try {
      setLoading(true);
      const response = await userAPI.updateUser(updatedUserData);
      setUser(response?.data.user);
      message.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      message.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const generateAvatarUrl = (name) => {
    const initials = name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("");
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=256`;
  };

  return (
    <Dashboard>
      <div className="flex flex-col items-center w-full min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        {/* Page Title */}
        <h2 className="mb-6 text-3xl sm:text-4xl font-extrabold text-center text-blue-600 tracking-wide drop-shadow-md">
          Mentor Profile
        </h2>

        <div className="flex flex-col w-full max-w-xl sm:max-w-3xl p-4 sm:p-8 space-y-6 bg-white shadow-xl border border-gray-200">
          {/* Avatar Section */}
          <Spin spinning={loading}>
            <div className="flex justify-center relative mb-4">
              <Avatar
                onClick={() => !loading && inputRef.current.click()}
                size={120}
                src={mentorData?.photoUrl || generateAvatarUrl(mentorData?.name || "User")}
                className="border-4 border-blue-300 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
              />
              <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="absolute bottom-0 right-0 bg-blue-500 text-white p-1.5 sm:p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
              >
                <AiOutlineEdit className="text-base sm:text-lg" />
              </button>
            </div>
          </Spin>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={loading}
          />

          {/* User Info Table */}
          <div className="w-full mx-auto mt-2">
            <h3 className="text-xl sm:text-2xl font-semibold text-blue-700 text-center mb-4">{mentorData?.name}</h3>
            <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
              <table className="w-full text-center">
                <tbody>
                  {/* Email */}
                  <tr className="border-b last:border-b-0 hover:bg-blue-50 transition-colors">
                    <td className="px-3 py-2 sm:px-4 sm:py-3 w-8 flex justify-center">
                      <AiOutlineMail className="text-blue-500 text-lg sm:text-xl" />
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-600">Email</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-700">{mentorData?.email}</td>
                  </tr>

                  {/* Title */}
                  <tr className="border-b last:border-b-0 hover:bg-blue-50 transition-colors">
                    <td className="px-3 py-2 sm:px-4 sm:py-3 w-8 flex justify-center">
                      <AiOutlineUser className="text-blue-500 text-lg sm:text-xl" />
                    </td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-600">Title</td>
                    <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-700">{mentorData?.profile?.title}</td>
                  </tr>

                  {/* Company */}
                  {mentorData?.profile?.company && (
                    <tr className="border-b last:border-b-0 hover:bg-blue-50 transition-colors">
                      <td className="px-3 py-2 sm:px-4 sm:py-3 w-8 flex justify-center">
                        <AiOutlineBank className="text-blue-500 text-lg sm:text-xl" />
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-600">Company</td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-700">{mentorData.profile.company}</td>
                    </tr>
                  )}

                  {/* Location */}
                  {mentorData?.profile?.location && (
                    <tr className="border-b last:border-b-0 hover:bg-blue-50 transition-colors">
                      <td className="px-3 py-2 sm:px-4 sm:py-3 w-8 flex justify-center">
                        <AiOutlineHome className="text-blue-500 text-lg sm:text-xl" />
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-600">Location</td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-700">{mentorData.profile.location}</td>
                    </tr>
                  )}

                  {/* Experience */}
                  {mentorData?.profile?.experience !== undefined && (
                    <tr className="hover:bg-blue-50 transition-colors">
                      <td className="px-3 py-2 sm:px-4 sm:py-3 w-8 flex justify-center">
                        <AiOutlineClockCircle className="text-blue-500 text-lg sm:text-xl" />
                      </td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-gray-600">Experience</td>
                      <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-700">{mentorData.profile.experience} years</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Skills */}
          {mentorData?.profile?.tags && (
            <div className="mt-4 text-center">
              <h4 className="text-md sm:text-lg font-semibold text-blue-700 mb-2">Skills</h4>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {mentorData.profile.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          {mentorData?.profile?.bio && (
            <div className="mt-4 text-center">
              <h4 className="text-md sm:text-lg font-semibold text-blue-700 mb-2">Bio</h4>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed bg-blue-50 p-2 sm:p-3 rounded-xl shadow-sm">
                {mentorData.profile.bio}
              </p>
            </div>
          )}

          {/* Social Media */}
          <h3 className="text-lg sm:text-xl font-semibold text-center text-blue-700 mt-4">
            Connect with Me
          </h3>
          <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mt-2">
            <a href={mentorData?.social?.linkedin || "#"} target="_blank" rel="noopener noreferrer" style={{ color: "#0077B5" }} className="transition-transform transform hover:scale-110">
              <AiFillLinkedin className="text-2xl sm:text-3xl drop-shadow-md" />
            </a>
            <a href={mentorData?.social?.github || "#"} target="_blank" rel="noopener noreferrer" style={{ color: "#181717" }} className="transition-transform transform hover:scale-110">
              <AiFillGithub className="text-2xl sm:text-3xl drop-shadow-md" />
            </a>
            <a href={mentorData?.social?.twitter || "#"} target="_blank" rel="noopener noreferrer" style={{ color: "#1DA1F2" }} className="transition-transform transform hover:scale-110">
              <AiFillTwitterCircle className="text-2xl sm:text-3xl drop-shadow-md" />
            </a>
            <a href={mentorData?.social?.facebook || "#"} target="_blank" rel="noopener noreferrer" style={{ color: "#1877F2" }} className="transition-transform transform hover:scale-110">
              <AiFillFacebook className="text-2xl sm:text-3xl drop-shadow-md" />
            </a>
            <a href={mentorData?.social?.instagram || "#"} target="_blank" rel="noopener noreferrer" style={{ color: "#E4405F" }} className="transition-transform transform hover:scale-110">
              <AiFillInstagram className="text-2xl sm:text-3xl drop-shadow-md" />
            </a>
          </div>

          {/* Edit Profile Button */}
          <Button
            type="primary"
            className="w-full mt-4 sm:mt-6 text-base sm:text-lg bg-blue-500 rounded-xl py-2 sm:py-3 hover:bg-blue-600 transition-all shadow-lg"
            onClick={handleEditProfile}
          >
            Edit Profile
          </Button>

          {/* Edit Profile Modal */}
          <Modal
            title="Edit Profile"
            open={isEditing}
            onCancel={() => setIsEditing(false)}
            footer={null}
            className="rounded-xl shadow-2xl"
          >
            <Form
              initialValues={{
                name: mentorData?.name,
                email: mentorData?.email,
                title: mentorData?.profile?.title,
                skills: mentorData?.profile?.tags?.join(", "),
                bio: mentorData?.profile?.bio,
                company: mentorData?.profile?.company,
                location: mentorData?.profile?.location,
                experience: mentorData?.profile?.experience,
                social: mentorData?.social,
              }}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Enter your name" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                <Input placeholder="Enter your title" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Company" name="company">
                <Input placeholder="Enter company name" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Location" name="location">
                <Input placeholder="Enter your city/country" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Experience (years)" name="experience">
                <Input type="number" placeholder="Enter experience in years" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Skills" name="skills" rules={[{ required: true }]}>
                <Input placeholder="Enter skills separated by commas" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Bio" name="bio">
                <Input.TextArea placeholder="Write a short bio" rows={4} className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="LinkedIn" name={["social", "linkedin"]}>
                <Input placeholder="LinkedIn profile URL" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="GitHub" name={["social", "github"]}>
                <Input placeholder="GitHub profile URL" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Twitter" name={["social", "twitter"]}>
                <Input placeholder="Twitter profile URL" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Facebook" name={["social", "facebook"]}>
                <Input placeholder="Facebook profile URL" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Instagram" name={["social", "instagram"]}>
                <Input placeholder="Instagram profile URL" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" className="w-full bg-blue-500 rounded-xl py-2 sm:py-3 hover:bg-blue-600 transition-all shadow-md">
                  Save Changes
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </div>
      </div>
    </Dashboard>
  );
};

export default Profile;
