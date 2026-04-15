import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const logout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <nav style={{
            background: '#cc0000',
            padding: '0 40px',
            display: 'flex',
            alignItems: 'center',
            height: '60px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <Link to={token ? '/products' : '/login'} style={{
                color: 'white', fontWeight: '800', fontSize: '24px',
                letterSpacing: '-0.5px', marginRight: '40px'
            }}>
                🎯 Target Go
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                {token && (
                    <>
                        <Link to="/products" style={{
                            color: 'white', padding: '6px 14px', borderRadius: '20px',
                            fontSize: '14px', fontWeight: '500'
                        }}>Products</Link>
                        <Link to="/cart" style={{
                            color: 'white', padding: '6px 14px', borderRadius: '20px',
                            fontSize: '14px', fontWeight: '500'
                        }}>🛒 Cart</Link>
                        <Link to="/orders" style={{
                            color: 'white', padding: '6px 14px', borderRadius: '20px',
                            fontSize: '14px', fontWeight: '500'
                        }}>Orders</Link>
                    </>
                )}
            </div>

            {token ? (
                <button onClick={logout} style={{
                    background: 'white', color: '#cc0000', border: 'none',
                    padding: '8px 20px', borderRadius: '20px', fontWeight: '700', fontSize: '14px'
                }}>Sign Out</button>
            ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                    <Link to="/login" style={{
                        color: 'white', padding: '8px 20px', borderRadius: '20px',
                        fontSize: '14px', fontWeight: '600', border: '2px solid white'
                    }}>Login</Link>
                    <Link to="/register" style={{
                        background: 'white', color: '#cc0000', padding: '8px 20px',
                        borderRadius: '20px', fontSize: '14px', fontWeight: '700'
                    }}>Register</Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar