import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Users, DollarSign, Briefcase, TrendingUp } from 'lucide-react';

const Dashboard = () => {
    const { employees, payslips } = useAppContext();

    const totalPayroll = employees.reduce((acc, emp) => acc + emp.salary, 0);
    const avgSalary = employees.length > 0 ? totalPayroll / employees.length : 0;

    const stats = [
        { label: 'Total Employees', value: employees.length, icon: Users, color: 'var(--primary)' },
        { label: 'Total Payroll', value: `$${(totalPayroll / 12).toLocaleString(undefined, { maximumFractionDigits: 0 })}/mo`, icon: DollarSign, color: 'var(--secondary)' },
        { label: 'Avg. Salary', value: `$${avgSalary.toLocaleString(undefined, { maximumFractionDigits: 0 })}`, icon: Briefcase, color: 'var(--accent)' },
        { label: 'Active Status', value: '98%', icon: TrendingUp, color: '#10b981' },
    ];

    return (
        <div className="dashboard-page">
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Welcome back, Admin</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Here's what's happening with your workforce today.</p>
            </header>

            <div className="stats-grid" style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '24px',
                marginBottom: '40px'
            }}>
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass" style={{ padding: '24px', display: 'flex', alignItems: 'center' }}>
                        <div style={{
                            width: '48px',
                            height: '48px',
                            borderRadius: 'var(--radius-md)',
                            background: `${stat.color}15`,
                            color: stat.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '16px'
                        }}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '4px' }}>{stat.label}</p>
                            <h3 style={{ fontSize: '20px' }}>{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="content-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
                <div className="glass" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Recent Activity</h3>
                    <div className="activity-list">
                        {payslips.length > 0 ? (
                            payslips.slice(0, 5).map((slip, i) => (
                                <div key={i} style={{ padding: '12px 0', borderBottom: i < 4 ? '1px solid var(--border-light)' : 'none', display: 'flex', justifyContent: 'space-between' }}>
                                    <span>Generated payslip for period {slip.period}</span>
                                    <span style={{ color: 'var(--text-muted)', fontSize: '14px' }}>{new Date(slip.generatedAt).toLocaleDateString()}</span>
                                </div>
                            ))
                        ) : (
                            <p style={{ color: 'var(--text-muted)' }}>No recent activity to show.</p>
                        )}
                    </div>
                </div>

                <div className="glass" style={{ padding: '24px' }}>
                    <h3 style={{ marginBottom: '20px' }}>Quick Actions</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button className="glass" style={{ padding: '12px', textAlign: 'left', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)' }}>
                            Add New Employee
                        </button>
                        <button className="glass" style={{ padding: '12px', textAlign: 'left' }}>
                            Download Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
