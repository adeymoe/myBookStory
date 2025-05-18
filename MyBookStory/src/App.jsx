import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import BuyBooks from './pages/BuyBooks'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SellBooks from './pages/SellBooks'
import BookDetail from './pages/BookDetail'
import ProfilePage from './pages/ProfilePage'
import MyOrdersPage from './pages/MyOrdersPage'
import Account from './pages/Account'
import { ToastContainer } from 'react-toastify'
import ProtectedRoute from './routes/ProtectedRoute'
import PlaceOrder from './pages/PlaceOrder'
import PaymentSuccess from './pages/PaymentSuccess'

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {
  return (
    <div className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal px-4">
      <ToastContainer/>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path='/account' element={<Account/>}/>
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/buybooks" element={<ProtectedRoute><BuyBooks/></ProtectedRoute>} />
        <Route path="/sellbooks" element={<ProtectedRoute><SellBooks/></ProtectedRoute>}/>
        <Route path='/bookdetail/:bookId' element={<ProtectedRoute><BookDetail/></ProtectedRoute>}/>
        <Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        <Route path='/myorders' element={<ProtectedRoute><MyOrdersPage/></ProtectedRoute>}/>
        <Route path='/place-order' element={<ProtectedRoute><PlaceOrder/></ProtectedRoute>}/>

      </Routes>
      <Footer/>

    </div>
  )
}

export default App