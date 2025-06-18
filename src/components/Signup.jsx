import React, { useState } from 'react';
import { FaUserAlt, FaEnvelope, FaLock, FaComments } from 'react-icons/fa';
import { SiChatbot } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';

const Signup = ({ setLogin }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      await axiosInstance.post('/auth/register', form);
      setMessage('Registration successful! Redirecting...');
      setTimeout(() => {
        setLogin(true);
      }, 1500);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Please try again.';
      setMessage(msg);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0f0f1b] via-[#141529] to-[#1a1b2f] text-white">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form
          className="w-full max-w-md bg-[#1e1f35] bg-opacity-90 rounded-2xl shadow-2xl p-8 space-y-6 border border-purple-700"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text">
            Create Account
          </h2>

          {/* Username */}
          <div className="relative group">
            <FaUserAlt className="absolute left-3 top-3 text-purple-400 group-hover:scale-110 transition-transform" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-[#121324] text-white border border-purple-700 rounded-md focus:outline-none focus:border-pink-400 transition-all duration-300"
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <FaEnvelope className="absolute left-3 top-3 text-purple-400 group-hover:scale-110 transition-transform" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-[#121324] text-white border border-purple-700 rounded-md focus:outline-none focus:border-pink-400 transition-all duration-300"
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <FaLock className="absolute left-3 top-3 text-purple-400 group-hover:rotate-12 transition-transform" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full pl-10 pr-4 py-2 bg-[#121324] text-white border border-purple-700 rounded-md focus:outline-none focus:border-pink-400 transition-all duration-300"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold py-2 rounded-md shadow-lg hover:scale-105 hover:shadow-pink-400/30 transition-all duration-300"
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>

          {/* Message */}
          {message && (
            <div className="text-center text-pink-300 mt-2 animate-fade-in">
              {message}
            </div>
          )}

          <div className="text-center mt-4 text-sm text-purple-300">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => setLogin(true)}
              className="text-pink-400 underline hover:text-pink-300 transition-all"
            >
              Login
            </button>
          </div>
        </form>
      </div>

      {/* Right: Nova Chat Showcase */}
      <div className="w-full md:w-1/2 flex items-center justify-center relative p-6">
        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center mb-6">
            <FaComments className="text-6xl text-purple-400 drop-shadow-lg animate-bounce" />
            <span className="mx-2 text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-lg">
              NovaChat
            </span>
            <SiChatbot className="text-6xl text-pink-400 drop-shadow-lg animate-bounce delay-100" />
          </div>
          <p className="text-center text-purple-300 text-lg max-w-sm px-4">
            Start your journey with <span className="font-bold text-pink-400">NovaChat</span> — chat smarter, better, and beautifully.
          </p>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4 opacity-60">
            <span className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></span>
            <span className="w-3 h-3 bg-pink-400 rounded-full animate-pulse delay-150"></span>
            <span className="w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-300"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
