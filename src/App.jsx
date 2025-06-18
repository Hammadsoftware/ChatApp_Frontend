import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Profile from './pages/Profile.jsx';


import { useEffect } from 'react';
import MainLayout from './components/MainLayout.jsx';
import Setting from './pages/Setting.jsx';

function App() {

 

  return (
    <BrowserRouter>
      <Routes>
        {/* "/" route renders Layout, which can conditionally render content */}
        <Route path="/" element={<MainLayout />}/>
        {/* "/profile" route always renders Profile */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Setting />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;