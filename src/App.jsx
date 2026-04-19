import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import Account from './pages/Account'
import Navbar from './components/Navbar'

function App() {
    const token = localStorage.getItem('token')

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={token ? <Navigate to="/products" /> : <Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/account" element={<Account />} />
            </Routes>
        </>
    )
}

export default App