import React, { useEffect, useState } from "react";
import Dashboard from "./dashboard";
import ServiceCard from "../../components/ServiceCard";
import service from "../../apiManager/service";
import { Button, Input, Modal, Form, Spin } from "antd";
import toast from "react-hot-toast";
import { FiPlus } from "react-icons/fi";
import useUserStore from "../../store/user"; // Adjust path

const Services = () => {
  const { user } = useUserStore(); // Get logged-in mentor
  const mentorId = user?._id;

  const [services, setServices] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      if (!mentorId) {
        toast.error("Mentor ID not found. Please login again.");
        return;
      }

      setLoading(true);
      try {
        const response = await service.getServicesByMentor(mentorId);
        setServices(response?.data?.services || []);
      } catch (error) {
        console.error("Error fetching mentor services:", error);
        toast.error("Failed to load services.");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [mentorId]);

  const handleCreateService = async (values) => {
    setLoading(true);
    try {
      const response = await service.createService(values);
      setServices((prev) => [...prev, response?.data?.service]);
      setIsModalVisible(false);
      toast.success("Service created successfully!");
    } catch (error) {
      console.error("Error creating service:", error);
      toast.error("Failed to create service.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditService = async (values) => {
    setLoading(true);
    try {
      const response = await service.editService(editingService._id, values);
      setServices((prev) =>
        prev.map((s) =>
          s._id === editingService._id ? response.data.service : s
        )
      );
      setIsModalVisible(false);
      setEditingService(null);
      toast.success("Service updated successfully!");
    } catch (error) {
      console.error("Error editing service:", error);
      toast.error("Failed to update service.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setIsModalVisible(true);
  };

  return (
    <Dashboard>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Your Services</h2>
          <Button
            type="primary"
            className="!rounded"
            onClick={() => setIsModalVisible(true)}
          >
            <FiPlus className="inline-block mr-2" /> Add New
          </Button>
        </div>

        {/* Modal for creating/editing */}
        <Modal
          title={editingService ? "Edit Service" : "Create New Service"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingService(null);
          }}
          footer={null}
        >
          <Form
            onFinish={editingService ? handleEditService : handleCreateService}
            initialValues={editingService}
            layout="vertical"
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Enter service name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Enter description!" }]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              label="Duration (minutes)"
              name="duration"
              rules={[{ required: true, message: "Enter duration!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Price (₹)"
              name="price"
              rules={[{ required: true, message: "Enter price!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              {editingService ? "Save Changes" : "Create Service"}
            </Button>
          </Form>
        </Modal>

        <Spin spinning={loading}>
          <div className="grid grid-cols-1 gap-6 mt-6 md:grid-cols-2 lg:grid-cols-3">
            {services?.map((service) => (
              <ServiceCard
                key={service._id}
                service={service}
                onEdit={() => handleEdit(service)}
              />
            ))}
          </div>
        </Spin>
      </div>
    </Dashboard>
  );
};

export default Services;
