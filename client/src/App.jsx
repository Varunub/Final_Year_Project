/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import './index.css'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Profile from './components/Dashboard/Profile'
import Analytics from './components/Dashboard/Analytics'
function App() {
  return (

    <BrowserRouter>
        <Routes>
          
            <Route path="/*" element={<Home></Home>}></Route>
            <Route path="/login" element={<LoginForm></LoginForm>}></Route>
            <Route path="/register" element={<RegisterForm></RegisterForm>}></Route>
            <Route path="/home" element={<Home></Home>}></Route>
            <Route path="/profile" element={<Profile></Profile>}></Route>
            <Route path="/analytics" element={<Analytics></Analytics>}></Route>

       </Routes>
    </BrowserRouter>
    
    // <>
    
    // <RegisterForm></RegisterForm>
    // </>
  )
}

export default App