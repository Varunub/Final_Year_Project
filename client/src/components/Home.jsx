/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import Dashboard from './Dashboard/Dashboard'
import { useNavigate } from 'react-router-dom'
import { MyContext } from './Context/MyContext'

export const MyHandleLogout =React.createContext()
export const Myid=React.createContext()
function Home() {
  const [state,setState]=useState(false)
  const cookie=new Cookies()
  const navigate=useNavigate();
 
  useEffect(()=>{
      if(cookie.get("jwt")){
        setState(true)
      }
      else{
        setState(false)
        navigate("/")
      }
  },[])

  
  return (
    <>
        {state?
        <div className=' overflow-auto scrollbar-hide'><Dashboard></Dashboard></div>:navigate('/login')}
    </>
  )
}

export default Home