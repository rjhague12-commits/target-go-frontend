import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.post('/auth/login', { email, password })
            localStorage.setItem('token', res.data.token)
            navigate('/products')
        } catch {
            setError('Invalid email or password')
        }
        setLoading(false)
    }

    return (
        <div style={{
            minHeight: '100vh', background: '#f7f7f7',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <div style={{
                background: 'white', borderRadius: '16px', padding: '48px 40px',
                width: '100%', maxWidth: '420px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{ fontSize: '48px', marginBottom: '8px' }}>🎯</div>
                    <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#cc0000' }}>Target Go</h1>
                    <p style={{ color: '#888', marginTop: '6px', fontSize: '14px' }}>Sign in to your account</p>
                </div>

                {error && (
                    <div style={{
                        background: '#fff0f0', color: '#cc0000', padding: '12px 16px',
                        borderRadius: '8px', marginBottom: '20px', fontSize: '14px',
                        border: '1px solid #ffcccc'
                    }}>{error}</div>
                )}

                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Email</label>
                        <input
                            type="email" value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            style={{
                                width: '100%', padding: '12px 16px', borderRadius: '8px',
                                border: '2px solid #eee', fontSize: '15px', outline: 'none',
                                transition: 'border 0.2s'
                            }}
                            onFocus={e => e.target.style.border = '2px solid #cc0000'}
                            onBlur={e => e.target.style.border = '2px solid #eee'}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Password</label>
                        <input
                            type="password" value={password} onChange={e => setPassword(e.target.value)}
                            placeholder="••••••••"
                            style={{
                                width: '100%', padding: '12px 16px', borderRadius: '8px',
                                border: '2px solid #eee', fontSize: '15px', outline: 'none',
                                transition: 'border 0.2s'
                            }}
                            onFocus={e => e.target.style.border = '2px solid #cc0000'}
                            onBlur={e => e.target.style.border = '2px solid #eee'}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '14px', background: '#cc0000', color: 'white',
                        border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px',
                        transition: 'background 0.2s', opacity: loading ? 0.7 : 1
                    }}
                            onMouseEnter={e => { if (!loading) e.target.style.background = '#aa0000' }}
                            onMouseLeave={e => e.target.style.background = '#cc0000'}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#666' }}>
                    Don't have an account?{' '}
                    <Link to="/register" style={{ color: '#cc0000', fontWeight: '700' }}>Create one</Link>
                </p>
            </div>
        </div>
    )
}

export default Login