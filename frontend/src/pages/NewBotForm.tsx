import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NewBotForm: React.FC = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    display_name: "",
    system_message: "",
    model_key: "",
    model: "OpenAI - gpt-4o-mini",
    bot_initiates: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const result = await addBot(form).unwrap();
    console.log("Bot created:", result);
    navigate("/bots");
  } catch (err) {
    console.error("Failed to create bot:", err);
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-2xl bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
        <button
          onClick={() => navigate("/bots")}
          className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white text-2xl"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-1">New Bot</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Use this form to manage bot records in your database.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <input
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Display Name */}
          <div>
            <label htmlFor="display_name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Display name
            </label>
            <input
              id="display_name"
              name="display_name"
              value={form.display_name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* System Message */}
          <div>
            <label htmlFor="system_message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              System message
            </label>
            <textarea
              id="system_message"
              name="system_message"
              value={form.system_message}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Model & API Key */}
          <div>
            <label htmlFor="model_key" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Model & API Key
            </label>
            <input
              id="model_key"
              name="model_key"
              value={form.model_key}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
            />
          </div>

          {/* Model Dropdown */}
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Model
            </label>
            <select
              id="model"
              name="model"
              value={form.model}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100"
            >
              <option value="OpenAI - gpt-4o-mini">OpenAI – gpt-4o-mini</option>
              <option value="OpenAI – gpt-3.5-turbo">OpenAI – gpt-3.5-turbo</option>
              {/* Add more as needed */}
            </select>
          </div>

          {/* Bot Initiates Checkbox */}
          <div className="flex items-center">
            <input
              id="bot_initiates"
              name="bot_initiates"
              type="checkbox"
              checked={form.bot_initiates}
              onChange={handleChange}
              className="h-4 w-4 text-black border-gray-300 rounded"
            />
            <label htmlFor="bot_initiates" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
              Bot initiates
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded hover:opacity-90 w-full sm:w-auto"
            >
              Save Bot
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewBotForm;
