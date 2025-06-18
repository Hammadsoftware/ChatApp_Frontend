import React, { useState } from 'react';
import { FaBars, FaEllipsisV, FaComments, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/useAuthStore';

const MobileNavbar = ({ onSidebarOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const authUser = useAuthStore((state) => state.authUser);

  return (
    <nav className="md:hidden flex items-center justify-between px-4 py-3 bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e] text-white sticky top-0 z-50 shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2 text-xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
        <FaComments className="text-2xl" />
        NovaChat
      </div>

      {/* Sidebar + Dropdown */}
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

        {/* Dropdown */}
        {menuOpen && (
          <div className="absolute right-0 top-14 w-52 bg-[#1a1a2e] bg-opacity-95 backdrop-blur border border-purple-800 rounded-xl shadow-2xl z-50">
            {/* User Info */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-purple-900">
              <img
                src={authUser?.profilePicture || authUser?.avatar || '/default-avatar.png'}
                alt="Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-pink-500"
              />
              <div className="text-sm overflow-hidden">
                <div className="font-semibold text-purple-300 truncate">
                  {authUser?.username || 'Unknown'}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {authUser?.email || 'No email'}
                </div>
              </div>
            </div>

            {/* Settings */}
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-pink-600 hover:text-white transition-all duration-200"
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
