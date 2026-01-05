import React, { useRef, useState, useEffect } from "react"
import { useReactToPrint } from "react-to-print"
import "../styles/employeeTable.css";

// Printable component
const EmployeePrint = React.forwardRef(({ employee }, ref) => {
  return (
    <div ref={ref} className="print-user">
      {employee ? (
        <>
          <h2>Employee Details</h2>
          {employee.image && <img src={employee.image} alt="profile" width="100" />}
          <p><strong>ID:</strong> {employee.id}</p>
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Gender:</strong> {employee.gender}</p>
          <p><strong>DOB:</strong> {employee.dob}</p>
          <p><strong>State:</strong> {employee.state}</p>
          <p><strong>Status:</strong> {employee.active ? "Active" : "Inactive"}</p>
        </>
      ) : (
        <p>No employee selected</p>
      )}
    </div>
  );
});

// Table component
const EmployeeTable = ({ employees, onEdit, onDelete }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const componentRef = useRef();

  
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    pageStyle: `
      @page { size: auto; margin: 20mm; }
      body { font-family: Arial, sans-serif; }
      .print-user { padding: 20px; border: 1px solid #ccc; border-radius: 8px; }
      h2 { text-align: center; margin-bottom: 20px; }
      img { display: block; margin: 0 auto 15px; }
    `,
  })

  useEffect(() => {
    if (selectedEmployee) {
      handlePrint();
    }
  }, [selectedEmployee]);

  return (
    <div>
      <table className="employee-table">
        <thead className="table-head">
          <tr className="table-row">
            <th className="th-id">ID</th>
            <th className="th-image">Image</th>
            <th className="th-name">Name</th>
            <th className="th-gender">Gender</th>
            <th className="th-dob">DOB</th>
            <th className="th-state">State</th>
            <th className="th-status">Status</th>
            <th className="th-actions">Actions</th>
          </tr>
        </thead>
        <tbody className="table-body">
          {employees.map((e) => (
            <tr className="table-row" key={e.id}>
              <td className="td-id">{e.id}</td>
              <td className="td-image">{e.image && <img src={e.image} alt="profile" />}</td>
              <td className="td-name">{e.name}</td>
              <td className="td-gender">{e.gender}</td>
              <td className="td-dob">{e.dob}</td>
              <td className="td-state">{e.state}</td>
              <td className={`td-status ${e.active ? "status-active" : "status-inactive"}`}>
                {e.active ? "Active" : "Inactive"}
              </td>
              <td className="td-actions">
                <div className="table-actions">
                  <button className="edit-btn" onClick={() => onEdit(e)}>Edit</button>
                  <button className="delete-btn" onClick={() => onDelete(e.id)}>Delete</button>
                  <button
                    className="print-btn"
                    onClick={() => setSelectedEmployee(e)}
                  >
                    Print
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <EmployeePrint ref={componentRef} employee={selectedEmployee} />
      </div>
    </div>
  );
};

export default EmployeeTable;
