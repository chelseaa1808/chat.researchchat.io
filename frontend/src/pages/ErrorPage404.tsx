import React from "react";
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const ErrorPage404: React.FC = () => {
  const error = useRouteError();

  let title = "Something went wrong.";
  let message = "An unexpected error occurred. Please try again later.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "404 - Page Not Found";
      message = "We couldn't find the page you're looking for.";
    } else {
      title = `${error.status} - ${error.statusText}`;
      message = error.data || message;
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12 bg-gray-100 dark:bg-gray-900 text-center">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
        {title}
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
      <Link
        to="/"
        className="inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default ErrorPage404;
