import React from 'react';
import { LayoutDashboard, Users, CreditCard, FileText, Calculator, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ currentPage, setCurrentPage }) => {
    const { signOut } = useAuth();
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'employees', label: 'Employees', icon: Users },
        { id: 'deductions', label: 'Admin Deductions', icon: Calculator },
        { id: 'payroll', label: 'Run Payroll', icon: CreditCard },
        { id: 'payslips', label: 'Payslips', icon: FileText },
        { id: 'settings', label: 'Settings', icon: SettingsIcon },
    ];

    return (
        <aside className="sidebar" style={{
            width: '280px',
            background: 'var(--bg-sidebar)',
            color: 'var(--text-primary)',
            display: 'flex',
            flexDirection: 'column',
            padding: '30px 20px',
            height: '100vh',
            position: 'sticky',
            top: 0,
            borderRight: '1px solid var(--border-light)'
        }}>
            <div className="logo" style={{ marginBottom: '40px', padding: '0 10px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary)' }}>
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
                                color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                                background: isActive ? 'var(--primary-glow)' : 'transparent',
                                textAlign: 'left',
                                fontWeight: isActive ? '600' : '500'
                            }}
                        >
                            <Icon size={20} style={{ marginRight: '12px' }} />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>

            <div className="sidebar-footer" style={{ borderTop: '1px solid var(--border-light)', paddingTop: '20px' }}>
                <button
                    onClick={signOut}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '100%',
                        padding: '12px 16px',
                        color: 'var(--accent)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '600'
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
