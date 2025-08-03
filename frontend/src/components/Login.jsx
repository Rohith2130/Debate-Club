import React from 'react';
import { useNavigate } from 'react-router-dom';
import Clock from "../assets/Clock.jpg";
import { ToastContainer, toast } from 'react-toastify';
const Login = () => {
  const navigate = useNavigate();

  const notify = () => {
    navigate('/Agents', {
      state: { showToast: true, message: 'Login Success' }
    });
  };

  
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#243c5a] text-[#ffd700] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#243c5a] via-[#37474f] to-[#1a237e] opacity-80"></div>
      <div className="absolute inset-0 bg-radial-gradient from-[rgba(255,215,0,0.2)] via-transparent to-transparent pointer-events-none"></div>

      <div className="bg-[#1a237e] p-8 rounded-2xl shadow-2xl max-w-sm flex flex-col space-y-6 z-10 animate-fade-in">
        <div className="flex justify-center mb-4">
          <img src={Clock} alt="Historical Gaming Logo" className="w-24 h-24 rounded-full border-4 border-[#ffd700]" />
        </div>

        <h1 className="text-4xl font-bold text-center mb-6 tracking-wide uppercase animate-slide-in">
          Time Travel Debate Club
        </h1>

        <div className="flex flex-col space-y-2 animate-slide-in">
          <label htmlFor="username" className="text-lg font-semibold">
            Username (Chronicle Name)
          </label>
          <input
            type="text"
            id="username"
            placeholder="Enter your Chronicle Name..."
            className="bg-[#37474f] text-[#f0e68c] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] transition-shadow duration-300 shadow-md hover:shadow-lg"
          />
        </div>

        <div className="flex flex-col space-y-2 animate-slide-in">
          <label htmlFor="password" className="text-lg font-semibold">
            Password (Ancient Cipher)
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your Ancient Cipher..."
            className="bg-[#37474f] text-[#f0e68c] p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffd700] transition-shadow duration-300 shadow-md hover:shadow-lg"
          />
        </div>

        <button 
          onClick={notify}
          className="bg-[#ffd700] text-[#1a237e] hover:bg-[#ffeb3b] py-3 px-6 rounded-lg font-semibold uppercase tracking-wide transition-colors duration-300 animate-pulse-button"
        >
          Enter the Realm
        </button>
        <ToastContainer/>
      </div>
    </div>
  );
};

export default Login;
