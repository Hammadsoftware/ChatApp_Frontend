import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import ChatArea from '../components/ChatArea';

// Initial users (can be empty or pre-filled)
const initialUsers = [
  { id: 1, name: 'Alice', avatar: 'https://i.pravatar.cc/40?img=1' },
  { id: 2, name: 'Bob', avatar: 'https://i.pravatar.cc/40?img=2' },
];

const Home = () => {
  const [users, setUsers] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messagesByUser, setMessagesByUser] = useState({});

  // Add a new user dynamically
  const addUser = (name) => {
    const newUser = {
      id: Date.now(),
      name,
      avatar: `https://i.pravatar.cc/40?u=${name}`,
    };
    setUsers([...users, newUser]);
  };

  // Handle sending a message to the selected user
  const handleSendMessage = (userId, text) => {
    setMessagesByUser((prev) => ({
      ...prev,
      [userId]: [
        ...(prev[userId] || []),
        { id: Date.now(), fromMe: true, text },
      ],
    }));
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar
        users={users}
        onSelectUser={setSelectedUser}
        selectedUserId={selectedUser?.id}
        onAddUser={addUser}
      />
      <ChatArea
        user={selectedUser}
        messages={selectedUser ? messagesByUser[selectedUser.id] || [] : []}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default Home;