/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { close,tick } from '../../assets/images'
import jwt from 'jwt-decode'

import Cookies from 'universal-cookie'
function Threshold() {

  const cookie=new Cookies();
  const data={
    superadmin:"",
    admin:""
  }
  const [current,setCurrent]=useState(data)
  const [allData,setAllData]=useState([{}]);

  const [editRowButton,setRowButton]=useState(null)

  useEffect(()=>{
    const token=cookie.get("jwt")
    const data=jwt(token)
    axios.get(`${import.meta.env.VITE_API_GETPROFILE_ENDPOINT}${data.id}`).then((response)=>{
      setCurrent({
        superadmin:response.data.data.superadmin,
        admin:response.data.data.admin
      })
    });
    axios.get(import.meta.env.VITE_API_GETTHRESHOLDDATA_ENDPOINT).then((response)=>{
        setAllData(response.data.data)
    });
  },[editRowButton])

  function handleEdit(key) {
    setRowButton(key)
  }

  function handleSubmit(key) {
    updateDb(key)
    setRowButton(null)
  }
  function handleClose(k) {
    // current.admin=0;
    setRowButton(null)
  }

  function updateDb(index){
    axios.put(import.meta.env.VITE_API_UPDATETHRESHOLDDATA_ENDPOINT,allData[index]).then(res=>{
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
    <div className="relative overflow-x-auto  p-4" >
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 " >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 ">
                <tr>
                    <th scope="col" className="px-6 py-3  max-md:hidden ">
                        Name
                    </th>
                    <th scope="col" className="px-6 py-3  max-md:hidden ">
                        SC1
                    </th>
                    <th scope="col" className="px-6 py-3  max-md:hidden ">
                        WL1
                    </th>
                    <th scope="col" className="px-6 py-3  max-md:hidden ">
                        WL2
                    </th>
                    <th scope="col" className="px-6 py-3  max-md:hidden ">
                        SC2
                    </th>
                    
                </tr>
            </thead>
            <tbody> 
                {
                    allData.map((v,k)=>(
                        <tr key={k}  className="bg-white border-b hover:bg-gray-50">
                            
                            <td className="px-6 py-4">{v.name}</td>
                            <td className="px-6 py-4"><input type='number' value={v.SC1} name='SC1' onChange={(e)=>{handleChange(k,e.target.name,e.target.value)}} disabled={(editRowButton===k && current.superadmin)?'':'true'} className=' w-12 ' ></input></td>
                            <td className="px-6 py-4"><input type='number' value={v.WL1} name='WL1' onChange={(e)=>{handleChange(k,e.target.name,e.target.value)}} disabled={(editRowButton===k && current.superadmin)?'':'true'} className=' w-12 ' ></input></td>
                            <td className="px-6 py-4"><input type='number' value={v.WL2} name='WL2' onChange={(e)=>{handleChange(k,e.target.name,e.target.value)}} disabled={(editRowButton===k && current.superadmin)?'':'true'} className=' w-12 ' ></input></td>
                            <td className="px-6 py-4"><input type='number' value={v.SC2} name='SC2' onChange={(e)=>{handleChange(k,e.target.name,e.target.value)}} disabled={(editRowButton===k && current.superadmin)?'':'true'} className=' w-12 ' ></input></td>
                            <td className="px-6 py-4">
                                {
                                    editRowButton===k?
                                    <>
                                    <button onClick={(e)=>{handleSubmit(k)}} className={(current.admin)?"w-6 h-6 rounded-2xl mx-2":"hidden"}><img src={tick}></img></button>
                                    <button onClick={handleClose} className={(current.admin)?"w-6 h-6 rounded-2xl mx-2":"hidden"}><img src={close}></img></button>
                                    </>
                                    :<button onClick={()=>{handleEdit(k)}} className={(current.superadmin)?"font-medium text-blue-600 dark:text-blue-500 hover:underline":"hidden"}>Edit</button>
                                
                                }
                                
                            </td>
                        </tr>

                    ))
                }
            </tbody>
            
        </table>
    </div>
  )
}

export default Threshold