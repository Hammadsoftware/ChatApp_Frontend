import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaCog, FaEllipsisV } from 'react-icons/fa';
import useAuthStore from '../store/useAuthStore';

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const authUser = useAuthStore((state) => state.authUser);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 50) {
        setShow(true);
      } else if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (!e.target.closest('.mobile-menu') && !e.target.closest('.menu-toggle')) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('mousedown', handleClickOutside);
    return () => window.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <nav
      className={`sticky top-0 z-50 px-6 py-3 flex justify-between items-center transition-transform duration-300
        ${show ? 'translate-y-0' : '-translate-y-full'}
        bg-[#0f0f1b]/80 backdrop-blur-md shadow-xl border-b border-[#6a00f4]`}
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-3 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 drop-shadow-md">
        <FaComments className="text-3xl" />
        NovaChat
      </div>

      {/* Desktop */}
      <div className="hidden md:flex items-center gap-6">
        {authUser && (
          <div className="flex items-center gap-2 text-pink-300 font-medium">
            <img
              src={authUser.profilePicture || '/default-avatar.png'}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover border border-pink-500 shadow-sm hover:scale-105 transition-transform duration-200"
            />
            <span>{authUser.username}</span>
          </div>
        )}
        <Link
          to="/settings"
          className="flex items-center gap-2 text-white hover:text-purple-400 transition duration-200"
        >
          <FaCog /> Settings
        </Link>
      </div>

      {/* Mobile Dropdown */}
      <div className="md:hidden relative">
        <button
          className="menu-toggle p-2 rounded-full hover:bg-white/10 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaEllipsisV className="text-white text-xl" />
        </button>

        {menuOpen && (
          <div className="mobile-menu absolute right-0 top-14 w-44 bg-[#151524] border border-purple-600 rounded-xl shadow-xl z-50 animate-fade-in">
            {authUser && (
              <div className="flex items-center gap-2 px-4 py-2 text-purple-300 font-semibold border-b border-purple-800">
                <img
                  src={authUser.profilePicture || '/default-avatar.png'}
                  alt="User"
                  className="w-6 h-6 rounded-full object-cover border border-purple-500"
                />
                <span>{authUser.username}</span>
              </div>
            )}
            <Link
              to="/settings"
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-purple-500 hover:text-black transition"
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

export default Navbar;
