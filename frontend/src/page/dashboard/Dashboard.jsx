import React, { useState } from "react";
import Sidebar from "../../components/Sidebar";
import DashboardNavbar from "../../components/DashboardNavbar";

const Dashboard = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <DashboardNavbar onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />

      <div className="flex flex-1 relative overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`fixed md:static top-5 left-0 h-full w-64 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out rounded-r-2xl ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <Sidebar />
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          <div className="rounded-2xl shadow-lg p-6 transition-all duration-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
