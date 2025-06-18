import React, { useState } from 'react';
import { FaBars, FaEllipsisV, FaComments, FaUser, FaCog } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const MobileNavbar = ({ onSidebarOpen }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="md:hidden flex items-center justify-between px-4 py-3 bg-black text-white sticky top-0 z-50 shadow">
      {/* Logo on the left */}
      <div className="flex items-center gap-2 text-xl font-bold text-green-400">
        <FaComments className="text-2xl" />
        ChatApp
      </div>
      {/* Hamburger and 3-dot menu on the right */}
      <div className="flex items-center gap-2">
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
        {/* Dropdown menu */}
        {menuOpen && (
          <div className="absolute right-4 top-14 bg-gray-900 rounded shadow-lg py-2 w-40 z-50">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-green-400 hover:text-black transition"
              onClick={() => setMenuOpen(false)}
            >
              <FaUser /> Profile
            </Link>
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-green-400 hover:text-black transition"
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