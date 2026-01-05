const EmployeeFilters = ({ onFilter }) => {
  return (
    <div className="filters">
      <input placeholder="Search by name"
        onChange={(e) => onFilter(f => ({ ...f, search: e.target.value }))} />

      <select onChange={(e) => onFilter(f => ({ ...f, gender: e.target.value }))}>
        <option value="">All Genders</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <select onChange={(e) => onFilter(f => ({ ...f, status: e.target.value }))}>
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
};

export default EmployeeFilters;
