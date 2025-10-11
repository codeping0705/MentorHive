import React, { useState } from "react";
import { Table, Button, Space } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import Dashboard from "./Dashboard";

dayjs.extend(isSameOrAfter);

const Bookings = () => {
  const [filter, setFilter] = useState("upcoming");

  const bookings = [
    { key: "1", studentName: "Jane Doe", service: "Web Development", date: "2025-10-12", time: "10:00 AM", status: "Confirmed" },
    { key: "2", studentName: "Mark Smith", service: "UI/UX Design", date: "2025-09-28", time: "02:00 PM", status: "Completed" },
    { key: "3", studentName: "Anna Johnson", service: "React Tutoring", date: "2025-10-20", time: "11:00 AM", status: "Confirmed" },
    { key: "4", studentName: "Emily Davis", service: "Backend Tutoring", date: "2025-09-25", time: "01:00 PM", status: "Completed" },
  ];

  const today = dayjs();
  const upcomingBookings = bookings.filter((b) => dayjs(b.date).isSameOrAfter(today, "day"));
  const pastBookings = bookings.filter((b) => dayjs(b.date).isBefore(today, "day"));
  const filteredBookings = filter === "upcoming" ? upcomingBookings : pastBookings;

  const columns = [
    { title: "Student Name", dataIndex: "studentName", key: "studentName", responsive: ["sm"] },
    { title: "Service", dataIndex: "service", key: "service", responsive: ["sm"] },
    { title: "Date", dataIndex: "date", key: "date", render: (text) => dayjs(text).format("DD MMM YYYY") },
    { title: "Time", dataIndex: "time", key: "time", responsive: ["md"] },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <span
          className={`${
            status === "Confirmed" ? "text-green-600" : "text-gray-500"
          } font-medium`}
        >
          {status}
        </span>
      ),
    },
  ];

  return (
    <Dashboard>
      <div className="p-4 sm:p-6 md:p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 text-center sm:text-left">
          Bookings
        </h2>

        <div className="mb-4 flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center sm:justify-start">
          <Button
            type={filter === "upcoming" ? "primary" : "default"}
            className="w-full sm:w-auto"
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            type={filter === "past" ? "primary" : "default"}
            className="w-full sm:w-auto"
            onClick={() => setFilter("past")}
          >
            Past
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredBookings}
            pagination={{ pageSize: 5 }}
            rowClassName="hover:bg-gray-50 transition-all"
            scroll={{ x: "max-content" }}
          />
        </div>
      </div>
    </Dashboard>
  );
};

export default Bookings;
