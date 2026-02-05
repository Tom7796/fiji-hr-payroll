import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { Plus, Search, MoreVertical, Edit2, Trash2, Mail, Briefcase } from 'lucide-react';

const Employees = () => {
    const { employees, addEmployee, updateEmployee, deleteEmployee } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const filteredEmployees = employees.filter(emp =>
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSave = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            role: formData.get('role'),
            salary: Number(formData.get('salary')),
            taxRate: Number(formData.get('taxRate')),
            status: 'Active'
        };

        if (editingEmployee) {
            updateEmployee(editingEmployee.id, data);
        } else {
            addEmployee(data);
        }
        setShowModal(false);
        setEditingEmployee(null);
    };

    return (
        <div className="employees-page">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Employees</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Manage your team and their compensation details.</p>
                </div>
                <button
                    onClick={() => { setEditingEmployee(null); setShowModal(true); }}
                    style={{
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '12px 24px',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontWeight: '600',
                        boxShadow: '0 4px 14px 0 var(--primary-glow)'
                    }}
                >
                    <Plus size={20} /> Add Employee
                </button>
            </header>

            <div className="glass" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px', borderBottom: '1px solid var(--border-light)', display: 'flex', gap: '16px' }}>
                    <div style={{ position: 'relative', flex: 1 }}>
                        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                        <input
                            type="text"
                            placeholder="Search by name or role..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ paddingLeft: '40px', width: '100%', background: 'var(--bg-main)' }}
                        />
                    </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ background: 'rgba(0,0,0,0.02)', textAlign: 'left' }}>
                        <tr>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Employee</th>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Role</th>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Annual Salary</th>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}>Status</th>
                            <th style={{ padding: '16px 20px', color: 'var(--text-secondary)', fontWeight: '600' }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEmployees.map((emp) => (
                            <tr key={emp.id} style={{ borderBottom: '1px solid var(--border-light)' }}>
                                <td style={{ padding: '16px 20px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                            {emp.name[0]}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: '600' }}>{emp.name}</div>
                                            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{emp.email}</div>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ padding: '16px 20px', color: 'var(--text-secondary)' }}>{emp.role}</td>
                                <td style={{ padding: '16px 20px', fontWeight: '500' }}>${emp.salary.toLocaleString()}</td>
                                <td style={{ padding: '16px 20px' }}>
                                    <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '12px', background: '#dcfce7', color: '#15803d', fontWeight: '600' }}>
                                        {emp.status}
                                    </span>
                                </td>
                                <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                        <button onClick={() => { setEditingEmployee(emp); setShowModal(true); }} style={{ color: 'var(--text-secondary)' }}>
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => deleteEmployee(emp.id)} style={{ color: 'var(--accent)' }}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && (
                <div className="modal-overlay" style={{
                    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
                }}>
                    <div className="glass" style={{ width: '100%', maxWidth: '500px', padding: '32px' }}>
                        <h2 style={{ marginBottom: '24px' }}>{editingEmployee ? 'Edit Employee' : 'Add New Employee'}</h2>
                        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '600' }}>Full Name</label>
                                    <input name="name" defaultValue={editingEmployee?.name} required />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '600' }}>Email Address</label>
                                    <input name="email" type="email" defaultValue={editingEmployee?.email} required />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', fontWeight: '600' }}>Job Role</label>
                                <input name="role" defaultValue={editingEmployee?.role} required />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '600' }}>Annual Salary ($)</label>
                                    <input name="salary" type="number" defaultValue={editingEmployee?.salary} required />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '14px', fontWeight: '600' }}>Tax Rate (%)</label>
                                    <input name="taxRate" type="number" defaultValue={editingEmployee?.taxRate || 20} required />
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                                <button type="submit" style={{ flex: 1, background: 'var(--primary)', color: 'white', padding: '12px', borderRadius: 'var(--radius-md)', fontWeight: '600' }}>
                                    Save Employee
                                </button>
                                <button type="button" onClick={() => setShowModal(false)} style={{ flex: 1, border: '1px solid var(--border-light)', padding: '12px', borderRadius: 'var(--radius-md)', fontWeight: '600' }}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Employees;
