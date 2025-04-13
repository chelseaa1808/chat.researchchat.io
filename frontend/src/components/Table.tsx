import React from "react";
import TableBody from "./TableBody";
import TableHead from "./TableHead";

interface Header {
  key: string;
  name: string;
}

interface RowData {
  [key: string]: any;
}

interface TableProps {
  headers: Header[];
  tableData: RowData[];
  onRowClick: (rowData: RowData) => void;
}

const Table: React.FC<TableProps> = ({ headers = [], tableData = [], onRowClick }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <TableHead headers={headers} />
      <TableBody headers={headers} tableData={tableData} onRowClick={onRowClick} />
    </table>
  );
};

export default Table;
