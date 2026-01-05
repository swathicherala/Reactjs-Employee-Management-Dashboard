import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../componenets/EmployeeForm"
import EmployeeTable from "../componenets/EmployeeTable";
import EmployeeFilters from "../componenets/EmployeeFilters"
import DashboardSummary from "../componenets/DashboardSummary"
import { getEmployees,saveEmployees } from "../utils/employeStorage"
import { logout } from "../utils/auth"

const Dashboard = () => {
  const navigate = useNavigate()
  const [employees, setEmployees] = useState(() => getEmployees())
  const [editingEmployee, setEditingEmployee] = useState(null)
    const [filters, setFilters] = useState({search: "", gender: "", status: ""})
    useEffect(() => {
        const storedEmployees = getEmployees()
        setEmployees(storedEmployees)
    }, [])

    useEffect(() => {
        saveEmployees(employees)
    }, [employees])

    const filteredEmployees = employees.filter((e) => {
        return (
            e.name.toLowerCase().includes(filters.search.toLowerCase()) &&
            (filters.gender ? e.gender === filters.gender : true)  &&
            (filters.status
                ? e.active === (filters.status === "active")
                : true
            )
        )
    })

  return (
     <div className="container">
      <div className="header">
        <h2>Employee Dashboard</h2>
        <button className="logout-btn" onClick={() => { logout(); navigate("/"); }}>
          Logout
        </button>
      </div>

      <DashboardSummary employees={employees} />

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

      <EmployeeFilters onFilter={setFilters} />

      <EmployeeTable
        employees={filteredEmployees}
        onEdit={setEditingEmployee}
        onDelete={(id) =>
          window.confirm("Delete employee?") &&
          setEmployees(employees.filter((e) => e.id !== id))
        }
      />
    </div>
  );
};

export default Dashboard;
