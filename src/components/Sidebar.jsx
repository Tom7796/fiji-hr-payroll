import React from 'react';
import { LayoutDashboard, Users, CreditCard, FileText, Calculator, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ currentPage, setCurrentPage }) => {
    const { signOut } = useAuth();
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'employees', label: 'Employees', icon: Users },
        { id: 'deductions', label: 'Admin Deductions', icon: Calculator },
        { id: 'payroll', label: 'Run Payroll', icon: CreditCard },
        { id: 'payslips', label: 'Payslips', icon: FileText },
    ];

    return (
        <aside className="sidebar" style={{
            width: '280px',
            background: 'var(--bg-sidebar)',
            color: 'var(--text-on-dark)',
            display: 'flex',
            flexDirection: 'column',
            padding: '30px 20px',
            height: '100vh',
            position: 'sticky',
            top: 0
        }}>
            <div className="logo" style={{ marginBottom: '40px', padding: '0 10px' }}>
                <h2 style={{ fontSize: '24px', background: 'linear-gradient(to right, #fff, var(--primary))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                    Fiji HR Portal
                </h2>
            </div>

            <nav style={{ flex: 1 }}>
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setCurrentPage(item.id)}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                width: '100%',
                                padding: '12px 16px',
                                marginBottom: '8px',
                                borderRadius: 'var(--radius-md)',
                                color: isActive ? '#fff' : 'var(--text-muted)',
                                background: isActive ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                                textAlign: 'left'
                            }}
                        >
                            <Icon size={20} style={{ marginRight: '12px' }} />
                            <span style={{ fontWeight: isActive ? '600' : '400' }}>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="sidebar-footer" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                <button
                    onClick={signOut}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '12px 16px',
                        color: 'var(--accent)',
                        borderRadius: 'var(--radius-md)'
                    }}
                >
                    <LogOut size={20} style={{ marginRight: '12px' }} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
