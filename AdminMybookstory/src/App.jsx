import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AdminDashboard from './pages/AdminDashboard'
import Footer from './components/Footer'
import AdminLogin from './components/Login'

const App = () => {

  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token', token)
  },[token])

  return (
    <div className="bg-white text-gray-600 work-sans leading-normal text-base tracking-normal px-4">
      <ToastContainer/>
      {token === "" 
      ? <AdminLogin setToken={setToken} /> 
      : <>

      <Routes>
        <Route path="/" element={<AdminDashboard token={token}/>} />
        

        </Routes>
      <Footer/>
      </>
}

    </div>
  )
}

export default App