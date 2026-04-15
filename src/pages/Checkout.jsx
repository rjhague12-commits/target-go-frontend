import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Checkout() {
    const [cardNumber, setCardNumber] = useState('')
    const [name, setName] = useState('')
    const [expiry, setExpiry] = useState('')
    const [cvv, setCvv] = useState('')
    const [message, setMessage] = useState('')
    const [messageType, setMessageType] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleCheckout = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const res = await api.post('/orders/checkout', {
                cardNumber, cardHolder: name, expiryDate: expiry, cvv
            })
            if (res.data.status === 'PAID') {
                setMessageType('success')
                setMessage('Payment successful! Redirecting to your orders...')
                setTimeout(() => navigate('/orders'), 2000)
            } else {
                setMessageType('error')
                setMessage('Payment declined. Try card: 4111111111111111')
            }
        } catch {
            setMessageType('error')
            setMessage('Checkout failed. Make sure your cart is not empty.')
        }
        setLoading(false)
    }

    const inputStyle = {
        width: '100%', padding: '12px 16px', borderRadius: '8px',
        border: '2px solid #eee', fontSize: '15px', outline: 'none'
    }

    return (
        <div style={{
            minHeight: '100vh', background: '#f7f7f7',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '30px 20px'
        }}>
            <div style={{
                background: 'white', borderRadius: '16px', padding: '48px 40px',
                width: '100%', maxWidth: '480px',
                boxShadow: '0 4px 24px rgba(0,0,0,0.1)'
            }}>
                <h1 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: '#222' }}>
                    Checkout
                </h1>
                <p style={{ color: '#888', fontSize: '14px', marginBottom: '32px' }}>
                    Enter your payment details below
                </p>

                {message && (
                    <div style={{
                        background: messageType === 'success' ? '#e6f4ea' : '#fff0f0',
                        color: messageType === 'success' ? '#2e7d32' : '#cc0000',
                        padding: '12px 16px', borderRadius: '8px', marginBottom: '24px',
                        fontSize: '14px', fontWeight: '600',
                        border: messageType === 'success' ? '1px solid #c8e6c9' : '1px solid #ffcccc'
                    }}>
                        {messageType === 'success' ? 'Payment successful! Redirecting...' : message}
                    </div>
                )}

                <form onSubmit={handleCheckout}>
                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>
                            Cardholder Name
                        </label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)}
                               placeholder="John Doe" style={inputStyle}
                               onFocus={e => e.target.style.border = '2px solid #cc0000'}
                               onBlur={e => e.target.style.border = '2px solid #eee'}
                               required />
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>
                            Card Number
                        </label>
                        <input type="text" value={cardNumber} onChange={e => setCardNumber(e.target.value)}
                               placeholder="4111111111111111" maxLength={16} style={inputStyle}
                               onFocus={e => e.target.style.border = '2px solid #cc0000'}
                               onBlur={e => e.target.style.border = '2px solid #eee'}
                               required />
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>
                                Expiry Date
                            </label>
                            <input type="text" value={expiry} onChange={e => setExpiry(e.target.value)}
                                   placeholder="MM/YY" style={inputStyle}
                                   onFocus={e => e.target.style.border = '2px solid #cc0000'}
                                   onBlur={e => e.target.style.border = '2px solid #eee'}
                                   required />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '14px' }}>
                                CVV
                            </label>
                            <input type="text" value={cvv} onChange={e => setCvv(e.target.value)}
                                   placeholder="123" maxLength={3} style={inputStyle}
                                   onFocus={e => e.target.style.border = '2px solid #cc0000'}
                                   onBlur={e => e.target.style.border = '2px solid #eee'}
                                   required />
                        </div>
                    </div>

                    <button type="submit" disabled={loading} style={{
                        width: '100%', padding: '14px', background: '#cc0000', color: 'white',
                        border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px',
                        opacity: loading ? 0.7 : 1, transition: 'background 0.2s'
                    }}
                            onMouseEnter={e => { if (!loading) e.target.style.background = '#aa0000' }}
                            onMouseLeave={e => e.target.style.background = '#cc0000'}
                    >
                        {loading ? 'Processing...' : 'Place Order'}
                    </button>
                </form>

                <p style={{ marginTop: '16px', color: '#aaa', fontSize: '12px', textAlign: 'center' }}>
                    Test card: 4111111111111111 (success) or 4000000000000002 (decline)
                </p>
            </div>
        </div>
    )
}

export default Checkout