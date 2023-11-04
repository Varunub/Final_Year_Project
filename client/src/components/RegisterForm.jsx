/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { akpLogo } from '../assets/logo'
import Cookies from 'universal-cookie'
function RegisterForm() {
    const cookie=new Cookies();
    const [state,setState]=useState(false)
    useEffect(()=>{
      if(cookie.get("jwt")){
        setState(true)
      }
      else{
        setState(false)
      }
    },[])
    const data={
        employee:"",
        name:"",
        username:"",
        phone:"",
        password:"",
        confirm:""
    }
    const navigate=useNavigate();
    const [current,setData]=useState(data)
    function handleChange(e){
        // console.log(e.target.name,e.target.value)
        setData((prev)=>{
            return {...prev,[e.target.name]:e.target.value}
        })
        // console.log("data",current)
    }
    async function handelSubmit(e){
        e.preventDefault();
        setData(data)
        if(current.password==current.confirm){
            const res=await axios.post(import.meta.env.VITE_API_REGISTER_ENDPOINT,current)
            console.log(res.data.msg)
            alert(res.data.msg)
            
            // console.log(ares)
            navigate('/login')
            // history.pusn('/login')
        }
        else{
            alert("password and confirm doesn't match")
        }
    }
    function render(){
      return (
        <section className=' bg-gray-50 pt-2 bg-cover '>
          <div className=' flex flex-col items-center justify-center px-6 py-8 mx-auto '>
            
            <a href="#" className=' flex items-center text-2xl font-semibold text-gray-900'> 
              <img className='w-20 h-20 mr-2 mix-blend-multiply max-lg:w-16 max-lg:h-16' src={akpLogo} />
            </a>
            <div className=' w-[35%] px-6 py-7 m-4 shadow-2xl rounded-lg bg-white max-sm:w-[95%] max-lg:w-[70%]'>
              <h1 className=' text-xl font-bold text-gray-900'>Create Account</h1>
              <div className='m-5 leading-9 tracking-wide' >
                <form onSubmit={handelSubmit} >
                  <div className=' my-3'>
                    <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="employee">Employee ID</label>
                    <input name='employee' value={current.employee} onChange={handleChange} type='text' placeholder='eg:AKPXXXXX' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  max-sm:p-1.5" />
                  </div>
                  <div className=' my-3'>
                    <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="username">Your Name</label>
                    <input name='name' value={current.name} onChange={handleChange} type='text' placeholder='eg:John wick' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  max-sm:p-1.5" />
                  </div>
                  <div className=' my-3'>
                    <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="username">Your email</label>
                    <input name='username' value={current.username} onChange={handleChange} type='text' placeholder='name@company.com' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-sm:p-1.5" />
                  </div>
                  <div className=' my-3'>
                    <label htmlFor="phone" className='block mb-2 text-sm font-medium text-gray-900'>Phone number</label>
                    <input name='phone' value={current.phone} onChange={handleChange} type="phone" placeholder='+91' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-sm:p-1.5" />
                  </div>
                  <div className=' my-3'>
                    <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
                    <input name='password' value={current.password} onChange={handleChange} type="password" placeholder='********' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-sm:p-1.5" />
                  </div>
                  <div className=' my-3'>
                      <label htmlFor="confirm" className='block mb-2 text-sm font-medium text-gray-900'>Confirm password</label>
                    <input name='confirm' value={current.confirm} onChange={handleChange} type="password" placeholder='********' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-sm:p-1.5" />
                  </div>
                  <button className=' mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none ' >Create an account</button>
                </form>
              </div>
              <p className='text-sm font-light text-center text-gray-500'>Already have an account? <a href="/login" className=' font-medium text-blue-700' >Login here</a></p>
            </div>
          </div>
        </section>
      )
    }
  return (
    <>
      {(state)?navigate("/home"):render()}
    </>
  )
}

export default RegisterForm