function EmployeeList({ employees, deleteEmployee }) {

    const getInitials = (name) => {
        if (!name) return "";
        const names = name.trim().split(" ");
        if (names.length === 1) return names[0].charAt(0).toUpperCase();
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    if (employees.length === 0) {
        return (
            <div className="list-container">
                <h2>Employees Directory</h2>
                <p>No employees found. Add some to get started!</p>
            </div>
        );
    }

    return (
        <div className="list-container">
            <h2>Employees Directory</h2>
            <div className="employee-grid">
                {employees.map((employee) => (
                    <div key={employee.id} className="employee-card">
                        <div className="employee-header">
                            <div className="employee-avatar">
                                {getInitials(employee.name)}
                            </div>
                            <div>
                                <h3 className="employee-name">{employee.name}</h3>
                                <div className="employee-role">{employee.role || "Employee"}</div>
                            </div>
                        </div>
                        <div className="employee-info">
                            
                            <div className="employee-details">
                                <p>Department: <span>{employee.department}</span></p>
                                <p>Salary: <span>₹{employee.salary}</span></p>
                            </div>
                        </div>
                        <button 
                            className="delete-btn" 
                            onClick={() => deleteEmployee(employee.id)}
                        >
                            Delete
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EmployeeList;