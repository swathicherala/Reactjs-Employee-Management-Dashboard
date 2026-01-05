
const DashboardSummary = ({ employees }) => {
  const total = employees.length;
  const active = employees.filter((e) => e.active).length;

  return (
    <div className="summary">
      <p>Total Employees: <strong>{total}</strong></p>
      <p>Active: {active} | Inactive: {total - active}</p>
    </div>
  );
};

export default DashboardSummary;
