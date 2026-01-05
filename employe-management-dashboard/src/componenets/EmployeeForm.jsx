import { useEffect, useState } from "react";

const states = ["Telangana", "Karnataka", "Tamil Nadu", "Maharashtra"];

const EmployeeForm = ({ onSave, editingEmployee }) => {
  const [form, setForm] = useState({
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    image: ""
  });

  useEffect(() => {
    if (editingEmployee) setForm(editingEmployee);
  }, [editingEmployee]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => setForm({ ...form, image: reader.result });
    reader.readAsDataURL(file);
  };

  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.gender || !form.dob || !form.state) {
      alert("All fields are required");
      return;
    }

    onSave({ ...form, id: editingEmployee?.id || Date.now() });
    setForm({ name: "", gender: "", dob: "", state: "", active: true, image: "" });
  };

  return (
    <form onSubmit={submit}>
      <h3>{editingEmployee ? "Edit" : "Add"} Employee</h3>

      <input placeholder="Full Name" value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })} />

      <select value={form.gender}
        onChange={(e) => setForm({ ...form, gender: e.target.value })}>
        <option value="">Gender</option>
        <option>Male</option>
        <option>Female</option>
      </select>

      <input type="date" value={form.dob}
        onChange={(e) => setForm({ ...form, dob: e.target.value })} />

      <select value={form.state}
        onChange={(e) => setForm({ ...form, state: e.target.value })}>
        <option value="">Select State</option>
        {states.map((s) => <option key={s}>{s}</option>)}
      </select>

      <input type="file" accept="image/*" onChange={handleImage} />
      {form.image && <img src={form.image} width="60" />}

      <label>
        <input type="checkbox" checked={form.active}
          onChange={() => setForm({ ...form, active: !form.active })} />
        Active
      </label>

      <button type="submit">Save</button>
    </form>
  );
};

export default EmployeeForm;
