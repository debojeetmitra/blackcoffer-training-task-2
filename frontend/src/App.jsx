import { useEffect, useState } from "react";
import api from "./services/api";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import "./App.css";

function App() {

  const [employees, setEmployees] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
      showToast("Failed to fetch employees", "error");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await api.delete(`/employees/${id}`);
      await fetchEmployees();
      showToast("Employee deleted successfully", "success");
    } catch (error) {
      console.error(error);
      showToast("Failed to delete employee", "error");
    }
  }

  return (
    <div className="app-container">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Employee Management Dashboard</h1>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>
      </header>

      <div className="dashboard-summary">
        <h2>Total Employees</h2>
        <div className="total-count">{employees.length}</div>
      </div>

      <main className="main-content">
        <aside>
          <EmployeeForm fetchEmployees={fetchEmployees} showToast={showToast} />
        </aside>
        <section>
          <EmployeeList
            employees={employees}
            deleteEmployee={deleteEmployee}
          />
        </section>
      </main>

      <div className={`toast ${toast.show ? 'show' : ''} toast-${toast.type}`}>
        {toast.message}
      </div>
    </div>
  );
}

export default App;