import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { FileText, Clock, Wallet, Info } from 'lucide-react';

const EmployeePortal = () => {
    const { user } = useAuth();
    const [employeeData, setEmployeeData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmployeeData = async () => {
            if (!user) return;
            try {
                const { data, error } = await supabase
                    .from('employees')
                    .select('*')
                    .eq('email', user.email)
                    .single();

                if (error) throw error;
                setEmployeeData(data);
            } catch (err) {
                console.error('Error fetching employee data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchEmployeeData();
    }, [user]);

    if (loading) return <div>Loading portal...</div>;
    if (!employeeData) return <div>Employee record not found. Please contact admin.</div>;

    return (
        <div className="employee-portal">
            <header style={{ marginBottom: '30px' }}>
                <h1 style={{ fontSize: '28px', color: 'var(--text-primary)' }}>Welcome back, {employeeData.full_name}</h1>
                <p style={{ color: 'var(--text-muted)' }}>{employeeData.position} • {employeeData.department}</p>
            </header>

            <div className="portal-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px'
            }}>
                {/* Profile Snapshot */}
                <div className="card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ padding: '10px', background: 'var(--primary-glow)', borderRadius: '12px', marginRight: '15px' }}>
                            <Info size={24} color="var(--primary)" />
                        </div>
                        <h3 style={{ margin: 0 }}>My Profile</h3>
                    </div>
                    <div style={{ display: 'grid', gap: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Employee ID</span>
                            <span style={{ fontWeight: '600' }}>{employeeData.fnpf_number ? `EMP-${employeeData.fnpf_number.slice(-4)}` : 'N/A'}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>TIN Number</span>
                            <span style={{ fontWeight: '600' }}>{employeeData.tin_number}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: 'var(--text-muted)' }}>FNPF Number</span>
                            <span style={{ fontWeight: '600' }}>{employeeData.fnpf_number}</span>
                        </div>
                    </div>
                </div>

                {/* Payroll Summary */}
                <div className="card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ padding: '10px', background: '#e0f2fe', borderRadius: '12px', marginRight: '15px' }}>
                            <Wallet size={24} color="#0369a1" />
                        </div>
                        <h3 style={{ margin: 0 }}>Current Salary</h3>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '10px' }}>
                        <span style={{ fontSize: '32px', fontWeight: '800', color: 'var(--primary)' }}>${employeeData.base_salary.toLocaleString()}</span>
                        <span style={{ color: 'var(--text-muted)' }}>per annum</span>
                    </div>
                    <button style={{
                        marginTop: '20px',
                        width: '100%',
                        padding: '12px',
                        background: 'var(--primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        View Recent Payslip
                    </button>
                </div>

                {/* Leave Balance (Placeholders for now) */}
                <div className="card" style={{ padding: '24px', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <div style={{ padding: '10px', background: '#fef3c7', borderRadius: '12px', marginRight: '15px' }}>
                            <Clock size={24} color="#b45309" />
                        </div>
                        <h3 style={{ margin: 0 }}>Leave Balance</h3>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                        <div style={{ textAlign: 'center', padding: '15px', background: '#fffbeb', borderRadius: '12px' }}>
                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#b45309' }}>12</div>
                            <div style={{ fontSize: '12px', color: '#b45309' }}>Annual Leave</div>
                        </div>
                        <div style={{ textAlign: 'center', padding: '15px', background: '#f0f9ff', borderRadius: '12px' }}>
                            <div style={{ fontSize: '20px', fontWeight: '700', color: '#0369a1' }}>5</div>
                            <div style={{ fontSize: '12px', color: '#0369a1' }}>Sick Leave</div>
                        </div>
                    </div>
                    <button style={{
                        marginTop: '20px',
                        width: '100%',
                        padding: '12px',
                        background: 'transparent',
                        color: 'var(--primary)',
                        border: '2px solid var(--primary)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600',
                        cursor: 'pointer'
                    }}>
                        Apply for Leave
                    </button>
                </div>
            </div>

            {/* Quick Actions / Recent Documents */}
            <div style={{ marginTop: '40px' }}>
                <h3 style={{ marginBottom: '20px' }}>Recent Payslips</h3>
                <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ padding: '15px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FileText size={18} style={{ marginRight: '12px', color: 'var(--text-muted)' }} />
                            <span>January 2026 Payslip</span>
                        </div>
                        <span style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Download PDF</span>
                    </div>
                    <div style={{ padding: '15px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <FileText size={18} style={{ marginRight: '12px', color: 'var(--text-muted)' }} />
                            <span>December 2025 Payslip</span>
                        </div>
                        <span style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: '600', cursor: 'pointer' }}>Download PDF</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeePortal;
