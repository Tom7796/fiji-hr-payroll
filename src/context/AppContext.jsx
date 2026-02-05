import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [employees, setEmployees] = useState(() => {
    const saved = localStorage.getItem('employees');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Senior Developer', salary: 85000, taxRate: 20, status: 'Active' },
      { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'UI/UX Designer', salary: 75000, taxRate: 18, status: 'Active' },
    ];
  });

  const [payslips, setPayslips] = useState(() => {
    const saved = localStorage.getItem('payslips');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('payslips', JSON.stringify(payslips));
  }, [payslips]);

  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now().toString() }]);
  };

  const updateEmployee = (id, updatedEmployee) => {
    setEmployees(employees.map(emp => emp.id === id ? { ...updatedEmployee, id } : emp));
  };

  const deleteEmployee = (id) => {
    setEmployees(employees.filter(emp => emp.id !== id));
  };

  const addPayslip = (payslip) => {
    setPayslips([...payslips, { ...payslip, id: Date.now().toString(), generatedAt: new Date().toISOString() }]);
  };

  return (
    <AppContext.Provider value={{ 
      employees, 
      addEmployee, 
      updateEmployee, 
      deleteEmployee,
      payslips,
      addPayslip
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
