import React, { useState } from "react";
import { Table, Button, Input, Space } from "antd";
import { AiOutlineDollarCircle } from "react-icons/ai";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import Dashboard from "../dashboard/Dashboard"; // make sure this matches the file
import * as XLSX from "xlsx";

const Payment = () => {
  const paymentHistory = [
    { key: "1", no: "1", studentName: "Jane Doe", transactionId: "TXN12345", date: "2024-10-15", amount: 50, status: "Completed" },
    { key: "2", no: "2", studentName: "Mark Smith", transactionId: "TXN67890", date: "2024-10-10", amount: 75, status: "Completed" },
    { key: "3", no: "3", studentName: "Anna Johnson", transactionId: "TXN24680", date: "2024-09-30", amount: 100, status: "Completed" },
    { key: "4", no: "4", studentName: "Emily Davis", transactionId: "TXN13579", date: "2024-09-25", amount: 60, status: "Completed" },
    { key: "5", no: "5", studentName: "Michael Brown", transactionId: "TXN86420", date: "2024-09-20", amount: 85, status: "Completed" },
  ];

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = paymentHistory.filter(payment =>
    payment.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "No.", dataIndex: "no", key: "no", sorter: (a, b) => a.no - b.no, render: text => <strong>{text}</strong> },
    { title: "Student Name", dataIndex: "studentName", key: "studentName", sorter: (a, b) => a.studentName.localeCompare(b.studentName) },
    { title: "Transaction ID", dataIndex: "transactionId", key: "transactionId" },
    { title: "Date", dataIndex: "date", key: "date", sorter: (a, b) => new Date(a.date) - new Date(b.date) },
    {
      title: "Amount (₹)",
      dataIndex: "amount",
      key: "amount",
      render: amount => <span className="text-orange-600 font-semibold">₹{amount}</span>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: status => (
        <span className={status === "Completed" ? "text-green-500 font-semibold" : "text-red-500 font-semibold"}>
          {status}
        </span>
      ),
    },
  ];

  const exportToExcel = () => {
    const exportData = filteredData.map(item => ({
      "No.": item.no,
      "Student Name": item.studentName,
      "Transaction ID": item.transactionId,
      Date: item.date,
      Amount: item.amount,
      Status: item.status,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Payment History");
    XLSX.writeFile(wb, "Payment_History.xlsx");
  };

  return (
    <Dashboard>
      <div className="p-4 sm:p-6 md:p-8 bg-white rounded-xl shadow-lg max-w-full mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4">
          <div className="flex items-center mb-3 sm:mb-0">
            <MdOutlineCurrencyRupee className="mr-2 text-3xl text-orange-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-orange-600">Payment History</h2>
          </div>
          {/* Search */}
          <Input
            placeholder="Search by Student Name"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            allowClear
            className="w-full sm:w-64 mb-2 sm:mb-0"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 3, showSizeChanger: true, pageSizeOptions: ["3", "5", "10"] }}
            rowClassName="hover:bg-orange-50 transition-all"
            bordered
            className="min-w-[600px] md:min-w-full"
          />
        </div>

        {/* Export Button */}
        <div className="mt-4 flex justify-end">
          <Button
            type="primary"
            icon={<AiOutlineDollarCircle />}
            className="bg-orange-600 hover:bg-orange-700 text-white flex items-center"
            onClick={exportToExcel}
          >
            Export Payment History
          </Button>
        </div>
      </div>
    </Dashboard>
  );
};

export default Payment;
