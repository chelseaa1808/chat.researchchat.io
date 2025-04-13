import React from "react";
import { useGetUserQuery } from "../store";

const UserProfilePage: React.FC = () => {
  const { data: user, isLoading, isError } = useGetUserQuery(undefined);

  if (isLoading) {
    return <div className="text-center py-10 text-gray-500">Loading...</div>;
  }

  if (isError || !user) {
    return <div className="text-center py-10 text-red-500">Failed to load profile.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        Your Profile
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Username</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.username || "N/A"}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Email</h2>
          <p className="text-gray-600 dark:text-gray-400">{user.email || "N/A"}</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
