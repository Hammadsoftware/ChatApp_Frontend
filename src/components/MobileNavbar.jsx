import React, { useState } from 'react';
import { FaBars, FaEllipsisV, FaComments, FaUser, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const MobileNavbar = ({ onSidebarOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const authUser = useAuthStore((state) => state.authUser);

  return (
    <nav className="md:hidden flex items-center justify-between px-4 py-3 bg-black text-white sticky top-0 z-50 shadow">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-bold text-green-400">
        <FaComments className="text-2xl" />
        NovaChat
      </div>

      {/* Right controls: Sidebar + Dropdown */}
      <div className="flex items-center gap-2 relative">
        <button
          className="p-2 rounded-full hover:bg-white/10 transition"
          onClick={onSidebarOpen}
          aria-label="Open sidebar"
        >
          <FaBars className="text-2xl" />
        </button>

        <button
          className="p-2 rounded-full hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <FaEllipsisV className="text-2xl" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 top-14 w-48 bg-[#111] border border-gray-700 rounded-xl shadow-lg z-50">
            {/* Logged-in User Info */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-700">
              <img
                src={authUser?.profilePicture || authUser?.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border border-green-400"
              />
              <div className="text-sm">
                <div className="font-semibold text-green-400 truncate">
                  {authUser?.username || 'Guest'}
                </div>
                <div className="text-xs text-gray-400 truncate">{authUser?.email || ''}</div>
              </div>
            </div>

            {/* Dropdown Options */}
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-green-500 hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaUser /> Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-green-500 hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaCog /> Settings
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MobileNavbar;
