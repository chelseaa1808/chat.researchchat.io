import React from "react";

interface TableDropDownProps {
  onSelect?: (value: string) => void;
  options?: string[];
  destructiveOption?: string;
}

const TableDropDown: React.FC<TableDropDownProps> = ({
  onSelect = () => {},
  options = ["Reward", "Activate account"],
  destructiveOption = "Delete User",
}) => {
  return (
    <div
      id="dropdownAction"
      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
    >
      <ul
        className="py-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownActionButton"
      >
        {options.map((option) => (
          <li key={option}>
            <button
              onClick={() => onSelect(option)}
              className="w-full text-left block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      {destructiveOption && (
        <div className="py-1">
          <button
            onClick={() => onSelect(destructiveOption)}
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            {destructiveOption}
          </button>
        </div>
      )}
    </div>
  );
};

export default TableDropDown;
