import { useState, useMemo, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import type { FormValues } from "@/util/types";

ModuleRegistry.registerModules([AllCommunityModule]);


const myTheme = themeQuartz.withParams({
  headerTextColor: "white",
  headerBackgroundColor: "#269fe8",
});

const ShowEmployees = () => {
  const Navigate = useNavigate();

  const [employees, setEmployees] = useState<FormValues[]>([]);
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("employees") || "[]");
    setEmployees(stored);
  }, []);

  const columns = useMemo(
    () => [
      { headerName: "Name", field: "name" },
      { headerName: "Email", field: "email" },
      { headerName: "Phone", field: "phone" },
      { headerName: "Role", field: "role" },
      { headerName: "Joining Date", field: "joiningDate" },
    ],
    []
  );

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white rounded-2xl w-full min-h-screen">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center uppercase">
            <span className="bg-[#269fe8] px-2 text-white rounded">
              Employee
            </span>{" "}
            List
          </h2>

          <Button
            onClick={() => Navigate("/")}
            className="bg-[#269fe8] px-4 py-2 text-white rounded-lg shadow hover:bg-[#148ed1] transition-all flex items-center gap-2"
          >
            <FaPlus />
            Add Employee
          </Button>
        </div>

        <div className="ag-theme-alpine" style={{ width: "100%" }}>
          <AgGridReact
            rowData={employees}
            columnDefs={columns}
            defaultColDef={{
              flex: 1,
              minWidth: 100,
              sortable: true,
              filter: true,
              resizable: true,
            }}
            domLayout="autoHeight"
            theme={myTheme}
          />
        </div>
      </div>
    </div>
  );
};

export default ShowEmployees;
