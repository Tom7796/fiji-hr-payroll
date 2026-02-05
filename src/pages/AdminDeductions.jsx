import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { calculateFijiTax } from '../utils/fijiPayroll';
import { supabase } from '../lib/supabaseClient';
import { Calculator, Save, CheckCircle, AlertCircle } from 'lucide-react';

const AdminDeductions = () => {
    const { employees } = useAppContext();
    const [selectedEmpId, setSelectedEmpId] = useState('');
    const [annualGross, setAnnualGross] = useState('');
    const [results, setResults] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [status, setStatus] = useState(null);

    const handleCalculate = () => {
        if (!annualGross) return;
        const calc = calculateFijiTax(Number(annualGross));
        setResults(calc);
    };

    const handleSave = async () => {
        if (!results || !selectedEmpId) return;
        setIsSaving(true);
        setStatus(null);

        const employee = employees.find(e => e.id === selectedEmpId);

        try {
            const { data, error } = await supabase
                .from('deductions')
                .insert([
                    {
                        employee_id: selectedEmpId,
                        employee_name: employee.name,
                        annual_gross: results.annualGross,
                        fnpf_deduction: results.fnpf,
                        paye_tax: results.paye,
                        annual_net: results.annualNet,
                        created_at: new Date().toISOString()
                    }
                ]);

            if (error) throw error;
            setStatus({ type: 'success', message: 'Deductions saved successfully to Supabase!' });
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: `Error: ${err.message}. (Note: Ensure 'deductions' table exists)` });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="admin-deductions-page">
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Fiji Payroll Admin</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Calculate FNPF and Progressive PAYE tax based on 2026 Fiji regulations.</p>
            </header>

            <div className="glass" style={{ padding: '32px', marginBottom: '32px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', alignItems: 'flex-end' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Select Employee</label>
                        <select
                            value={selectedEmpId}
                            onChange={(e) => setSelectedEmpId(e.target.value)}
                            style={{ width: '100%', padding: '12px' }}
                        >
                            <option value="">Select...</option>
                            {employees.map(emp => (
                                <option key={emp.id} value={emp.id}>{emp.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>Annual Gross Salary ($)</label>
                        <input
                            type="number"
                            value={annualGross}
                            onChange={(e) => setAnnualGross(e.target.value)}
                            placeholder="e.g. 55000"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <button
                        onClick={handleCalculate}
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: '600',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px'
                        }}
                    >
                        <Calculator size={20} /> Calculate
                    </button>
                </div>
            </div>

            {results && (
                <div className="animate-fade-in">
                    <div className="glass" style={{ padding: '32px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                        <div>
                            <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Annual Breakdown</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                                    <span>Gross Salary</span>
                                    <span style={{ fontWeight: '600' }}>${results.annualGross.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)', color: 'var(--accent)' }}>
                                    <span>FNPF (8%)</span>
                                    <span>-${results.fnpf.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)', color: 'var(--accent)' }}>
                                    <span>PAYE Tax (Progressive)</span>
                                    <span>-${results.paye.toLocaleString()}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '18px', fontWeight: '700' }}>
                                    <span>Net Annual Salary</span>
                                    <span style={{ color: '#10b981' }}>${results.annualNet.toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 style={{ marginBottom: '20px', color: 'var(--secondary)' }}>Monthly Estimates</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                                    <span>Monthly Gross</span>
                                    <span style={{ fontWeight: '600' }}>${results.monthlyGross.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                                    <span>Monthly FNPF</span>
                                    <span>${results.monthlyFnpf.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-light)' }}>
                                    <span>Monthly PAYE</span>
                                    <span>${results.monthlyPaye.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '8px', fontSize: '18px', fontWeight: '700' }}>
                                    <span>Monthly Net Pay</span>
                                    <span style={{ color: '#10b981' }}>${results.monthlyNet.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                                </div>
                            </div>

                            <button
                                onClick={handleSave}
                                disabled={isSaving}
                                style={{
                                    marginTop: '32px',
                                    width: '100%',
                                    background: isSaving ? 'var(--text-muted)' : 'var(--secondary)',
                                    color: 'white',
                                    padding: '14px',
                                    borderRadius: 'var(--radius-md)',
                                    fontWeight: '600',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    gap: '8px'
                                }}
                            >
                                <Save size={20} /> {isSaving ? 'Saving...' : 'Save to Supabase'}
                            </button>
                        </div>
                    </div>

                    {status && (
                        <div style={{
                            marginTop: '24px',
                            padding: '16px',
                            borderRadius: 'var(--radius-md)',
                            background: status.type === 'success' ? '#dcfce7' : '#fee2e2',
                            color: status.type === 'success' ? '#15803d' : '#991b1b',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                        }}>
                            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span style={{ fontWeight: '500' }}>{status.message}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminDeductions;
