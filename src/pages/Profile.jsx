import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Signup from '../components/Signup.jsx';
import Login from '../components/Login.jsx';



const AuthRender = () => {
    
  const [login,setLogin] = useState(true);


  return (
    <div>
    {login ? <Login  setLogin={setLogin}/> : <Signup  setLogin={setLogin}  />}
    </div>
  );
};

export default AuthRender;