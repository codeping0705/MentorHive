import React, { useRef, useState } from "react";
import { Button, Avatar, Input, Modal, Form, Spin, message } from "antd";
import { 
  AiOutlineMail, 
  AiOutlineUser, 
  AiOutlineEdit, 
  AiFillLinkedin, 
  AiFillGithub, 
  AiFillTwitterCircle, 
  AiFillFacebook, 
  AiFillInstagram 
} from "react-icons/ai";

import Dashboard from "./dashboard";
import useUserStore from "../../store/user";
import userAPI from "../../apiManager/user";

const Profile = () => {
  const { setUser, user: mentorData } = useUserStore();
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle image change
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
        console.error("Image upload failed", error);
        message.error("Failed to upload image");
      } finally {
        setLoading(false);
      }
    }
  };

  // Open modal
  const handleEditProfile = () => setIsEditing(true);

  // Handle profile submit
  const handleSubmit = async (values) => {
    const updatedUserData = {
      tags: values.skills.split(",").map(tag => tag.trim()),
      title: values.title,
      bio: values.bio,
      college: values.college,
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
      console.error("Profile update failed", error);
      message.error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate avatar from initials
  const generateAvatarUrl = (name) => {
    const initials = name
      .split(" ")
      .map(word => word.charAt(0).toUpperCase())
      .join("");
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=256`;
  };

  return (
    <Dashboard>
      <div className="flex flex-col items-center w-full min-h-screen p-8 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        {/* Page Title */}
        <h2 className="mb-12 text-5xl font-extrabold text-center text-blue-600 tracking-wide drop-shadow-md">
          My Profile
        </h2>

        <div className="flex flex-col w-full max-w-5xl p-10 space-y-12 bg-white shadow-2xl rounded-3xl border border-gray-200">
          {/* Avatar */}
          <Spin spinning={loading}>
            <div className="flex justify-center relative">
              <Avatar
                onClick={() => !loading && inputRef.current.click()}
                size={180}
                src={mentorData?.photoUrl || generateAvatarUrl(mentorData?.name || "User")}
                className="border-4 border-blue-300 shadow-xl cursor-pointer transform hover:scale-110 transition-transform duration-300"
              />
              {/* Edit Icon */}
              <button
                type="button"
                onClick={() => inputRef.current.click()}
                className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
              >
                <AiOutlineEdit className="text-lg" />
              </button>
            </div>
          </Spin>

          {/* Hidden Input */}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={loading}
          />

          {/* Profile Info */}
          <div className="text-center space-y-4">
            <h3 className="text-4xl font-semibold text-blue-700 tracking-wide">{mentorData?.name}</h3>
            <p className="flex items-center justify-center text-lg text-gray-700 space-x-2">
              <AiOutlineMail className="text-blue-500 text-xl" />
              <span>{mentorData?.email}</span>
            </p>
            <p className="flex items-center justify-center text-lg text-gray-700 space-x-2">
              <AiOutlineUser className="text-blue-500 text-xl" />
              <span>{mentorData?.profile?.title}</span>
            </p>

            {/* Tags */}
            {mentorData?.profile?.tags && (
              <div className="flex flex-wrap justify-center mt-2 gap-2">
                {mentorData.profile.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium shadow-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Bio */}
            {mentorData?.profile?.bio && (
              <p className="mt-3 text-gray-700 text-base leading-relaxed bg-blue-50 p-4 rounded-xl shadow-sm">
                {mentorData.profile.bio}
              </p>
            )}

            {/* College */}
            {mentorData?.profile?.college && (
              <p className="mt-2 text-gray-700 text-base bg-blue-50 p-3 rounded-xl inline-block shadow-sm">
                <span className="font-semibold text-blue-600">College:</span> {mentorData.profile.college}
              </p>
            )}
          </div>

          {/* Social Media Links */}
          <h3 className="text-2xl font-semibold text-center text-blue-700 mt-6">
            Connect with Me
          </h3>
          <div className="flex justify-center mt-4 space-x-8">
            <a
              href={mentorData?.social?.linkedin || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition-transform transform hover:scale-125"
            >
              <AiFillLinkedin className="text-4xl drop-shadow-md" />
            </a>
            <a
              href={mentorData?.social?.github || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-800 hover:text-gray-900 transition-transform transform hover:scale-125"
            >
              <AiFillGithub className="text-4xl drop-shadow-md" />
            </a>
            <a
              href={mentorData?.social?.twitter || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition-transform transform hover:scale-125"
            >
              <AiFillTwitterCircle className="text-4xl drop-shadow-md" />
            </a>
            <a
              href={mentorData?.social?.facebook || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-blue-900 transition-transform transform hover:scale-125"
            >
              <AiFillFacebook className="text-4xl drop-shadow-md" />
            </a>
            <a
              href={mentorData?.social?.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-600 hover:text-pink-800 transition-transform transform hover:scale-125"
            >
              <AiFillInstagram className="text-4xl drop-shadow-md" />
            </a>
          </div>

          {/* Edit Profile Button */}
          <Button
            type="primary"
            className="w-full mt-10 text-lg bg-blue-500 rounded-xl hover:bg-blue-600 transition-all shadow-lg"
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
                college: mentorData?.profile?.college,
                social: mentorData?.social,
              }}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item label="Name" name="name" rules={[{ required: true, message: "Please enter your name" }]}>
                <Input placeholder="Enter your name" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter your title" }]}>
                <Input placeholder="Enter your title (e.g., Software Engineer)" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Skills" name="skills" rules={[{ required: true, message: "Please enter your skills" }]}>
                <Input placeholder="Enter skills separated by commas" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Bio" name="bio">
                <Input.TextArea placeholder="Write a short bio about yourself" rows={4} className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="College" name="college">
                <Input placeholder="Enter your college name" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="LinkedIn" name={["social", "linkedin"]}>
                <Input placeholder="Enter LinkedIn profile URL" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="GitHub" name={["social", "github"]}>
                <Input placeholder="Enter GitHub profile URL" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Twitter" name={["social", "twitter"]}>
                <Input placeholder="Enter Twitter profile URL" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Facebook" name={["social", "facebook"]}>
                <Input placeholder="Enter Facebook profile URL" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>
              <Form.Item label="Instagram" name={["social", "instagram"]}>
                <Input placeholder="Enter Instagram profile URL" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="w-full bg-blue-500 rounded-xl hover:bg-blue-600 transition-all shadow-md"
                >
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
