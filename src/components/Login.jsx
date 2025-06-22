import React, { useState, useEffect } from 'react';
import { FaEnvelope, FaLock, FaComments } from 'react-icons/fa';
import { SiChatbot } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../lib/axios';
import Loader from './Loader';
import useAuthStore from '../store/useAuthStore';
import socket from '../lib/socket'; // ✅ import socket instance

const Login = ({ setLogin }) => {
  const setAuthUser = useAuthStore((state) => state.setAuthUser);
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  // ✅ Optional: Log socket connection
  useEffect(() => {
    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
    });

    return () => socket.off('connect');
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    if (!form.email || !form.password) {
      setMessage('Please fill all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await axiosInstance.post(
        '/auth/login',
        { email: form.email, password: form.password },
        { withCredentials: true }
      );

      setAuthUser(res.data.user);

      // ✅ Emit login event to Socket.IO server
      socket.emit('new-user', res.data.user._id);

      setMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed. Please try again.');
    }
    setLoading(false);
  };
  if (loading){
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#141529] to-[#1a1b2f] text-white">
        <div className="text-2xl font-bold text-purple-400"><Loader/></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-[#0f0f1b] via-[#141529] to-[#1a1b2f] text-white">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <form
          className="w-full max-w-md bg-[#1e1f35] bg-opacity-90 rounded-2xl shadow-2xl p-8 space-y-6 border border-purple-700"
          onSubmit={handleSubmit}
        >
          <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 text-transparent bg-clip-text">
            Welcome Back
          </h2>

          <div className="relative group">
            <FaEnvelope className="absolute left-3 top-3 text-purple-400 group-hover:scale-110 transition-transform" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-[#121324] text-white border border-purple-700 rounded-md focus:outline-none focus:border-pink-400 transition-all duration-300"
              required
            />
          </div>

          <div className="relative group">
            <FaLock className="absolute left-3 top-3 text-purple-400 group-hover:rotate-12 transition-transform" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-2 bg-[#121324] text-white border border-purple-700 rounded-md focus:outline-none focus:border-pink-400 transition-all duration-300"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-semibold py-2 rounded-md shadow-lg hover:scale-105 hover:shadow-pink-400/30 transition-all duration-300"
          >
            {loading ? 'Logging In...' : 'Login'}
          </button>

          {message && (
            <div className="text-center text-pink-300 mt-2 animate-fade-in">
              {message}
            </div>
          )}

          <div className="text-center mt-4 text-sm text-purple-300">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => setLogin(false)}
              className="text-pink-400 underline hover:text-pink-300 transition-all"
            >
              Sign Up
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
            Chat in style. Stay connected with <span className="font-bold text-pink-400">NovaChat</span> — your next-gen chat experience.
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

export default Login;
