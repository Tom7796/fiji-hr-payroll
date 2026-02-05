import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

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

  const [companyProfile, setCompanyProfile] = useState(null);
  const [customDeductions, setCustomDeductions] = useState([]);

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem('payslips', JSON.stringify(payslips));
  }, [payslips]);

  useEffect(() => {
    fetchCompanyProfile();
    fetchCustomDeductions();
  }, []);

  const fetchCompanyProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data, error } = await supabase
      .from('company_profiles')
      .select('*')
      .eq('user_id', user.id)
      .single();
    if (data) setCompanyProfile(data);
  };

  const fetchCustomDeductions = async () => {
    const { data, error } = await supabase
      .from('custom_deductions')
      .select('*');
    if (data) setCustomDeductions(data);
  };

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
      addPayslip,
      companyProfile,
      setCompanyProfile,
      fetchCompanyProfile,
      customDeductions,
      setCustomDeductions,
      fetchCustomDeductions
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
