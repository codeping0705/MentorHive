import React, { useRef, useState } from "react";
import { Button, Avatar, Input, Modal, Form, Spin, message } from "antd";
import {
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineEdit,
  AiOutlineHome,
  AiOutlineBank,
  AiOutlineClockCircle,
} from "react-icons/ai";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";

import Dashboard from "../dashboard/Dashboard";
import useUserStore from "../../store/user";
import userAPI from "../../apiManager/user";

const Profile = () => {
  const { setUser, user: userData } = useUserStore();
  const inputRef = useRef(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const isMentor = userData?.role === "mentor";
  const heading = isMentor ? "Mentor Profile" : "Student Profile";

  // Avatar generator
  const generateAvatarUrl = (name) => {
    const initials = name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("");
    return `https://ui-avatars.com/api/?name=${initials}&background=random&color=fff&size=256`;
  };

  // Image upload handler
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const formData = new FormData();
      formData.append("photo", file);
      try {
        const response = await userAPI.uploadImage(formData);
        setUser({ ...userData, photoUrl: response.data.photoUrl });
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

  // Submit handler
  const handleSubmit = async (values) => {
    const updatedUserData = isMentor
      ? {
          tags: values.skills.split(",").map((tag) => tag.trim()),
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
        }
      : {
          tags: values.skills.split(",").map((tag) => tag.trim()),
          bio: values.bio,
          college: values.college,
          degree: values.degree,
          graduationYear: values.graduationYear,
          location: values.location,
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

  // Profile fields for display
  const profileFields = isMentor
    ? [
        { label: "Title", value: userData?.profile?.title, icon: <AiOutlineUser className="text-2xl lg:text-3xl text-blue-500" /> },
        { label: "Company", value: userData?.profile?.company, icon: <AiOutlineBank className="text-2xl lg:text-3xl text-blue-500" /> },
        { label: "Location", value: userData?.profile?.location, icon: <AiOutlineHome className="text-2xl lg:text-3xl text-blue-500" /> },
        { label: "Experience", value: userData?.profile?.experience ? `${userData.profile.experience} years` : "", icon: <AiOutlineClockCircle className="text-2xl lg:text-3xl text-blue-500" /> },
      ]
    : [
        { label: "College", value: userData?.profile?.college, icon: <AiOutlineBank className="text-2xl lg:text-3xl text-blue-500" /> },
        { label: "Degree", value: userData?.profile?.degree, icon: <AiOutlineUser className="text-2xl lg:text-3xl text-blue-500" /> },
        { label: "Graduation Year", value: userData?.profile?.graduationYear, icon: <AiOutlineClockCircle className="text-2xl lg:text-3xl text-blue-500" /> },
        { label: "Location", value: userData?.profile?.location, icon: <AiOutlineHome className="text-2xl lg:text-3xl text-blue-500" /> },
      ];

  return (
    <Dashboard>
      <div className="flex flex-col items-center w-full min-h-screen px-4 py-6 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <h2 className="mb-6 text-3xl sm:text-4xl font-extrabold text-center text-blue-600 tracking-wide drop-shadow-md">
          {heading}
        </h2>

        <div className="flex flex-col w-full max-w-xl sm:max-w-3xl p-4 sm:p-8 space-y-6 bg-white shadow-xl border border-gray-200">
          {/* Avatar */}
          <Spin spinning={loading}>
            <div className="flex justify-center relative mb-4">
              <Avatar
                onClick={() => !loading && inputRef.current.click()}
                size={120}
                src={userData?.photoUrl || generateAvatarUrl(userData?.name || "User")}
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
          <input ref={inputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" disabled={loading} />

          {/* Info Table */}
          <div className="w-full mx-auto mt-2">
            <h3 className="text-lg sm:text-2xl font-semibold text-blue-700 text-center mb-4 break-words">{userData?.name}</h3>

            <div className="bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100">
              {/* Desktop */}
              <table className="w-full text-center hidden sm:table">
                <tbody>
                  {profileFields.map(
                    (item, idx) =>
                      item.value && (
                        <tr key={idx} className="border-b last:border-b-0 hover:bg-blue-50 transition-colors">
                          <td className="px-3 py-2 sm:px-4 sm:py-3 w-12 flex justify-center">{item.icon}</td>
                          <td className="px-3 py-2 sm:px-4 sm:py-3 font-medium text-blue-600 text-sm sm:text-base break-words">{item.label}</td>
                          <td className="px-3 py-2 sm:px-4 sm:py-3 text-gray-700 text-sm sm:text-base break-words">{item.value}</td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>

              {/* Mobile */}
              <div className="flex flex-col sm:hidden">
                {profileFields.map(
                  (item, idx) =>
                    item.value && (
                      <div key={idx} className="flex justify-between items-center border-b last:border-b-0 py-2 px-3 hover:bg-blue-50 transition-colors">
                        <div className="flex items-center gap-2">
                          {item.icon}
                          <span className="font-medium text-blue-600 text-xs sm:text-sm break-words">{item.label}</span>
                        </div>
                        <span className="text-gray-700 text-xs sm:text-sm break-words text-right">{item.value}</span>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>

          {/* Skills */}
          {userData?.profile?.tags && (
            <div className="mt-4 text-center">
              <h4 className="text-md sm:text-lg font-semibold text-blue-700 mb-2">Skills</h4>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {userData.profile.tags.map((tag, idx) => (
                  <span key={idx} className="bg-blue-100 text-blue-800 text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full font-medium shadow-sm">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Bio */}
          {userData?.profile?.bio && (
            <div className="mt-4 text-center">
              <h4 className="text-md sm:text-lg font-semibold text-blue-700 mb-2">{isMentor ? "Bio" : "About Me"}</h4>
              <p className="text-gray-700 text-xs sm:text-sm leading-relaxed bg-blue-50 p-2 sm:p-3 rounded-xl shadow-sm break-words">{userData.profile.bio}</p>
            </div>
          )}

          {/* Social Media */}
          {isMentor && (
            <>
              <h3 className="text-lg sm:text-xl font-semibold text-center text-blue-700 mt-4">Connect with Me</h3>
              <div className="flex justify-center flex-wrap gap-4 sm:gap-6 mt-2">
                {[
                  { key: "linkedin", icon: <AiFillLinkedin className="text-2xl sm:text-3xl drop-shadow-md" />, color: "#0077B5" },
                  { key: "github", icon: <AiFillGithub className="text-2xl sm:text-3xl drop-shadow-md" />, color: "#181717" },
                  { key: "twitter", icon: <AiFillTwitterCircle className="text-2xl sm:text-3xl drop-shadow-md" />, color: "#1DA1F2" },
                  { key: "facebook", icon: <AiFillFacebook className="text-2xl sm:text-3xl drop-shadow-md" />, color: "#1877F2" },
                  { key: "instagram", icon: <AiFillInstagram className="text-2xl sm:text-3xl drop-shadow-md" />, color: "#E4405F" },
                ].map((social) => (
                  <a key={social.key} href={userData?.social?.[social.key] || "#"} target="_blank" rel="noopener noreferrer" style={{ color: social.color }} className="transition-transform transform hover:scale-110">{social.icon}</a>
                ))}
              </div>
            </>
          )}

          {/* Edit Button */}
          <Button type="primary" className="w-full mt-4 sm:mt-6 text-base sm:text-lg bg-blue-500 rounded-xl py-2 sm:py-3 hover:bg-blue-600 transition-all shadow-lg" onClick={handleEditProfile}>
            Edit Profile
          </Button>

          {/* Edit Modal */}
          <Modal title="Edit Profile" open={isEditing} onCancel={() => setIsEditing(false)} footer={null} className="rounded-xl shadow-2xl">
            <Form
              initialValues={{
                name: userData?.name,
                email: userData?.email,
                title: userData?.profile?.title,
                company: userData?.profile?.company,
                location: userData?.profile?.location,
                experience: userData?.profile?.experience,
                college: userData?.profile?.college,
                degree: userData?.profile?.degree,
                graduationYear: userData?.profile?.graduationYear,
                skills: userData?.profile?.tags?.join(", "),
                bio: userData?.profile?.bio,
                social: userData?.social,
              }}
              onFinish={handleSubmit}
              layout="vertical"
            >
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input placeholder="Enter your name" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>

              {isMentor ? (
                <>
                  <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                    <Input placeholder="Enter your title" className="rounded-lg border-gray-300 shadow-sm" />
                  </Form.Item>
                  <Form.Item label="Company" name="company">
                    <Input placeholder="Enter company name" className="rounded-lg border-gray-300 shadow-sm" />
                  </Form.Item>
                  <Form.Item label="Experience (years)" name="experience">
                    <Input type="number" placeholder="Enter experience in years" className="rounded-lg border-gray-300 shadow-sm" />
                  </Form.Item>
                </>
              ) : (
                <>
                  <Form.Item label="College" name="college">
                    <Input placeholder="Enter your college" className="rounded-lg border-gray-300 shadow-sm" />
                  </Form.Item>
                  <Form.Item label="Degree" name="degree">
                    <Input placeholder="Enter your degree" className="rounded-lg border-gray-300 shadow-sm" />
                  </Form.Item>
                  <Form.Item label="Graduation Year" name="graduationYear">
                    <Input type="number" placeholder="Enter your graduation year" className="rounded-lg border-gray-300 shadow-sm" />
                  </Form.Item>
                </>
              )}

              <Form.Item label="Location" name="location">
                <Input placeholder="Enter your location" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>

              <Form.Item label="Skills" name="skills" rules={[{ required: true }]}>
                <Input placeholder="Enter skills separated by commas" className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>

              <Form.Item label="Bio" name="bio">
                <Input.TextArea placeholder="Write a short bio" rows={4} className="rounded-lg border-gray-300 shadow-sm" />
              </Form.Item>

              {isMentor && (
                <>
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
                </>
              )}

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
