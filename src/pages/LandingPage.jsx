import React from 'react';
import { Shield, Users, Calculator, Cloud, ArrowRight } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
    const features = [
        {
            title: 'Fiji 2026 Ready',
            desc: 'Automated FNPF (8%) and Progressive PAYE tax calculations based on latest Fiji regulations.',
            icon: Calculator,
            color: '#6cb33f'
        },
        {
            title: 'Employee Management',
            desc: 'Centralized database for all employee records, contracts, and compensation history.',
            icon: Users,
            color: '#06b6d4'
        },
        {
            title: 'Supabase Integrated',
            desc: 'Secure cloud storage and real-time data sync powered by industry-leading Supabase.',
            icon: Cloud,
            color: '#6366f1'
        }
    ];

    return (
        <div className="landing-page" style={{ background: 'var(--bg-main)', minHeight: '100vh', color: 'var(--text-primary)' }}>
            {/* Navbar */}
            <nav style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '24px 8%', background: '#ffffff',
                position: 'sticky', top: 0, zIndex: 100, borderBottom: '1px solid var(--border-light)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '40px', height: '40px', background: 'var(--primary)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Shield color="white" size={24} />
                    </div>
                    <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary)' }}>Fiji HR</h2>
                </div>
                <button
                    onClick={onGetStarted}
                    style={{ background: 'var(--primary)', color: 'white', padding: '10px 24px', borderRadius: 'var(--radius-md)', fontWeight: '600' }}
                >
                    Sign In
                </button>
            </nav>

            {/* Hero Section */}
            <section style={{ padding: '100px 8%', textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}>
                <h1 style={{ fontSize: ' clamp(40px, 8vw, 72px)', marginBottom: '24px', lineHeight: 1.1, color: '#000' }}>
                    The Smartest Way to Manage <span style={{ color: 'var(--primary)' }}>Payroll in Fiji</span>
                </h1>
                <p style={{ fontSize: '20px', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '700px', margin: '0 auto 40px' }}>
                    Fully compliant with Fiji 2026 tax laws. Manage employees, calculate deductions, and generate payslips with ease.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                    <button
                        onClick={onGetStarted}
                        style={{
                            background: 'var(--primary)', color: 'white', padding: '16px 32px',
                            borderRadius: 'var(--radius-md)', fontWeight: '700', fontSize: '18px',
                            display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 25px -5px var(--primary-glow)'
                        }}
                    >
                        Get Started Free <ArrowRight size={20} />
                    </button>
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '80px 8%', background: '#f8fafc' }}>
                <div style={{
                    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '32px', maxWidth: '1200px', margin: '0 auto'
                }}>
                    {features.map((f, i) => (
                        <div key={i} className="glass-card" style={{ textAlign: 'left' }}>
                            <div style={{
                                width: '56px', height: '56px', borderRadius: '14px', background: `${f.color}15`,
                                color: f.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                marginBottom: '24px'
                            }}>
                                <f.icon size={28} />
                            </div>
                            <h3 style={{ fontSize: '20px', marginBottom: '12px' }}>{f.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer style={{ padding: '60px 8%', textAlign: 'center', borderTop: '1px solid var(--border-light)', marginTop: '80px' }}>
                <p style={{ color: 'var(--text-muted)' }}>© 2026 Fiji HR & Payroll Portal. All rights reserved.</p>
                <p style={{ marginTop: '10px', fontSize: '14px', color: 'var(--text-muted)' }}>Designed for compliance and excellence.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
