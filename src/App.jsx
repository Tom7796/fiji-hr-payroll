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

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />;
      case 'dashboard': return <Dashboard />;
      case 'employees': return <Employees />;
      case 'deductions': return <AdminDeductions />;
      case 'payroll': return <Payroll />;
      case 'payslips': return <Payslips />;
      default: return <LandingPage onGetStarted={() => setCurrentPage('dashboard')} />;
    }
  };

  return (
    <AuthProvider>
      <AppProvider>
        {currentPage === 'landing' ? (
          <div className="animate-fade-in">{renderPage()}</div>
        ) : (
          <ProtectedRoute>
            <div className="app-container" style={{ display: 'flex', minHeight: '100vh' }}>
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
