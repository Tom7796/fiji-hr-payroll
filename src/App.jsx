import React, { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import AdminDeductions from './pages/AdminDeductions';
import Payroll from './pages/Payroll';
import Payslips from './pages/Payslips';

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <Employees />;
      case 'deductions': return <AdminDeductions />;
      case 'payroll': return <Payroll />;
      case 'payslips': return <Payslips />;
      default: return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <ProtectedRoute>
        <AppProvider>
          <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <main className="main-content" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
              <div className="animate-fade-in">
                {renderPage()}
              </div>
            </main>
          </div>
        </AppProvider>
      </ProtectedRoute>
    </AuthProvider>
  );
}

export default App;
