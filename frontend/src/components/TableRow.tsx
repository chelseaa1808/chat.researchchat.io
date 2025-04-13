import React from "react";
import CircleXIcon from "./CircleXIcon";
import CircleCheckIcon from "./CircleCheckIcon";

interface Header {
  key: string;
  name: string;
}

interface RowData {
  [key: string]: any;
}

interface TableRowProps {
  headers: Header[];
  rowData: RowData;
  onRowClick: (rowData: RowData) => void;
}

const TableRow: React.FC<TableRowProps> = ({ headers, rowData, onRowClick }) => {
  const tdList = headers.map((header) => {
    const value = rowData[header.key];
    let cellContent: React.ReactNode;

    if (typeof value === "boolean") {
      cellContent = value ? <CircleCheckIcon /> : <CircleXIcon />;
    } else if (typeof value === "string" && !isNaN(Date.parse(value))) {
      // Checks if value is a valid ISO timestamp or parseable date
      cellContent = new Date(value).toLocaleString();
    } else {
      cellContent = value;
    }

    return (
      <td key={header.key} scope="row" className="px-6 py-4">
        {cellContent}
      </td>
    );
  });

  return (
    <tr
      onClick={() => onRowClick(rowData)}
      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
    >
      {/* Optional: bulk checkbox column */}
      {/* 
      <td className="w-4 p-4">
        <div className="flex items-center">
          <input
            id={`checkbox-${rowData.uuid || rowData.id}`}
            type="checkbox"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor={`checkbox-${rowData.uuid || rowData.id}`} className="sr-only">Select row</label>
        </div>
      </td>
      */}
      {tdList}
    </tr>
  );
};

export default TableRow;
