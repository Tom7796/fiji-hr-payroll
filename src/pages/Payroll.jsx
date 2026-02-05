import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { CreditCard, CheckCircle, AlertCircle, Printer, Download } from 'lucide-react';

const Payroll = () => {
    const { employees, addPayslip } = useAppContext();
    const [selectedPeriod, setSelectedPeriod] = useState('February 2026');
    const [isProcessing, setIsProcessing] = useState(false);
    const [generatedList, setGeneratedList] = useState([]);

    const periods = ['January 2026', 'February 2026', 'March 2026'];

    const calculatePayroll = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const newSlips = employees.map(emp => {
                const grossMonthly = emp.salary / 12;
                const taxAmount = grossMonthly * (emp.taxRate / 100);
                const netPay = grossMonthly - taxAmount;

                const slip = {
                    employeeId: emp.id,
                    employeeName: emp.name,
                    period: selectedPeriod,
                    basePay: grossMonthly,
                    taxAmount: taxAmount,
                    netPay: netPay,
                    deductions: 0,
                    bonuses: 0
                };

                addPayslip(slip);
                return slip;
            });

            setGeneratedList(newSlips);
            setIsProcessing(false);
        }, 1500);
    };

    return (
        <div className="payroll-page">
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Run Payroll</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Review and generate monthly payslips for your team.</p>
            </header>

            <div className="glass" style={{ padding: '32px', marginBottom: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px', alignItems: 'flex-end' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Select Payroll Period</label>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            style={{ width: '100%', padding: '12px', fontSize: '16px' }}
                        >
                            {periods.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                    </div>
                    <button
                        onClick={calculatePayroll}
                        disabled={isProcessing || generatedList.length > 0}
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '14px 24px',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            opacity: (isProcessing || generatedList.length > 0) ? 0.7 : 1,
                            cursor: (isProcessing || generatedList.length > 0) ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isProcessing ? 'Processing...' : (generatedList.length > 0 ? 'Payroll Completed' : 'Generate Payroll')}
                    </button>
                </div>
            </div>

            {isProcessing && (
                <div className="glass" style={{ padding: '40px', textAlign: 'center' }}>
                    <div className="spinner" style={{
                        width: '40px', height: '40px', border: '4px solid var(--border-light)',
                        borderTopColor: 'var(--primary)', borderRadius: '50%',
                        margin: '0 auto 16px', animation: 'spin 1s linear infinite'
                    }}></div>
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                    <p style={{ fontWeight: '500' }}>Calculating salaries and taxes...</p>
                </div>
            )}

            {!isProcessing && generatedList.length > 0 && (
                <div className="animate-fade-in">
                    <div style={{ background: '#dcfce7', color: '#15803d', padding: '16px', borderRadius: 'var(--radius-md)', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <CheckCircle size={20} />
                        <span style={{ fontWeight: '600' }}>Payroll for {selectedPeriod} has been generated successfully!</span>
                    </div>

                    <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: 'rgba(0,0,0,0.02)', textAlign: 'left' }}>
                                <tr>
                                    <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Employee</th>
                                    <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Gross Pay</th>
                                    <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Tax Deducted</th>
                                    <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Net Pay</th>
                                    <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}></th>
                                </tr>
                            </thead>
                            <tbody>
                                {generatedList.map((slip, i) => (
                                    <tr key={i} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                        <td style={{ padding: '16px 20px', fontWeight: '600' }}>{slip.employeeName}</td>
                                        <td style={{ padding: '16px 20px' }}>${slip.basePay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td style={{ padding: '16px 20px', color: 'var(--accent)' }}>-${slip.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td style={{ padding: '16px 20px', fontWeight: '700', color: '#10b981' }}>${slip.netPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                            <button style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '600' }}>
                                                <Printer size={16} /> View/Print
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payroll;
