import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [error, setError] = useState(null);
    const { signIn, signUp } = useAuth();

    const handleAuth = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const { error } = isSignUp
                ? await signUp(email, password)
                : await signIn(email, password);
            if (error) throw error;
            if (isSignUp) alert('Check your email for the confirmation link!');
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh',
            background: 'var(--bg-main)'
        }}>
            <div className="glass" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
                <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>
                    {isSignUp ? 'Create Account' : 'Welcome Back'}
                </h2>
                <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600' }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@hral.com"
                            required
                        />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        <label style={{ fontSize: '14px', fontWeight: '600' }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    {error && <p style={{ color: 'var(--accent)', fontSize: '14px' }}>{error}</p>}
                    <button
                        type="submit"
                        style={{
                            background: 'var(--primary)', color: 'white', padding: '12px',
                            borderRadius: 'var(--radius-md)', fontWeight: '600', marginTop: '10px'
                        }}
                    >
                        {isSignUp ? 'Sign Up' : 'Sign In'}
                    </button>
                </form>
                <button
                    onClick={() => setIsSignUp(!isSignUp)}
                    style={{ width: '100%', marginTop: '20px', color: 'var(--text-secondary)', fontSize: '14px' }}
                >
                    {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </button>
            </div>
        </div>
    );
};

export default Auth;
