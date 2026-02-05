import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { AppProvider } from './context/AppContext';
import ProtectedRoute from './components/ProtectedRoute';
import LandingPage from './pages/LandingPage';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import AdminDeductions from './pages/AdminDeductions';
import Payroll from './pages/Payroll';
import Payslips from './pages/Payslips';
import Settings from './pages/Settings';
import EmployeePortal from './pages/EmployeePortal';
import { useAuth } from './context/AuthContext';

function App() {
  const { role } = useAuth();

  const renderPage = () => {
    if (currentPage === 'landing') {
      const targetDashboard = role === 'admin' ? 'dashboard' : 'employee-portal';
      return <LandingPage onGetStarted={() => setCurrentPage(targetDashboard)} />;
    }

    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'employees': return <Employees />;
      case 'deductions': return <AdminDeductions />;
      case 'payroll': return <Payroll />;
      case 'payslips': return <Payslips />;
      case 'settings': return <Settings />;
      case 'employee-portal': return <EmployeePortal />;
      default: return <Dashboard />;
    }
  };

  return (
    <AuthProvider>
      <AppProvider>
        {currentPage === 'landing' ? (
          <div className="animate-fade-in">{renderPage()}</div>
        ) : (
          <ProtectedRoute>
            <div className="app-container" style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-main)' }}>
              <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
              <main className="main-content" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                <div className="animate-fade-in">
                  {renderPage()}
                </div>
              </main>
            </div>
          </ProtectedRoute>
        )}
      </AppProvider>
    </AuthProvider>
  );
}

export default App;
