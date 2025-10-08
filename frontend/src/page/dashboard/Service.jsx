import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { Modal, Form, Input, InputNumber, Button, Spin } from "antd";
import service from "../../apiManager/service";
import toast from "react-hot-toast";
import ServiceCard from "../../components/Servicecard";

const Service = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [services, setServices] = useState([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setFetching(true);
      try {
        const mentorId = ""; // TODO: replace with actual mentorId
        if (!mentorId) {
          toast.error("Mentor ID not found");
          return;
        }
        const response = await service.getServicesByMentor(mentorId);
        setServices(response.data.services);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch services");
      } finally {
        setFetching(false);
      }
    };
    fetchServices();
  }, []);

  const handleCreateService = async (values) => {
    setLoading(true);
    try {
      const response = await service.createService(values);
      setServices((prev) => [...prev, response.data.service]);
      setIsModalVisible(false);
      toast.success("Service created successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create service");
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
      toast.success("Service updated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update service");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dashboard>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Services</h1>
          <button
            onClick={() => setIsModalVisible(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition"
          >
            Add New +
          </button>
        </div>

        {/* Services List */}
        <Spin spinning={fetching}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.length === 0 && !fetching ? (
              <p className="text-gray-500 col-span-full text-center">
                No services available.
              </p>
            ) : (
              services.map((service) => (
                <ServiceCard
                  key={service._id}
                  service={service}
                  onEdit={() => {
                    setEditingService(service);
                    setIsModalVisible(true);
                  }}
                />
              ))
            )}
          </div>
        </Spin>

        {/* Modal Form */}
        <Modal
          title={editingService ? "Edit Service" : "Create New Service"}
          open={isModalVisible}
          onCancel={() => {
            setIsModalVisible(false);
            setEditingService(null);
          }}
          footer={null}
          className="rounded-xl"
        >
          <Form
            layout="vertical"
            onFinish={editingService ? handleEditService : handleCreateService}
            initialValues={editingService}
          >
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please enter service name" }]}
            >
              <Input placeholder="Service Name" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input placeholder="Service Description" className="rounded-md" />
            </Form.Item>

            <Form.Item
              label="Duration (minutes)"
              name="duration"
              rules={[{ required: true, message: "Please enter duration" }]}
            >
              <InputNumber
                className="w-full rounded-md"
                placeholder="Duration"
                min={1}
              />
            </Form.Item>

            <Form.Item
              label="Price (₹)"
              name="price"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <InputNumber
                className="w-full rounded-md"
                placeholder="Price"
                min={0}
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition"
              >
                {editingService ? "Save Changes" : "Create Service"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Service;
