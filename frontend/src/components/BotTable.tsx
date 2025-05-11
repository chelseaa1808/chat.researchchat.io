import Table from "./Table";
import { useNavigate, useLocation } from "react-router-dom";
import React from "react";

type BotData = {
  name: string;
  [key: string]: any; // Add more specific fields as needed
};
interface Header {
  key: string;
  name: string;
}
interface BotTableProps {
  headers: Header[];
  tableData: BotData[];
}

const BotTable: React.FC<BotTableProps> = ({ headers, tableData }) => {
  const navigate = useNavigate();
  const pathname = useLocation();

  const conversationsRedirect = (rowData: BotData) => {
    navigate(`${pathname.pathname}/${rowData.name}`);
  };

  return (
    <>
      <Table headers={headers} tableData={tableData} onRowClick={conversationsRedirect} />
    </>
  );
};

export default BotTable;
