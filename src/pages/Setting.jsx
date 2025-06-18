import React, { useState } from 'react';
import { FaCamera, FaPen } from 'react-icons/fa';
import useAuthStore from '../store/useAuthStore';
import { axiosInstance } from '../lib/axios';

const Settings = () => {
  const authUser = useAuthStore((state) => state.authUser);
  const setAuthUser = useAuthStore((state) => state.setAuthUser);

  const defaultAvatar = '/images.png';
  const [username, setUsername] = useState(authUser?.username || '');
  const [email, setEmail] = useState(authUser?.email || '');
  const [picture, setPicture] = useState(authUser?.picture || '');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(authUser?.picture || defaultAvatar);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!authUser) {
    return (
      <div className="p-8 text-center text-pink-400 text-xl">
        Please log in to update your profile.
      </div>
    );
  }

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // ✅ Validate image type
    if (!selected.type.startsWith('image/')) {
      setMessage('Only image files are allowed.');
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result); // base64 string
    };
    reader.readAsDataURL(selected);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    if (!username || !email) {
      setMessage('Please fill all fields.');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        _id: authUser._id,
        username,
        email,
        picture, // base64 image
      };

      const res = await axiosInstance.put('/auth/update-profile', payload, {
        withCredentials: true,
      });

      setAuthUser(res.data.user);
      setMessage('Profile updated successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f1b] via-[#1a1b2f] to-[#121324] flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-[#1c1e35] rounded-2xl p-8 shadow-2xl border border-purple-800">
        <h2 className="text-4xl font-bold text-center mb-6 text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text">
          Update Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 items-center">
          {/* Avatar with Camera Button */}
          <div className="relative group">
            <img
              src={preview}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover border-4 border-purple-500 shadow-md group-hover:scale-105 transition-all"
            />
            {/* Camera Button Overlay */}
            <label className="absolute bottom-0 right-1 cursor-pointer bg-purple-600 p-2 rounded-full shadow-md hover:bg-pink-500 transition-all border border-white">
              <FaCamera className="text-white text-sm" />
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="w-full relative">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 rounded-lg bg-[#121324] border border-purple-600 text-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
            />
            <FaPen className="absolute right-3 top-3 text-purple-400" />
          </div>

          <div className="w-full relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 rounded-lg bg-[#121324] border border-purple-600 text-purple-200 focus:outline-none focus:ring-2 focus:ring-pink-500 pr-10"
            />
            <FaPen className="absolute right-3 top-3 text-purple-400" />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transition-all shadow-md hover:shadow-pink-500/30 hover:scale-105 active:scale-95"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>

          {message && (
            <p className="text-center text-pink-300 animate-fade-in">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Settings;
