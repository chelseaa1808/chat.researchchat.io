import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../store";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

interface RegisterFormInputs {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

const UserRegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<RegisterFormInputs>();

  const [registerUser, result] = useRegisterMutation();
  const navigate = useNavigate();

  const submitForm = async (data: RegisterFormInputs) => {
    try {
      const res = await registerUser(data).unwrap();
      if (res) {
        navigate("/login"); // Redirect after success
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
        Create a New Account
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
            Email
          </label>
          <input
            type="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.email && (
            <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            type="password"
            {...register("password1", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password1 && (
            <p className="text-sm text-red-500 mt-1">{errors.password1.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("password2", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password1") || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.password2 && (
            <p className="text-sm text-red-500 mt-1">{errors.password2.message}</p>
          )}
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={result.isLoading}>
            {result.isLoading ? "Registering..." : "Register"}
          </Button>
        </div>

        {result.isError && (
          <p className="text-sm text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
      </form>
    </div>
  );
};

export default UserRegisterPage;
