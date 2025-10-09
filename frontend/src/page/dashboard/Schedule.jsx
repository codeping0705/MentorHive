import React, { useEffect, useState } from "react";
import {
  Spin,
  Badge,
  Modal,
  Form,
  Input,
  DatePicker,
  TimePicker,
  Button,
} from "antd";
import moment from "moment";
import scheduleApi from "../../apiManager/schedule";
import Dashboard from "../dashboard/Dashboard";
import toast from "react-hot-toast";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingSchedule, setEditingSchedule] = useState(null);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const response = await scheduleApi.getSchedulesByMentor();
      setSchedules(response.data.schedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      toast.error("Failed to fetch schedules");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedules();
  }, []);

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        date: values.date.format("YYYY-MM-DD"),
        time: values.time.format("HH:mm"),
      };

      if (editingSchedule) {
        await scheduleApi.updateSchedule(editingSchedule._id, payload);
        toast.success("Schedule updated");
      } else {
        await scheduleApi.createSchedule(payload);
        toast.success("Meeting scheduled");
      }
      setModalVisible(false);
      setEditingSchedule(null);
      fetchSchedules();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save schedule");
    }
  };

  return (
    <Dashboard>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Schedule</h1>
          <Button type="primary" onClick={() => setModalVisible(true)}>
            Add Meeting
          </Button>
        </div>

        <Spin spinning={loading}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.length === 0 ? (
              <p className="text-gray-500 col-span-full text-center">
                No meetings scheduled.
              </p>
            ) : (
              schedules.map((s) => (
                <div key={s._id} className="p-4 bg-white rounded-lg shadow-md">
                  <h3 className="font-semibold text-lg">{s.topic}</h3>
                  <p>
                    <strong>Mentee:</strong> {s.mentee.name} ({s.mentee.email})
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {moment(s.date).format("DD MMM YYYY")}
                  </p>
                  <p>
                    <strong>Time:</strong> {s.time}
                  </p>
                  <Badge
                    count={s.status}
                    className={`mt-2 ${
                      s.status === "pending"
                        ? "bg-yellow-400"
                        : s.status === "confirmed"
                        ? "bg-blue-500"
                        : s.status === "completed"
                        ? "bg-green-500"
                        : "bg-red-500"
                    } text-white px-2 py-1 rounded`}
                  />
                </div>
              ))
            )}
          </div>
        </Spin>

        <Modal
          title={editingSchedule ? "Edit Meeting" : "Add Meeting"}
          open={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingSchedule(null);
          }}
          footer={null}
        >
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item
              label="Mentee ID"
              name="mentee"
              rules={[{ required: true, message: "Enter mentee ID" }]}
            >
              <Input placeholder="Mentee ID" />
            </Form.Item>

            <Form.Item
              label="Topic"
              name="topic"
              rules={[{ required: true, message: "Enter meeting topic" }]}
            >
              <Input placeholder="Meeting Topic" />
            </Form.Item>

            <Form.Item
              label="Date"
              name="date"
              rules={[{ required: true, message: "Select date" }]}
            >
              <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item
              label="Time"
              name="time"
              rules={[{ required: true, message: "Select time" }]}
            >
              <TimePicker format="HH:mm" className="w-full" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                {editingSchedule ? "Update Meeting" : "Schedule Meeting"}
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Dashboard>
  );
};

export default Schedule;
