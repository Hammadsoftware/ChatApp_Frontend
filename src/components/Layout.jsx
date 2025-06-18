import React, { useState } from 'react';
import Navbar from './NavBar';
import MobileNavbar from './MobileNavbar';
import Sidebar from './Sidebar';
import ChatArea from './ChatArea';

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

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
        />
      )}

      <div className="flex flex-1">
        <Sidebar
          isOpen={sidebarOpen}
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
