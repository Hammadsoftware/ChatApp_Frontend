import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import MobileNavbar from './MobileNavbar';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';
import { axiosInstance } from '../lib/axios';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
 

  return (
    <div className="min-h-screen flex flex-col">
      {/* Desktop Navbar */}
      <div className="hidden md:block">
        <Navbar />
      </div>
      {/* Mobile Navbar */}
      <div className="block md:hidden">
        <MobileNavbar onSidebarOpen={() => setSidebarOpen(true)} />
      </div>
      <div className="flex flex-1">
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          onSelectUser={setSelectedUser}
         
  
        />
        <div className="flex-1 flex">
          <ChatArea
            user={selectedUser}
            messages={messages}
            setMessages={setMessages}
          
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;