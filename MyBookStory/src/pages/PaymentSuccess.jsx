import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);
  const reference = searchParams.get('reference');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/order/verify/${reference}`);
        const orderStatus = res.data?.order?.status;
  
        if (orderStatus === 'paid') {
          setStatus('success');
          toast.success("Payment verified successfully!");
        } else {
          setStatus('failed');
          toast.error("Payment not confirmed.");
        }
      } catch (err) {
        setStatus('failed');
        toast.error("Payment verification failed.");
      } finally {
        setLoading(false);
      }
    };
  
    if (reference) verifyPayment();
  }, [reference]);
  

  if (loading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      {status === 'success' ? (
        <>
          <h2 className="text-3xl font-bold text-green-600">Payment Successful!</h2>
          <p className="mt-2 text-gray-700">Your order has been confirmed. Thank you!</p>
          <p className="mt-1 text-sm text-gray-500">Reference: <code className="text-blue-600">{reference}</code></p>
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-red-600">Payment Failed</h2>
          <p className="mt-2 text-gray-700">We could not verify your payment. Please try again.</p>
        </>
      )}
      <button
        onClick={() => window.location.href = '/'}
        className="mt-6 px-6 py-2 bg-black text-white rounded hover:bg-gray-800 transition"
      >
        Continue Shopping
      </button>
    </div>
  );
};

export default PaymentSuccess;
