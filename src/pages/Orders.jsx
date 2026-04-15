import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Orders() {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/orders')
            .then(res => setOrders(res.data))
            .catch(() => navigate('/login'))
    }, [])

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px 20px' }}>
            <h1 style={{ fontSize: '26px', fontWeight: '700', marginBottom: '24px', color: '#222' }}>
                📦 Your Orders
            </h1>

            {orders.length === 0 ? (
                <div style={{
                    background: 'white', borderRadius: '16px', padding: '60px 20px',
                    textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                }}>
                    <div style={{ fontSize: '64px', marginBottom: '16px' }}>📦</div>
                    <h2 style={{ color: '#888', fontWeight: '500' }}>No orders yet</h2>
                    <button onClick={() => navigate('/products')} style={{
                        marginTop: '20px', background: '#cc0000', color: 'white',
                        border: 'none', padding: '12px 28px', borderRadius: '25px',
                        fontWeight: '700', fontSize: '15px', cursor: 'pointer'
                    }}>
                        Start Shopping
                    </button>
                </div>
            ) : (
                orders.map(order => (
                    <div key={order.id} style={{
                        background: 'white', borderRadius: '16px', padding: '24px',
                        marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                    }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            <div>
                                <span style={{ fontWeight: '700', fontSize: '16px' }}>Order #{order.id}</span>
                                <p style={{ color: '#888', fontSize: '13px', marginTop: '2px' }}>
                                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                                </p>
                            </div>
                            <span style={{
                                background: order.status === 'PAID' ? '#e6f4ea' : '#fff0f0',
                                color: order.status === 'PAID' ? '#2e7d32' : '#cc0000',
                                padding: '6px 16px', borderRadius: '20px', fontSize: '13px',
                                fontWeight: '700', border: `1px solid ${order.status === 'PAID' ? '#c8e6c9' : '#ffcccc'}`
                            }}>
                {order.status === 'PAID' ? '✅ Paid' : '❌ Declined'}
              </span>
                        </div>

                        <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
                            {order.items && order.items.map(item => (
                                <div key={item.id} style={{
                                    display: 'flex', justifyContent: 'space-between',
                                    padding: '8px 0', borderBottom: '1px solid #f9f9f9'
                                }}>
                                    <span style={{ color: '#444', fontSize: '14px' }}>{item.productName}</span>
                                    <span style={{ color: '#666', fontSize: '14px' }}>
                    x{item.quantity} · ${(item.price * item.quantity).toFixed(2)}
                  </span>
                                </div>
                            ))}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <span style={{ fontWeight: '800', fontSize: '18px', color: '#cc0000' }}>
                Total: ${order.totalAmount?.toFixed(2)}
              </span>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Orders