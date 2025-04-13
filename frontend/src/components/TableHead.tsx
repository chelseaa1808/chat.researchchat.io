import React from "react";

interface Header {
  key: string;
  name: string;
}

interface TableHeadProps {
  headers: Header[];
}

const TableHead: React.FC<TableHeadProps> = ({ headers }) => {
  return (
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        {/* Optional: uncomment for bulk selection */}
        {/* 
        <th scope="col" className="p-4">
          <div className="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
          </div>
        </th> 
        */}
        {headers.map((header) => (
          <th key={header.key} scope="col" className="px-6 py-3">
            {header.name}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHead;
