import React from "react";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "../store/apis/authApi"; // RTK hook
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import PathConstants from "@/routes/PathConstants";
import axios from "axios";

interface RegisterFormInputs {
  username: string;
  email: string;
  password: string;
  re_password: string;
}

const UserRegisterPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormInputs>();

  const [registerUser, { isLoading, isError, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const submitForm = async (data: RegisterFormInputs) => {
    console.log("Registering with data:", data);

    try {
      try {
        const result = await registerUser({
          username: data.username,
          email: data.email,
          password1: data.password,
          password2: data.re_password,
        }).unwrap();
  
      // Redirect after registration
        navigate(PathConstants.LOGIN);
      }
    } catch (err: any) {
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
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
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
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
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
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          {errors.password && (
            <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Confirm Password
          </label>
          <input
            type="password"
            {...register("re_password", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full px-4 py-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-white"
          />
          {errors.re_password && (
            <p className="text-sm text-red-500 mt-1">{errors.re_password.message}</p>
          )}
        </div>

        <div className="pt-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </div>

        <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to={PathConstants.LOGIN}
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Login here
          </Link>
        </p>

        {isError && (
          <p className="text-sm text-red-500">
            {(error as any)?.data?.email?.[0] ||
              (error as any)?.data?.non_field_errors?.[0] ||
              "Something went wrong. Please try again."}
          </p>
        )}
      </form>
    </div>
  );
};

export default UserRegisterPage;
