import React, { useState } from "react";
import { Table, Button, Space } from "antd";
import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import Dashboard from "./Dashboard"; // Adjust the path to your Dashboard layout

dayjs.extend(isSameOrAfter);

const Bookings = () => {
  const [filter, setFilter] = useState("upcoming"); // "upcoming" or "past"

  // Sample bookings data
  const bookings = [
    {
      key: "1",
      studentName: "Jane Doe",
      service: "Web Development",
      date: "2025-10-12",
      time: "10:00 AM",
      status: "Confirmed",
    },
    {
      key: "2",
      studentName: "Mark Smith",
      service: "UI/UX Design",
      date: "2025-09-28",
      time: "02:00 PM",
      status: "Completed",
    },
    {
      key: "3",
      studentName: "Anna Johnson",
      service: "React Tutoring",
      date: "2025-10-20",
      time: "11:00 AM",
      status: "Confirmed",
    },
    {
      key: "4",
      studentName: "Emily Davis",
      service: "Backend Tutoring",
      date: "2025-09-25",
      time: "01:00 PM",
      status: "Completed",
    },
  ];

  const today = dayjs();

  const upcomingBookings = bookings.filter((b) =>
    dayjs(b.date).isSameOrAfter(today, "day")
  );

  const pastBookings = bookings.filter((b) =>
    dayjs(b.date).isBefore(today, "day")
  );

  const filteredBookings = filter === "upcoming" ? upcomingBookings : pastBookings;

  const columns = [
    {
      title: "Student Name",
      dataIndex: "studentName",
      key: "studentName",
    },
    {
      title: "Service",
      dataIndex: "service",
      key: "service",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text) => dayjs(text).format("DD MMM YYYY"),
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
    },
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
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bookings</h2>

        <div className="mb-4 flex gap-4">
          <Button
            type={filter === "upcoming" ? "primary" : "default"}
            onClick={() => setFilter("upcoming")}
          >
            Upcoming
          </Button>
          <Button
            type={filter === "past" ? "primary" : "default"}
            onClick={() => setFilter("past")}
          >
            Past
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={filteredBookings}
          pagination={{ pageSize: 5 }}
          rowClassName="hover:bg-gray-100 transition-all"
        />
      </div>
    </Dashboard>
  );
};

export default Bookings;
