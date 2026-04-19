import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Account() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/user/me')
            .then(res => {
                setFirstName(res.data.firstName || '')
                setLastName(res.data.lastName || '')
                setEmail(res.data.email || '')
                setPhone(res.data.phone || '')
                setAddress(res.data.address || '')
            })
            .catch(() => navigate('/login'))
    }, [])

    const handleSave = async (e) => {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        setError('')
        try {
            await api.put('/user/me', { firstName, lastName, phone, address })
            setMessage('Account updated successfully!')
        } catch {
            setError('Failed to update account. Please try again.')
        }
        setLoading(false)
    }

    return (
        <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '8px', color: '#222' }}>
                My Account
            </h1>
            <p style={{ color: '#888', marginBottom: '32px', fontSize: '14px' }}>
                Update your personal information
            </p>

            {message && (
                <div style={{ background: '#e6f4ea', color: '#2e7d32', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontWeight: '600', border: '1px solid #c8e6c9', fontSize: '14px' }}>
                    {message}
                </div>
            )}

            {error && (
                <div style={{ background: '#fff0f0', color: '#cc0000', padding: '12px 16px', borderRadius: '8px', marginBottom: '24px', fontWeight: '600', border: '1px solid #ffcccc', fontSize: '14px' }}>
                    {error}
                </div>
            )}

            <div style={{ background: 'white', borderRadius: '16px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                <form onSubmit={handleSave}>
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '18px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>First Name</label>
                            <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)}
                                   style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #eee', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                                   onFocus={e => e.target.style.border = '2px solid #cc0000'}
                                   onBlur={e => e.target.style.border = '2px solid #eee'}
                                   required />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Last Name</label>
                            <input type="text" value={lastName} onChange={e => setLastName(e.target.value)}
                                   style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #eee', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                                   onFocus={e => e.target.style.border = '2px solid #cc0000'}
                                   onBlur={e => e.target.style.border = '2px solid #eee'}
                                   required />
                        </div>
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Email</label>
                        <input type="email" value={email} disabled
                               style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #eee', fontSize: '15px', outline: 'none', boxSizing: 'border-box', background: '#f5f5f5', color: '#888', cursor: 'not-allowed' }} />
                        <p style={{ fontSize: '12px', color: '#aaa', marginTop: '4px' }}>Email cannot be changed</p>
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Phone Number</label>
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                               placeholder="(555) 555-5555"
                               style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #eee', fontSize: '15px', outline: 'none', boxSizing: 'border-box' }}
                               onFocus={e => e.target.style.border = '2px solid #cc0000'}
                               onBlur={e => e.target.style.border = '2px solid #eee'} />
                    </div>

                    <div style={{ marginBottom: '32px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>Billing Address</label>
                        <textarea value={address} onChange={e => setAddress(e.target.value)}
                                  placeholder="123 Main St, City, State, ZIP"
                                  rows={3}
                                  style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '2px solid #eee', fontSize: '15px', outline: 'none', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }}
                                  onFocus={e => e.target.style.border = '2px solid #cc0000'}
                                  onBlur={e => e.target.style.border = '2px solid #eee'} />
                    </div>

                    <button type="submit" disabled={loading}
                            style={{ width: '100%', padding: '14px', background: '#cc0000', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px', opacity: loading ? 0.7 : 1, cursor: 'pointer' }}
                            onMouseEnter={e => { if (!loading) e.target.style.background = '#aa0000' }}
                            onMouseLeave={e => e.target.style.background = '#cc0000'}>
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Account