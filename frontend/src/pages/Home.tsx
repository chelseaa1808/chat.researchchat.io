import React from "react";
import { Link } from "react-router-dom";
import PathConstants from "@/routes/PathConstants";

const Home: React.FC = () => {
  return (
    <div className="relative max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to ResearchChat
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        This platform supports Human-Computer Interaction (HCI) research by enabling structured, collaborative conversations between users and AI agents.
      </p>
      <p className="text-md text-gray-500 dark:text-gray-400 mb-10">
        Whether you're conducting behavior studies, prototyping new interfaces, or analyzing user interactions, ResearchChat provides the tools to build, deploy, and review AI-driven dialogues.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Link
          to={PathConstants.ADMIN_DASHBOARD}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          Admin Dashboard
        </Link>
        <Link
          to={PathConstants.ABOUT}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 font-medium rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
        >
          Learn More
        </Link>
      </div>
    </div>
  );
};

export default Home;


