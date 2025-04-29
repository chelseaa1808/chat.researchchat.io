import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../store";
import Button from "../components/Button";
import PathConstants from "@/routes/PathConstants";
import axios from "axios";

interface LoginFormInputs {
  username: string;
  password: string;
}

const UserLoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [loginUser, result] = useLoginMutation();
  const navigate = useNavigate();

  const submitForm = async (data: LoginFormInputs) => {
    try {
      const response = await loginUser(data).unwrap(); 
  
      navigate("/adminpanel/");
    } catch (error) {
      console.error("Login failed:", error);
      // Display error to user using state
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Login to Your Account
      </h1>

      <form
        onSubmit={handleSubmit(submitForm)}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md space-y-6"
      >
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            type="text"
            {...register("username", { required: "Username is required" })}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.username && (
            <p className="text-sm text-red-500 mt-1">{errors.username.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={result.isLoading}>
            {result.isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to={PathConstants.REGISTER}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Register here
          </Link>
        </p>

        {result.isError && (
          <p className="text-sm text-red-500">
            Invalid username or password. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default UserLoginPage;
