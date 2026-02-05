import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { supabase } from '../lib/supabaseClient';
import { Building, Phone, MapPin, Hash, Upload, CheckCircle, AlertCircle } from 'lucide-react';

const Settings = () => {
    const { companyProfile, setCompanyProfile, fetchCompanyProfile } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        tin: '',
        address: '',
        phone: '',
        logo_url: ''
    });

    useEffect(() => {
        if (companyProfile) {
            setFormData({
                name: companyProfile.name || '',
                tin: companyProfile.tin || '',
                address: companyProfile.address || '',
                phone: companyProfile.phone || '',
                logo_url: companyProfile.logo_url || ''
            });
        }
    }, [companyProfile]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setLoading(true);
        setStatus({ type: 'info', message: 'Uploading logo...' });

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `logos/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('company-assets')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('company-assets')
                .getPublicUrl(filePath);

            setFormData({ ...formData, logo_url: publicUrl });
            setStatus({ type: 'success', message: 'Logo uploaded successfully!' });
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: 'Logo upload failed. Ensure bucket is public.' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error('Not authenticated');

            const profileData = {
                ...formData,
                user_id: user.id,
            };

            const { error } = await supabase
                .from('company_profiles')
                .upsert(profileData, { onConflict: 'user_id' });

            if (error) throw error;

            await fetchCompanyProfile();
            setStatus({ type: 'success', message: 'Company settings saved!' });
        } catch (err) {
            console.error(err);
            setStatus({ type: 'error', message: `Update failed: ${err.message}` });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="settings-page">
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>Company Settings</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Manage your professional branding and contact information.</p>
            </header>

            <div className="glass" style={{ padding: '40px', maxWidth: '800px' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '40px' }}>
                        {/* Logo Section */}
                        <div style={{ textAlign: 'center' }}>
                            <div style={{
                                width: '160px', height: '160px', borderRadius: '16px', background: '#f8fafc',
                                border: '2px dashed var(--border-light)', display: 'flex', flexWrap: 'wrap',
                                alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative',
                                marginBottom: '16px'
                            }}>
                                {formData.logo_url ? (
                                    <img src={formData.logo_url} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                ) : (
                                    <Building size={48} color="var(--text-muted)" />
                                )}
                                <label style={{
                                    position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(0,0,0,0.5)',
                                    color: 'white', padding: '8px', cursor: 'pointer', fontSize: '12px'
                                }}>
                                    <Upload size={14} style={{ marginRight: '4px' }} /> Change Logo
                                    <input type="file" onChange={handleLogoUpload} style={{ display: 'none' }} accept="image/*" />
                                </label>
                            </div>
                            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>PNG or SVG recommended. <br /> Max 2MB.</p>
                        </div>

                        {/* Info Section */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Company Name</label>
                                <div style={{ position: 'relative' }}>
                                    <Building size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g. Acme Fiji Ltd" style={{ paddingLeft: '40px' }} required />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Tax Identification Number (TIN)</label>
                                <div style={{ position: 'relative' }}>
                                    <Hash size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input name="tin" value={formData.tin} onChange={handleInputChange} placeholder="9-digit TIN" style={{ paddingLeft: '40px' }} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Business Address</label>
                                <div style={{ position: 'relative' }}>
                                    <MapPin size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input name="address" value={formData.address} onChange={handleInputChange} placeholder="Street, City, Postal Code" style={{ paddingLeft: '40px' }} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', fontSize: '14px' }}>Phone Number</label>
                                <div style={{ position: 'relative' }}>
                                    <Phone size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                    <input name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+679 ..." style={{ paddingLeft: '40px' }} />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                style={{
                                    background: 'var(--primary)', color: 'white', padding: '16px',
                                    borderRadius: '12px', fontWeight: '700', fontSize: '16px',
                                    boxShadow: '0 10px 15px -3px var(--primary-glow)', marginTop: '10px'
                                }}
                            >
                                {loading ? 'Processing...' : 'Save Branding Changes'}
                            </button>

                            {status && (
                                <div style={{
                                    padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '10px',
                                    background: status.type === 'success' ? '#dcfce7' : '#fee2e2',
                                    color: status.type === 'success' ? '#15803d' : '#991b1b',
                                }}>
                                    {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                    <span style={{ fontWeight: '500' }}>{status.message}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Settings;
