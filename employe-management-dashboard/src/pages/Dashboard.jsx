import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import EmployeeForm from '../componenets/EmployeeForm'
import { logout } from "../utils/auth"

const Dashboard = () => {
  const navigate = useNavigate()
  const [editingEmployee, setEditingEmployee] = useState(null)

  return (
     <div className="container">
      <div className="header">
        <h2>Employee Dashboard</h2>
        <button className="logout-btn" onClick={() => { logout(); navigate("/"); }}>
          Logout
        </button>
      </div>

      <EmployeeForm
        editingEmployee={editingEmployee}
        onSave={(emp) => {
          if (editingEmployee) {
            setEmployees(employees.map((e) => (e.id === emp.id ? emp : e)));
            setEditingEmployee(null);
          } else {
            setEmployees([...employees, emp]);
          }
        }}
      />
    </div>
  );
};

export default Dashboard;
