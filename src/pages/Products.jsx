import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../api'

function Products() {
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState('')
    const [message, setMessage] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        api.get('/products')
            .then(res => setProducts(res.data))
            .catch(() => navigate('/login'))
    }, [])

    const addToCart = async (productId) => {
        try {
            await api.post('/cart/add', { productId: Number(productId), quantity: 1 })
            setMessage('Added to cart!')
            setTimeout(() => setMessage(''), 2000)
        } catch {
            navigate('/login')
        }
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '30px 20px' }}>
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: '700', color: '#222' }}>All Products</h1>
                <input
                    placeholder="Search products..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ padding: '10px 18px', width: '280px', borderRadius: '25px', border: '2px solid #ddd', fontSize: '14px', outline: 'none' }}
                    onFocus={e => e.target.style.border = '2px solid #cc0000'}
                    onBlur={e => e.target.style.border = '2px solid #ddd'}
                />
            </div>

            {message && (
                <div style={{ background: '#e6f4ea', color: '#2e7d32', padding: '12px 20px', borderRadius: '8px', marginBottom: '20px', fontWeight: '600', border: '1px solid #c8e6c9' }}>
                    {message}
                </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '24px' }}>
                {filtered.map(product => {
                    const outOfStock = product.stockQuantity === 0
                    const lowStock = product.stockQuantity > 0 && product.stockQuantity <= 5

                    return (
                        <div key={product.id} style={{
                            background: 'white', borderRadius: '12px', overflow: 'hidden',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            display: 'flex', flexDirection: 'column',
                            opacity: outOfStock ? 0.7 : 1
                        }}
                             onMouseEnter={e => { if (!outOfStock) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)' }}}
                             onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)' }}
                        >
                            <div style={{ background: '#f9f9f9', height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                                {product.imageUrl ? (
                                    <img src={product.imageUrl} alt={product.name}
                                         style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                ) : (
                                    <span style={{ fontSize: '48px' }}>🛍️</span>
                                )}
                                {outOfStock && (
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <span style={{ color: 'white', fontWeight: '800', fontSize: '18px', background: '#cc0000', padding: '6px 14px', borderRadius: '4px' }}>OUT OF STOCK</span>
                                    </div>
                                )}
                                {lowStock && !outOfStock && (
                                    <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#ff6600', color: 'white', fontSize: '11px', fontWeight: '700', padding: '3px 8px', borderRadius: '4px' }}>
                                        Only {product.stockQuantity} left!
                                    </div>
                                )}
                            </div>

                            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '6px', color: '#222' }}>{product.name}</h3>
                                <p style={{ color: '#777', fontSize: '13px', marginBottom: '12px', flex: 1, lineHeight: '1.4' }}>{product.description}</p>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                                    <span style={{ color: '#cc0000', fontWeight: '800', fontSize: '20px' }}>${product.price}</span>
                                    <button
                                        onClick={() => !outOfStock && addToCart(product.id)}
                                        disabled={outOfStock}
                                        style={{
                                            background: outOfStock ? '#ccc' : '#cc0000',
                                            color: 'white', border: 'none', padding: '8px 16px',
                                            borderRadius: '20px', fontWeight: '600', fontSize: '13px',
                                            cursor: outOfStock ? 'not-allowed' : 'pointer',
                                            transition: 'background 0.2s'
                                        }}
                                        onMouseEnter={e => { if (!outOfStock) e.target.style.background = '#aa0000' }}
                                        onMouseLeave={e => { if (!outOfStock) e.target.style.background = '#cc0000' }}
                                    >
                                        {outOfStock ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Products