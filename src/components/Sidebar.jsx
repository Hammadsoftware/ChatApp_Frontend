import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../lib/axios';
import useAuthStore from '../store/useAuthStore';

const Sidebar = ({ onSelectUser }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const authUser = useAuthStore((state) => state.authUser);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axiosInstance.get('/auth/getAllUser', { withCredentials: true });
        const userList = Array.isArray(res.data) ? res.data : res.data.users || [];
        const filtered = userList.filter((user) => user._id !== authUser?._id);
        setUsers(filtered);
      } catch (err) {
        setUsers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAllUsers();
  }, [authUser?._id]);

  return (
    <div className="w-72 h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white shadow-2xl border-r border-purple-800 overflow-y-auto backdrop-blur-xl">
      {/* Branding */}
      <div className="p-5 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-wide">
        ⚡ NovaChat
      </div>

      {/* Loading or Empty */}
      {loading ? (
        <div className="p-6 text-purple-300 text-center animate-pulse">Fetching vibes...</div>
      ) : users.length === 0 ? (
        <div className="p-6 text-pink-300 text-center">No chatmates found 💔</div>
      ) : (
        <div className="p-2 space-y-3">
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => onSelectUser?.(user)}
              className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 hover:backdrop-blur-md transition-all duration-300 cursor-pointer shadow-sm hover:shadow-pink-500/30 group"
            >
              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.profilePicture || user.picture || user.avatar || '/default-avatar.png'}
                  alt={user.username || 'User'}
                  className="w-11 h-11 rounded-full object-cover border-2 border-pink-500 shadow-md"
                />
                <span
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-gray-900 ${
                    user.online ? 'bg-green-400 animate-pulse' : 'bg-gray-500'
                  }`}
                  title={user.online ? 'Online' : 'Offline'}
                ></span>
              </div>

              {/* Username */}
              <div className="flex-1 text-sm font-semibold text-white group-hover:text-pink-400 transition duration-200">
                {user.username || user.name}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
