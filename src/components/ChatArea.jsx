import React, { useState, useRef, useEffect, useCallback } from 'react';
import { FaPaperPlane, FaPlus } from 'react-icons/fa';
import { axiosInstance } from '../lib/axios';
import useAuthStore from '../store/useAuthStore';
import socket from '../lib/socket';

const ChatArea = ({ user }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const authUser = useAuthStore((state) => state.authUser);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Load chat history
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
        console.error('Fetch Error:', error);
      }
    };

    fetchMessages();
  }, [authUser?._id, user?._id]);

  // Join room & receive real-time messages
  useEffect(() => {
    if (!authUser?._id || !user?._id) return;

    const roomId = [authUser._id, user._id].sort().join('_');
    socket.emit('join-room', { senderId: authUser._id, receiverId: user._id });

    const handleReceive = (msg) => {
      const isActiveChat =
        (msg.senderId === user._id && msg.receiverId === authUser._id) ||
        (msg.senderId === authUser._id && msg.receiverId === user._id);

      if (isActiveChat) {
        setMessages((prev) => [...prev, { ...msg, fromMe: msg.senderId === authUser._id }]);
      }
    };

    socket.on('receive-message', handleReceive);

    return () => {
      socket.off('receive-message', handleReceive);
    };
  }, [authUser?._id, user?._id]);

  // Send text message
  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      senderId: authUser._id,
      receiverId: user._id,
      text: input.trim(),
      image: '',
    };

    try {
      const res = await axiosInstance.post('/messege/send', newMessage);
      const sentMsg = { ...res.data, fromMe: true };
      setMessages((prev) => [...prev, sentMsg]);
      socket.emit('send-message', res.data);
      setInput('');
    } catch (err) {
      console.error('Send error:', err);
    }
  };

  // Send image
  const handleAddImage = async (e) => {
    const file = e.target.files[0];
    e.target.value = '';
    if (!file || file.size > 2 * 1024 * 1024) return alert('Image must be under 2MB.');

    const reader = new FileReader();
    reader.onloadend = async () => {
      const imageMessage = {
        senderId: authUser._id,
        receiverId: user._id,
        text: '',
        image: reader.result,
      };

      try {
        const res = await axiosInstance.post('/messege/send', imageMessage);
        const sentMsg = { ...res.data, fromMe: true };
        setMessages((prev) => [...prev, sentMsg]);
        socket.emit('send-message', res.data);
      } catch (err) {
        console.error('Image error:', err);
      }
    };

    reader.readAsDataURL(file);
  };

  if (!user?._id) {
    return (
      <div className="flex-1 flex items-center justify-center flex-col bg-black text-white">
        <h1 className="text-5xl font-bold">⚡ NovaChat</h1>
        <p className="text-gray-400 mt-4">Select a chatmate to start chatting!</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen flex-1 bg-gradient-to-b from-black via-gray-900 to-gray-950 text-white">
      {/* Header */}
      <div className="flex items-center gap-3 bg-black/60 px-6 py-4 border-b border-gray-700">
        <img
          src={user.profilePicture || '/default-avatar.png'}
          className="w-10 h-10 rounded-full border border-purple-400"
        />
        <div>
          <div className="font-semibold text-lg">{user.username || user.name}</div>
          <div className="text-xs text-gray-400">
            {user.online ? '🟢 Online' : '🔴 Offline'}
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map((msg, idx) => (
          <div
            key={msg._id || idx}
            className={`flex ${msg.fromMe ? 'justify-end' : 'justify-start'}`}
          >
            {!msg.fromMe && (
              <img
                src={user.profilePicture || '/default-avatar.png'}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <div
              className={`px-4 py-2 rounded-2xl max-w-xs shadow ${
                msg.fromMe
                  ? 'bg-gradient-to-tr from-blue-600 to-purple-700 text-white'
                  : 'bg-gray-800 text-gray-100'
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

      {/* Input */}
      <form onSubmit={handleSend} className="flex px-4 py-3 border-t gap-2 bg-black/70">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="bg-purple-700 text-white p-3 rounded-full"
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
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2 bg-gray-800 rounded-full border border-gray-700 text-white outline-none"
          placeholder={`Message ${user.username || user.name}`}
        />
        <button
          type="submit"
          className="bg-gradient-to-tr from-purple-600 to-blue-600 text-white p-3 rounded-full"
        >
          <FaPaperPlane />
        </button>
      </form>
    </div>
  );
};

export default ChatArea;
