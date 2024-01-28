/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useState } from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import jwt from 'jwt-decode'
import Cookies from 'universal-cookie'
const cookie=new Cookies();
function DataForm(props) {
  const data ={
    empid:"",
    temp:"",
    gcs:"",
    comp:"",
    moist:"",
    perm:""
  }
  const [current,setData]=useState(data)

  function handelSubmit(e){
    e.preventDefault()
    const token=cookie.get("jwt")
    const data1=jwt(token)
    current.empid=data1.id;
    axios.post(import.meta.env.VITE_API_INSERTRECORD_ENDPOINT,current).then(res=>{
      alert(res.data.msg)
    });
    
    setData(data);
  }
  function handleChange(e){
    setData((prev)=>{
      return {...prev,[e.target.name]:[e.target.value]}
    })
  }
  return (
    <section className=' '>
        <div className=' flex flex-col items-center '>
          <button className=' p-2 border-2 text-4xl text-gray-400 rounded-full hover:text-black' onClick={props.closeModal}><AiOutlineClose></AiOutlineClose></button>
          <div className=' w-[35%] px-6 py-7 m-4 shadow-2xl rounded-lg bg-white max-sm:w-[95%] max-lg:w-[70%]'>
            <h1 className=' text-xl font-bold text-gray-900'>Enter Data</h1>
            <div className='m-5 leading-9 tracking-wide' >
              <form onSubmit={handelSubmit} >
                <div className=' my-3'>
                  <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="username">Temperature</label>
                  <input name='temp' value={current.temp} onChange={handleChange} type='number' placeholder='' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-sm:p-1.5 " />
                </div>
                <div className=' my-3'>
                  <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="username">GCS</label>
                  <input name='gcs' value={current.gcs} onChange={handleChange} type='number' placeholder='' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-sm:p-1.5 " />
                </div>
                <div className=' my-3'>
                  <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="username">Compactibility</label>
                  <input name='comp' value={current.comp} onChange={handleChange} type='number' placeholder='' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-sm:p-1.5 " />
                </div>
                <div className=' my-3'>
                  <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="username">Moisture</label>
                  <input name='moist' value={current.moist} onChange={handleChange} type='number' placeholder='' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-sm:p-1.5 " />
                </div>
                <div className=' my-3'>
                  <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="username">Permeability</label>
                  <input name='perm' value={current.perm} onChange={handleChange} type='number' placeholder='' required className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 max-sm:p-1.5 " />
                </div>
                <button onClick={handelSubmit} className=' mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none ' >Submit</button>
              </form>
            </div>
          </div>
        </div>
      </section>
  )
}

export default DataForm