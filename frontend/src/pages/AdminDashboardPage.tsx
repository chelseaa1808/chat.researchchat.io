import React, { useState } from "react";
import { useGetMessagesQuery } from "@/store/apis/chatApi";
import { useGetCurrentUserQuery } from "@/store/apis/authApi";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const AdminDashboardPage: React.FC = () => {
  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: messages } = useGetMessagesQuery();

  const [csvUrl] = useState("/api/export/conversations/csv/");
  const [xmlUrl] = useState("/api/export/conversations/xml/");

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
        Admin Dashboard
      </h1>

      <p className="text-gray-600 dark:text-gray-300 mb-8">
        View system exports, manage core data, and monitor usage.
      </p>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        <AdminCard title="Manage Bots" link="/adminpanel/bots" />
        <AdminCard title="Conversations" link="/adminpanel/conversations" />
        <AdminCard title="Chat Pages" link="/adminpanel/chatpages" />
        <AdminCard title="Conditions" link="/adminpanel/conditions" />
        <AdminCard title="User Profiles" link="/adminpanel/users" />
        <AdminCard title="Analytics Export" link="#analytics" />
      </div>

      {/* Analytics & Export Section */}
      <div id="analytics" className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border rounded shadow bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            Export Data
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Download full conversation logs.
          </p>
          <div className="flex flex-col space-y-2">
            <a
              href={csvUrl}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" /> Export CSV
            </a>
            <a
              href={xmlUrl}
              className="inline-flex items-center px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ArrowDownTrayIcon className="w-5 h-5 mr-2" /> Export XML
            </a>
          </div>
        </div>

        <div className="p-6 border rounded shadow bg-white dark:bg-gray-800">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            Usage Summary
          </h2>
          <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1">
            <li>
              Total Conversations:{" "}
              <strong>{messages?.length || 0}</strong>
            </li>
            <li>
              Logged-in Admin:{" "}
              <strong>{currentUser?.username || "N/A"}</strong>
            </li>
            <li>Export Routes: Active</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const AdminCard = ({ title, link }: { title: string; link: string }) => (
  <Link to={link}>
    <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
        Go to {title.toLowerCase()}
      </p>
    </div>
  </Link>
);

export default AdminDashboardPage;

