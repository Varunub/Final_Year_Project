/* eslint-disable no-unused-vars */

import React,{useState} from 'react'
import { akpLogo } from '../assets/logo';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function ForgotPasswordForm() {
    const data={
        email:"",
        password:"",
        confirmPassword:""
    }
    const [current,setCurrent]=useState(data)
    const navigate=useNavigate();

    async function handelSubmit(e){
        e.preventDefault();
        console.log(current)
        if(current.password[0]==current.confirmPassword[0]){
          const res=await axios.put(import.meta.env.VITE_API_RESETPASSWORD_ENDPOINT,current)
          console.log(res.data.msg)
          alert(res.data.msg)
          
          // console.log(ares)
          navigate('/login')
      }
      else{
          alert("password and confirm doesn't match")
      }
    }

    function handleChange(e){
        setCurrent((prev)=>{
            return {...prev,[e.target.name]:[e.target.value]}
        })
    }
   
  return (
    <div>
        <section className=' min-h-screen bg-gray-50 bg-cover '>
        <div className=' flex flex-col items-center justify-center px-6 py-8 mx-auto '>
          
          <a href="#" className=' flex items-center text-2xl font-semibold text-gray-900'> 
            <img className='w-20 h-20 mr-2 mix-blend-multiply max-lg:w-16 max-lg:h-16' src={akpLogo} />
          </a>
          <div className=' w-[35%] px-6 py-7 m-4 shadow-2xl rounded-lg bg-white max-sm:w-[95%] max-lg:w-[70%]'>
            <h1 className=' text-xl font-bold text-gray-900'>Change Password</h1>
            <div className='m-5 leading-9 tracking-wide' >
              <form onSubmit={handelSubmit} >
                <div className=' my-3'>
                  <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="email">Your email</label>
                  <input name='email' value={current.email} onChange={handleChange} type='text' placeholder='name@company.com' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-sm:p-1.5 " />
                </div>
                <div className=' my-3'>
                  <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
                  <input name='password' value={current.password} onChange={handleChange} type="password" placeholder='********' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  max-sm:p-1.5" />
                </div>
                <div className=' my-3'>
                  <label htmlFor="confirmPassword" className='block mb-2 text-sm font-medium text-gray-900'>Confirm Password</label>
                  <input name='confirmPassword' value={current.confirmPassword} onChange={handleChange} type="password" placeholder='********' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  max-sm:p-1.5" />
                </div>
                
                <button className=' mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none ' >Reset Password</button>
                
              </form>
            </div>
          </div>
        </div>
    </section>
    </div>
  )
}
