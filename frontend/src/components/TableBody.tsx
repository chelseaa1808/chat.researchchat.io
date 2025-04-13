import React from "react";
import TableRow from "./TableRow";

interface RowData {
  [key: string]: any;
  name: string; // used as key
}

interface TableBodyProps {
  headers: string[];
  tableData: RowData[];
  onRowClick: (rowData: RowData) => void;
}

const TableBody: React.FC<TableBodyProps> = ({ headers, tableData, onRowClick }) => {
  const tableRows = tableData.map((rowData) => (
    <TableRow
      key={rowData.name}
      headers={headers}
      rowData={rowData}
      onRowClick={onRowClick}
    />
  ));

  return <tbody>{tableRows}</tbody>;
};

export default TableBody;
