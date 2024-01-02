/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'
import NavBar from './NavBar'
import Hero from './Hero'
import { useEffect,useState,useContext } from 'react'
import axios from 'axios'
import { Myid } from '../Home'
function Container() {
  
  return (
    <div className=' py-9 min-h-screen bg-gray-50'>
      <div className='w-[85%] m-auto'>
        <NavBar></NavBar>
        <Hero ></Hero>
      </div>
    </div>
  )
}

export default Container