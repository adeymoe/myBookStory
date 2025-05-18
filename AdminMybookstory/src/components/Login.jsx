import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLogin = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/adminLogin`, {
        email,
        password,
      });

      if (response.data.success) {
        toast.success('Login successful!');
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error(response.data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md w-full'>
        <h1 className='text-2xl font-bold mb-4 text-center'>MyBookStory Admin Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Admin Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:ring focus:ring-indigo-200'
              placeholder='admin@example.com'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700 mb-1'>Admin Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm outline-none focus:ring focus:ring-indigo-200'
              placeholder='enter admin password'
              required
            />
          </div>
          <button
            type='submit'
            disabled={loading}
            className='w-full py-2 px-4 rounded-md bg-black text-white font-semibold hover:bg-gray-800 transition'
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
