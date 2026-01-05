const EmployeePrint = ({ employee }) => {
  if (!employee) return null;

  return (
    <div className="print-user">
      <h2>Employee Details</h2>
      {employee.image && <img src={employee.image} alt="profile" width="100" />}
      <p><strong>ID:</strong> {employee.id}</p>
      <p><strong>Name:</strong> {employee.name}</p>
      <p><strong>Gender:</strong> {employee.gender}</p>
      <p><strong>DOB:</strong> {employee.dob}</p>
      <p><strong>State:</strong> {employee.state}</p>
      <p><strong>Status:</strong> {employee.active ? "Active" : "Inactive"}</p>
    </div>
  );
};

export default EmployeePrint;
