/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import { close,tick } from '../../assets/images'
import axios from 'axios'
import jwt from 'jwt-decode'

import Cookies from 'universal-cookie'

function TableData(props) {
  const cookie=new Cookies();
  const [allData,setAllData]=useState([{}]);

  const [editRowButton,setRowButton]=useState(null)

  

  const data={
    superadmin:"",
    admin:""
  }
  const [current,setCurrent]=useState(data)

  useEffect(()=>{
    const token=cookie.get("jwt")
    const data=jwt(token)
    axios.get(`${import.meta.env.VITE_API_GETPROFILE_ENDPOINT}${data.id}`).then(async (response)=>{
      // console.log(response.data.data)
      setCurrent({
        superadmin:response.data.data.superadmin,
        admin:response.data.data.admin
      })
    });
  },[current])

  useEffect(()=>{
    if(props.data){
        setAllData(JSON.parse(JSON.stringify(props.data)));
    }
    
  },[props.data])
  
  function handleEdit(key) {
  
    setRowButton(key)
  }

  function handleSubmit(key) {
    props.data[key]=allData[key];
    updateDb(key)
    setRowButton(null)
    
  }
  function handleClose(k) {
    
    setAllData(JSON.parse(JSON.stringify(props.data)));
    setRowButton(null)
  }

  function updateDb(index){
    axios.put(import.meta.env.VITE_API_UPDATERECORD_ENDPOINT,allData[index]).then(res=>{
        alert(res.data.msg)
    })
  }
  function handleChange(index, name, value) {
    setAllData((prevData) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      newData[index][name] = value;
      return newData;
    });
  }

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-4" >
        <table className=" w-[90%] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400" >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3  max-md:hidden ">
                        Date
                    </th>
                    <th scope="col" className="px-6 py-3  max-md:hidden ">
                        Time
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Temp
                    </th>
                    <th scope="col" className="px-6 py-3">
                        GCS
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Compactibility
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Moisture
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Permiability
                    </th>
                    {
                        (current.admin && props.insertButton)?<th scope="col" className="px-6 py-3">
                        <span className="sr-only">Edit</span>
                    </th>:<></>
                    }
                    
                </tr>
            </thead>
            <tbody> 
            {
                allData.map((v,k)=>(
                    <tr key={k}  className="bg-white border-b hover:bg-gray-50">
                        <td className=' max-md:hidden '>{DateTime.fromISO(v.datetime).toFormat('yyyy-MM-dd')}</td>
                        <td className=' max-md:hidden '>{DateTime.fromISO(v.datetime).toFormat('HH:mm:ss')}</td>
                        <td className="px-6 py-4"><input  value={v.temp} name='temp' onChange={(e)=>{handleChange(k,e.target.name,e.target.value)}} disabled={(editRowButton===k )?'':'true'} className=' w-12 ' ></input></td>
                        <td className="px-6 py-4"><input  value={v.gcs} name='gcs' onChange={(e)=>{handleChange(k,e.target.name,e.target.value)}} disabled={(editRowButton===k && current.admin)?'':'true'} className=' w-12 ' ></input></td>
                        <td className="px-6 py-4"><input  value={v.comp} name='comp' onChange={(e)=>{handleChange(k,e.target.name,e.target.value)}} disabled={(editRowButton===k && current.admin)?'':'true'} className=' w-12 ' ></input></td>
                        <td className="px-6 py-4"><input  value={v.moist} name='moist' onChange={(e)=>{handleChange(k,e.target.name,e.target.value)}} disabled={(editRowButton===k && current.admin)?'':'true'} className=' w-12 ' ></input></td>
                        <td className="px-6 py-4"><input  value={v.perm} name='perm' onChange={(e)=>{handleChange(k,e.target.name,e.target.value)}} disabled={(editRowButton===k && current.admin)?'':'true'} className=' w-12 ' ></input></td>
                        <td className="px-6 py-4 text-right">
                            {
                                editRowButton===k?
                                <>
                                <button onClick={(e)=>{handleSubmit(k)}} className={(current.admin)?"w-6 h-6 rounded-2xl mx-2":"hidden"}><img src={tick}></img></button>
                                <button onClick={handleClose} className={(current.admin)?"w-6 h-6 rounded-2xl mx-2":"hidden"}><img src={close}></img></button>
                                </>
                                :<button onClick={()=>{handleEdit(k)}} className={(current.admin && props.insertButton)?"font-medium text-blue-600 dark:text-blue-500 hover:underline":"hidden"}>Edit</button>
                            
                            }
                            
                        </td>
                    </tr>

                ))
            }
                
            </tbody>
            <tfoot>
                <button onClick={props.modelopen} type="button" className={ (current.admin && props.insertButton)?" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 m-4  w-36  focus:outline-none ":" hidden"}>New Record</button>
            </tfoot>
        </table>
    </div>
  )
}

export default TableData