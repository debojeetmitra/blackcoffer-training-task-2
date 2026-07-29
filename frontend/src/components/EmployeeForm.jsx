import { useState } from "react";
import api from "../services/api";

function EmployeeForm({ fetchEmployees, showToast }) {

    const [formData, setFormData] = useState({
        name: "",
        role: "",
        department: "",
        salary: "",
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await api.post("/employees", formData);
            await fetchEmployees();
            showToast("Employee added successfully", "success");
            setFormData({
                name: "",
                role: "",
                department: "",
                salary: ""
            });
        } catch (error) {
            console.error(error);
            showToast("Failed to add employee", "error");
        }
    }

    return (
        <div className="form-container">
            <h2>Add Employee</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        name="name"
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input
                        id="role"
                        type="text"
                        name="role"
                        placeholder="e.g. Software Engineer"
                        value={formData.role}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="department">Department</label>
                    <input
                        id="department"
                        type="text"
                        name="department"
                        placeholder="e.g. Engineering"
                        value={formData.department}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="salary">Salary (₹)</label>
                    <input
                        id="salary"
                        type="number"
                        name="salary"
                        placeholder="e.g. 50000"
                        value={formData.salary}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-btn">Add Employee</button>
            </form>
        </div>
    )
}

export default EmployeeForm;