import React, { useEffect } from 'react';
import useAuthStore from '../store/useAuthStore';
import Layout from './Layout.jsx';
import Profile from '../pages/Profile.jsx';

function MainLayout() {
  const { authUser } = useAuthStore();

 
 

  return authUser ? <Layout />: <Profile /> ;
}

export default MainLayout;