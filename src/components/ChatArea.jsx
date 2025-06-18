import React, { useState, useRef, useEffect } from 'react';
import { FaSmileBeam, FaPaperPlane, FaPlus } from 'react-icons/fa';
import { axiosInstance } from '../lib/axios';
import useAuthStore from '../store/useAuthStore';

const ChatArea = ({ user }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const authUser = useAuthStore((state) => state.authUser);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!authUser?._id || !user?._id) return;

      try {
        const res = await axiosInstance.post('/messege/getMessege', {
          sender_id: authUser._id,
          receiver_id: user._id,
        });

        const updated = (res.data || []).map((msg) => ({
          ...msg,
          fromMe: msg.senderId === authUser._id,
        }));

        setMessages(updated);
      } catch (error) {
        console.error('Cascade Error:', error);
      }
    };

    fetchMessages();
  }, [authUser?._id, user?._id]);

  useEffect(() => {
    if (!authUser?._id || !user?._id) return;

    const interval = setInterval(async () => {
      try {
        const res = await axiosInstance.post('/messege/getMessege', {
          sender_id: authUser._id,
          receiver_id: user._id,
        });

        const newMessages = res.data || [];

        setMessages((prevMessages) => {
          const existingIds = new Set(prevMessages.map((msg) => msg._id));
          const merged = [
            ...prevMessages,
            ...newMessages
              .filter((msg) => !existingIds.has(msg._id))
              .map((msg) => ({ ...msg, fromMe: msg.senderId === authUser._id })),
          ];
          return merged;
        });
      } catch (error) {
        console.error('Pulse error:', error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [authUser?._id, user?._id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      const res = await axiosInstance.post('/messege/send', {
        senderId: authUser._id,
        receiverId: user._id,
        text: input.trim(),
        image: '',
      });

      const newMsg = { ...res.data, fromMe: true };
      setMessages((prev) => [...prev, newMsg]);
      setInput('');
    } catch (err) {
      console.error('Ignite error:', err);
    }
  };

  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file || file.size > 2 * 1024 * 1024) {
      return alert('Image must be under 2MB.');
    }

    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const res = await axiosInstance.post('/messege/send', {
          senderId: authUser._id,
          receiverId: user._id,
          text: '',
          image: reader.result,
        });

        const newMsg = { ...res.data, fromMe: true };
        setMessages((prev) => [...prev, newMsg]);
      } catch (err) {
        console.error('Transmission error:', err);
      }
    };

    reader.readAsDataURL(file);
  };

 if (!user?._id) {
  return (
    <div className="flex-1 flex items-center flex-col justify-center bg-gradient-to-br from-black to-gray-900 text-white">
      <h1 className="text-6xl md:text-7xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 drop-shadow-lg">
        ⚡ NovaChat
      </h1>
      <p className="mt-4 pl-15 text-lg text-gray-400">
        Select a chatmate to start chatting!
      </p>
    </div>
  );
}

  return (
    <div className="flex flex-col h-screen flex-1 bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white animate-fadeIn">
      {/* Top bar */}
      <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-6 py-4 shadow border-b border-gray-700">
        <img
          src={user.profilePicture || '/default-avatar.png'}
          alt={user.username}
          className="w-10 h-10 rounded-full object-cover border border-purple-400"
        />
        <div>
          <div className="font-semibold text-lg">{user.username || user.name}</div>
          <div className="text-xs text-gray-400">
            {user.online ? '🟢 Online • Pulse Active' : '🔴 Offline • No Signal'}
          </div>
        </div>
      </div>

      {/* Chat thread */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 transition-all duration-300">
        {messages.map((msg, idx) => (
          <div
            key={msg._id || idx}
            className={`flex items-end group transition-all duration-500 ease-in-out ${
              msg.fromMe ? 'justify-end' : 'justify-start'
            }`}
          >
            {!msg.fromMe && (
              <img
                src={user.profilePicture || '/default-avatar.png'}
                alt="Sender"
                className="w-8 h-8 rounded-full mr-2 mb-1 object-cover border border-purple-400"
              />
            )}
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs break-words shadow-lg animate-slideInUp ${
                msg.fromMe
                  ? 'bg-gradient-to-tr from-blue-600 to-purple-700 text-white rounded-br-sm'
                  : 'bg-gray-800 text-gray-100 rounded-bl-sm'
              }`}
            >
              {msg.text}
              {msg.image && (
                <img
                  src={msg.image}
                  alt="attachment"
                  className="mt-2 max-w-[150px] rounded-md border border-gray-600 shadow"
                />
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Send bar */}
      <form
        onSubmit={handleSend}
        className="flex items-center bg-black/70 backdrop-blur-lg px-4 py-3 border-t gap-2 shadow-inner"
        style={{ position: 'sticky', bottom: 0 }}
      >
        <button
          type="button"
          className="bg-purple-700/70 text-white p-3 rounded-full hover:bg-purple-600 hover:scale-105 transition transform shadow-md"
          onClick={() => fileInputRef.current?.click()}
          aria-label="Add Image"
        >
          <FaPlus />
        </button>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleAddImage}
        />
        <input
          type="text"
          className="flex-1 px-5 py-3 rounded-full border border-gray-700 bg-gray-800 text-white outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-700 transition-all duration-300 shadow-sm"
          placeholder={`Whisper to ${user.username || user.name}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="bg-gradient-to-tr from-purple-600 to-blue-600 text-white p-3 rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-indigo-500/40"
          aria-label="Send"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatArea;
