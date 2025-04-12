import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from '../context/ShopContext';
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const {token, login, navigate, backendUrl, register} = useContext(ShopContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (currentState === 'Sign Up') {
      await register({ name, email, password, nickname, city, state, phone });
  } else {
      await login(email, password);
  }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
},[token, navigate])

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="w-[90%] sm:max-w-96 bg-white p-8 rounded-xl shadow-xl">
        <form onSubmit={onSubmitHandler} className="flex flex-col items-center gap-5 text-gray-800">
          
          <div className="inline-flex items-center gap-2 mt-4">
            <p className="text-3xl font-semibold text-gray-900">{currentState}</p>
            <hr className="border-none h-[2px] w-8 bg-gray-900" />
          </div>

          {currentState === "Sign Up" && (
            <>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder-gray-500"
                placeholder="Full Name"
                required
              />
              <input
                onChange={(e) => setNickname(e.target.value)}
                value={nickname}
                type="text"
                className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder-gray-500"
                placeholder="Nickname"
                required
              />
              <input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                type="text"
                className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder-gray-500"
                placeholder="City"
                required
              />
              <input
                onChange={(e) => setState(e.target.value)}
                value={state}
                type="text"
                className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder-gray-500"
                placeholder="State"
                required
              />
              <input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                type="tel"
                className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder-gray-500"
                placeholder="Phone Number"
                required
              />
            </>
          )}

          {/* Email Field */}
          <input
            type="email"
            className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder-gray-500"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Email Address"
            required
          />

          {/* Password Field */}
          <input
            type="password"
            className="w-full px-4 py-3 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-800 placeholder-gray-500"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            required
          />

          {/* Forgot Password & Toggle Login/Signup */}
          <div className="w-full flex justify-between text-sm">
            <p className="text-blue-500 cursor-pointer hover:underline">Forgot Password?</p>
            {currentState === "Login" ? (
              <p onClick={() => setCurrentState("Sign Up")} className="cursor-pointer text-gray-700 hover:text-gray-900">
                Create Account
              </p>
            ) : (
              <p onClick={() => setCurrentState("Login")} className="cursor-pointer text-gray-700 hover:text-gray-900">
                Login Here
              </p>
            )}
          </div>

            

          {/* Submit Button */}
          <button className="w-full px-6 py-3 mt-4 text-white bg-gray-900 rounded-lg hover:bg-gray-700 transition-all">
            {currentState === "Login" ? "Sign In" : "Sign Up"}
          </button>

          {/* Google Authentication Button */}
          <button type="button" className="w-full px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all" onClick={() => window.location.href = `${backendUrl}/api/auth/google`}>
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
