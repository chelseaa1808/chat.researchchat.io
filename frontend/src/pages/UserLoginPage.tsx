import React from "react";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../store";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface LoginFormInputs {
  username: string;
  password: string;
}

const UserLoginPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>();
  const [login, result] = useLoginMutation();
  const navigate = useNavigate();

  const submitForm = async (data: LoginFormInputs) => {
    try {
      const res = await login(data).unwrap();
      if (res) {
        navigate("/"); // Redirect after successful login
      }
    } catch (err) {
      console.error("Login failed", err);
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
