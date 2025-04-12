import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    const { books, user, token, setBooks, currency } = useContext(ShopContext);
    const navigate = useNavigate();
    const location = useLocation();
    const { book } = location.state || {};
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState('paystack');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        landmark: '',
        country: '',
        phone: '',
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
    const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const amount = Number(book.price)

        
        
        

        let orderData = {
            address: formData,
            book: book,
            amount,
            method,
            user
        }

        try {
            console.log("order Data");
            
            console.log(orderData);
            if (method === "paystack") {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/paystack`,
                    orderData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                const { authorization_url } = response.data;
                if (authorization_url) {
                    window.location.href = authorization_url; // Redirect to Paystack
                } else {
                    toast.error("Could not initialize Paystack payment.");
                    setLoading(false);
                }
            }
            else {
                toast.error("COD coming soon. Please select Paystack for now.");
                setLoading(false);
            }
        } catch (error) {

            console.error("Order error:", error);
            toast.error("Something went wrong while placing your order.");
            setLoading(false);
        }
    };

    const animationSettings = {
        initial: { opacity: 0, x: 40 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -40 },
        transition: { duration: 0.4 },
    };

    useEffect(() => {
        if (!book) navigate('/');

        if (user) {
            const [firstName = '', lastName = ''] = user.name?.split(' ') || [];
        
            setFormData((prev) => ({
              ...prev,
              firstName: firstName,
              lastName: lastName,
              email: user.email || '',
              phone: user.phone || '',
              city: user.city || '',
              state: user.state || '',
            }));
          }
    }, [book, user]);

    return (
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center px-4 sm:px-12 py-10 gap-8 max-w-4xl mx-auto">
            <div className="w-full bg-white p-6 rounded-xl shadow-lg">
                {/* Stepper Header */}
                <div className="flex justify-between mb-8">
                    <div className={`flex-1 text-center font-medium ${step === 1 ? 'text-blue-600' : 'text-gray-400'}`}>1. Delivery Info</div>
                    <div className={`flex-1 text-center font-medium ${step === 2 ? 'text-blue-600' : 'text-gray-400'}`}>2. Payment</div>
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" {...animationSettings} className="space-y-4">
                            <div className="flex gap-3">
                                <input required name="firstName" value={formData.firstName} onChange={onChangeHandler} placeholder="First Name" className="input bg-gray-100" />
                                <input required name="lastName" value={formData.lastName} onChange={onChangeHandler} placeholder="Last Name" className="input bg-gray-100" />
                            </div>
                            <input required name="email" value={formData.email} onChange={onChangeHandler} type="email" placeholder="Email" className="input bg-gray-100" />
                            <input required name="street" value={formData.street} onChange={onChangeHandler} placeholder="Street" className="input" />
                            <div className="flex gap-3">
                                <input required name="city" value={formData.city} onChange={onChangeHandler} placeholder="City" className="input bg-gray-100" />
                                <input required name="state" value={formData.state} onChange={onChangeHandler} placeholder="State" className="input bg-gray-100" />
                            </div>
                            <div className="flex gap-3">
                                <textarea required name="landmark" value={formData.landmark} onChange={onChangeHandler} placeholder="Landmark or description" className="input resize-none h-[80px]" />
                                <input required name="country" value={formData.country} onChange={onChangeHandler} placeholder="Country" className="input" />
                            </div>
                            <input required name="phone" value={formData.phone} onChange={onChangeHandler} placeholder="Phone Number" type="tel" className="input bg-gray-100" />
                            <div className="text-end pt-4">
                                <button type="button" onClick={nextStep} className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Next</button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div key="step2" {...animationSettings} className="space-y-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Payment Method</h3>
                                <div className="flex flex-col gap-3 sm:flex-row">
                                    <div
                                        onClick={() => setMethod('paystack')}
                                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${method === 'paystack' ? 'bg-green-100 border-green-400' : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border ${method === 'paystack' ? 'bg-green-400' : ''}`} />
                                        <span className="text-sm text-gray-700">PayStack</span>
                                    </div>
                                    <div
                                        onClick={() => setMethod('cod')}
                                        className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${method === 'cod' ? 'bg-green-100 border-green-400' : 'hover:bg-gray-100'
                                            }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full border ${method === 'cod' ? 'bg-green-400' : ''}`} />
                                        <span className="text-sm text-gray-700">Cash on Delivery(Coming Soon)</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 mb-4">
                                <img src={book?.image[0]} alt={book?.name} className="w-16 h-20 object-cover rounded" />
                                <div>
                                    <p className="font-medium">{book?.name}</p>
                                    <p className="text-sm text-gray-600">{currency}{book?.price}</p>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xl font-semibold mb-2">Total Cost</h3>
                                <div className="text-sm space-y-2">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>{currency}{book.price}.00</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shipping</span>
                                        <span>{currency}.00</span>
                                    </div>
                                    <div className="flex justify-between font-bold">
                                        <span>Total</span>
                                        <span>{currency}{book.price}.00</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-between pt-4">
                                <button type="button" onClick={prevStep} className="text-sm px-5 py-2 rounded border border-gray-400 hover:bg-gray-100 transition">Back</button>
                                <button type="submit" disabled={loading} className={`text-sm px-6 py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'} transition`}>
  {loading ? "Processing..." : "Place Order"}
</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
            {loading && (
                <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="w-12 h-12 border-4 border-white border-t-blue-600 rounded-full animate-spin"></div>
                </div>
            )}
        </form>


    );
};

export default PlaceOrder;
