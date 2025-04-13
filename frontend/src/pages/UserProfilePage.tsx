import React from "react";
import { useGetCurrentUserQuery } from "../store/apis/authApi";

const UserProfilePage: React.FC = () => {
  const { data: user, isLoading, error } = useGetCurrentUserQuery();

  if (isLoading) return <p>Loading profile...</p>;
  if (error) return <p>Error loading profile.</p>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Your Profile</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Username</h2>
          <p className="text-gray-600 dark:text-gray-400">{user?.username || "N/A"}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Email</h2>
          <p className="text-gray-600 dark:text-gray-400">{user?.email || "N/A"}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Institution</h2>
          <p className="text-gray-600 dark:text-gray-400">{user?.institution || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
