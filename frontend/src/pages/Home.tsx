import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PathConstants from "@/routes/PathConstants";
import type { RootState } from "@/store";

const Home: React.FC = () => {
  const key = useSelector((state: RootState) => state.auth.key);

  return (
    <div className="relative max-w-6xl mx-auto px-6 py-12">
      {/* Top-right Auth Links — show only if not logged in */}
      {!key && (
        <div className="absolute top-6 right-6 flex gap-4">
          <Link
            to={PathConstants.LOGIN}
            className="text-sm font-medium text-gray-600 dark:text-gray-200 hover:underline"
          >
            Log In
          </Link>
          <Link
            to={PathConstants.REGISTER}
            className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </div>
      )}

      {/* Main Heading */}
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        Welcome to ResearchChat
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
        This platform supports Human-Computer Interaction (HCI) research by enabling structured, collaborative conversations between users and AI agents.
      </p>
      <p className="text-md text-gray-500 dark:text-gray-400 mb-10">
        Whether you're conducting behavior studies, prototyping new interfaces, or analyzing user interactions, ResearchChat provides the tools to build, deploy, and review AI-driven dialogues.
      </p>

      {/* Main CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Link
          to={PathConstants.BOT_PAGE}
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          View Bots
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
