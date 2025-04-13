import Table from "./Table";
import { useNavigate, useLocation } from "react-router-dom";

interface RowData {
  uuid: string;
  [key: string]: any;
}

interface ConversationTableProps {
  headers: string[];
  tableData: RowData[];
}

const ConversationTable = ({ headers, tableData }: ConversationTableProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const chatHistoryRedirect = (rowData: RowData) => {
    navigate(`${pathname}/${rowData.uuid}`);
  };

  return <Table headers={headers} tableData={tableData} onRowClick={chatHistoryRedirect} />;
};

export default ConversationTable;
