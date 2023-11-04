/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import jwt from 'jwt-decode'
import { akpLogo } from '../../assets/logo'
import axios from 'axios'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Profile from './Profile'
import Cookies from 'universal-cookie'
function NavBar() {
  const [name,setName]=useState("")
  const cookie=new Cookies()
  const token=cookie.get('jwt')
  const data=jwt(token)
  const navigate=useNavigate()
  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_API_GETNAME_ENDPOINT}${data.id}`).then((res)=>{setName(res.data.name);})
  },[])
  function handleLogout(){
    cookie.remove('jwt')
    navigate('/login')
  }
  
  return (
    <div className='flex justify-between '>
      <div className=' flex  '>
        <img className=' w-20 h-20 mix-blend-multiply mr-4 max-lg:w-16 max-lg:h-16' src={akpLogo} alt="Logo" />
        <div className=' mx-4 m-auto'><a href="/home">Home</a></div>
        <div className=' mx-4 m-auto' ><a href="/analytics">Analytics</a></div>
        <div className=' mx-4 m-auto'><a href='/mixing'>Mixing</a></div>
        <div className=' mx-4 m-auto'><a href='/profile'>Setting</a></div>
      </div>
      <div className=' flex space-x-2 ' >
        <p className= 'm-auto' >Hii,{name}</p>
        <button onClick={handleLogout} className='m-auto text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none '>LogOut</button>
      </div>
    </div>
  )
}

export default NavBar