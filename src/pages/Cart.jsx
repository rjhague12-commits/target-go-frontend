import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Cart() {
    const [cartItems, setCartItems] = useState([])
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()

    const fetchCart = async () => {
        try {
            const res = await api.get('/cart')
            setCartItems(res.data.items || [])
            setTotal(res.data.total || 0)
        } catch {
            navigate('/login')
        }
    }

    useEffect(() => {
        fetchCart()
    }, [])

    const removeItem = async (itemId) => {
        try {
            await api.delete(`/cart/${itemId}`)
            fetchCart()
        } catch {
            alert('Error removing item')
        }
    }

    const updateQuantity = async (itemId, newQty) => {
        if (newQty < 1) return
        try {
            await api.put(`/cart/${itemId}`, { quantity: newQty })
            fetchCart()
        } catch {
            alert('Error updating quantity')
        }
    }

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 20px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '24px', color: '#222' }}>
                🛒 Your Cart
            </h1>

            {cartItems.length === 0 ? (
                <div style={{
                    background: 'white', borderRadius: '16px', padding: '60px 20px',
                    textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
                    <h2 style={{ color: '#888', fontWeight: '500' }}>Your cart is empty</h2>
                    <button onClick={() => navigate('/products')} style={{
                        marginTop: '20px', background: '#cc0000', color: 'white',
                        border: 'none', padding: '12px 28px', borderRadius: '25px',
                        fontWeight: '700', fontSize: '15px', cursor: 'pointer'
                    }}>
                        Browse Products
                    </button>
                </div>
            ) : (
                <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: '300px' }}>
                        {cartItems.map(item => (
                            <div key={item.id} style={{
                                background: 'white', borderRadius: '12px', padding: '16px 20px',
                                marginBottom: '12px', display: 'flex', alignItems: 'center',
                                gap: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                            }}>
                                <div style={{
                                    width: '60px', height: '60px', background: '#f9f9f9',
                                    borderRadius: '8px', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', fontSize: '28px', flexShrink: 0
                                }}>🛍️</div>
                                <div style={{ flex: 1 }}>
                                    <p style={{ fontWeight: '600', fontSize: '15px', marginBottom: '8px' }}>
                                        {item.product?.name}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            style={{
                                                width: '28px', height: '28px', borderRadius: '50%',
                                                border: '2px solid #ddd', background: 'white',
                                                fontSize: '16px', fontWeight: '700', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#555'
                                            }}>-</button>
                                        <span style={{ fontWeight: '600', fontSize: '15px', minWidth: '20px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            style={{
                                                width: '28px', height: '28px', borderRadius: '50%',
                                                border: '2px solid #ddd', background: 'white',
                                                fontSize: '16px', fontWeight: '700', cursor: 'pointer',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                color: '#555'
                                            }}>+</button>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{ color: '#cc0000', fontWeight: '700', fontSize: '16px', marginBottom: '6px' }}>
                                        ${(item.product?.price * item.quantity).toFixed(2)}
                                    </p>
                                    <button onClick={() => removeItem(item.id)} style={{
                                        background: 'none', border: '1px solid #ddd', padding: '4px 12px',
                                        borderRadius: '12px', fontSize: '12px', color: '#888',
                                        cursor: 'pointer'
                                    }}
                                            onMouseEnter={e => { e.target.style.borderColor = '#cc0000'; e.target.style.color = '#cc0000' }}
                                            onMouseLeave={e => { e.target.style.borderColor = '#ddd'; e.target.style.color = '#888' }}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ width: '280px', minWidth: '280px' }}>
                        <div style={{
                            background: 'white', borderRadius: '16px', padding: '24px',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)', position: 'sticky', top: '80px'
                        }}>
                            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Order Summary</h2>
                            <div style={{ borderTop: '2px solid #f0f0f0', paddingTop: '16px', marginBottom: '20px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#666' }}>Subtotal</span>
                                    <span style={{ fontWeight: '600' }}>${total.toFixed(2)}</span>
                                </div>

                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', paddingTop: '16px', borderTop: '2px solid #f0f0f0' }}>
                                <span style={{ fontWeight: '700', fontSize: '18px' }}>Total</span>
                                <span style={{ fontWeight: '800', fontSize: '20px', color: '#cc0000' }}>${total.toFixed(2)}</span>
                            </div>
                            <button onClick={() => navigate('/checkout')} style={{
                                width: '100%', padding: '14px', background: '#cc0000', color: 'white',
                                border: 'none', borderRadius: '8px', fontWeight: '700', fontSize: '16px',
                                cursor: 'pointer', transition: 'background 0.2s'
                            }}
                                    onMouseEnter={e => e.target.style.background = '#aa0000'}
                                    onMouseLeave={e => e.target.style.background = '#cc0000'}
                            >
                                Proceed to Checkout
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Cart