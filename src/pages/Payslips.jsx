import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { FileText, Search, Printer, Download, X } from 'lucide-react';

const Payslips = () => {
    const { payslips } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSlip, setSelectedSlip] = useState(null);

    const filteredSlips = payslips.filter(slip =>
        slip.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        slip.period.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="payslips-page">
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Payslips</h1>
                <p style={{ color: 'var(--text-secondary)' }}>View and manage historical payroll records.</p>
            </header>

            <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '16px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by employee or period..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '40px', width: '100%', background: 'var(--bg-main)' }}
                        />
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: 'rgba(0,0,0,0.02)', textAlign: 'left' }}>
                        <tr>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Reference</th>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Employee</th>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Period</th>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Net Pay</th>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Date Generated</th>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSlips.map((slip) => (
                            <tr key={slip.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '16px 20px', fontWeight: '500' }}>#{slip.id.slice(-6).toUpperCase()}</td>
                                <td style={{ padding: '16px 20px' }}>{slip.employeeName}</td>
                                <td style={{ padding: '16px 20px' }}>{slip.period}</td>
                                <td style={{ padding: '16px 20px', fontWeight: '600' }}>${slip.netPay.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                <td style={{ padding: '16px 20px', color: 'var(--text-muted)' }}>{new Date(slip.generatedAt).toLocaleDateString()}</td>
                                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                    <button
                                        onClick={() => setSelectedSlip(slip)}
                                        style={{ color: 'var(--primary)', fontWeight: '600', fontSize: '14px' }}
                                    >
                                        View Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {filteredSlips.length === 0 && (
                            <tr>
                                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                    No payslips found matching your search.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {selectedSlip && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="glass" style={{ width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto', padding: '0', position: 'relative' }}>
                        <div className="no-print" style={{ position: 'sticky', top: 0, background: 'var(--bg-card)', padding: '16px 32px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                            <h2 style={{ fontSize: '18px' }}>Payslip Preview</h2>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <button
                                    onClick={() => window.print()}
                                    style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--primary)', color: 'white', padding: '8px 16px', borderRadius: 'var(--radius-md)', fontWeight: '600' }}
                                >
                                    <Printer size={16} /> Print
                                </button>
                                <button
                                    onClick={() => setSelectedSlip(null)}
                                    style={{ color: 'var(--text-secondary)' }}
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>

                        <div id="printable-payslip" style={{ padding: '40px', color: '#000', background: '#fff' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '2px solid #333', paddingBottom: '20px' }}>
                                <div>
                                    <h1 style={{ fontSize: '24px', color: '#6366f1' }}>HR PORTAL</h1>
                                    <p style={{ color: '#666' }}>123 Business Ave, Tech City</p>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <h2 style={{ fontSize: '20px' }}>PAY SLIP</h2>
                                    <p style={{ color: '#666' }}>Period: {selectedSlip.period}</p>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '40px' }}>
                                <div>
                                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#666', marginBottom: '8px' }}>Employee Details</h3>
                                    <div style={{ fontSize: '16px', fontWeight: '600' }}>{selectedSlip.employeeName}</div>
                                    <div style={{ color: '#444' }}>ID: EMP-{selectedSlip.employeeId.slice(0, 4).toUpperCase()}</div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <h3 style={{ fontSize: '14px', textTransform: 'uppercase', color: '#666', marginBottom: '8px' }}>Payslip Info</h3>
                                    <div>Reference: #{selectedSlip.id.slice(-8).toUpperCase()}</div>
                                    <div>Generated: {new Date(selectedSlip.generatedAt).toLocaleDateString()}</div>
                                </div>
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={{ padding: '12px', textAlign: 'left' }}>Earnings</th>
                                            <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '12px' }}>Basic Salary</td>
                                            <td style={{ padding: '12px', textAlign: 'right' }}>${selectedSlip.basePay.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ marginBottom: '40px' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0' }}>
                                            <th style={{ padding: '12px', textAlign: 'left' }}>Deductions</th>
                                            <th style={{ padding: '12px', textAlign: 'right' }}>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
                                            <td style={{ padding: '12px' }}>Income Tax</td>
                                            <td style={{ padding: '12px', textAlign: 'right' }}>${selectedSlip.taxAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div style={{ background: '#f8fafc', padding: '24px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontSize: '18px', fontWeight: '700' }}>NET PAY</span>
                                <span style={{ fontSize: '24px', fontWeight: '800', color: '#6366f1' }}>
                                    ${selectedSlip.netPay.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            <div style={{ marginTop: '60px', color: '#666', fontSize: '12px', textAlign: 'center' }}>
                                This is a computer-generated document and no signature is required.
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payslips;
