/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Employees(props) {

  const [current,setCurrent]=useState([{}])
  useEffect(()=>{
    axios.get(import.meta.env.VITE_API_GETEMPLOYEES_ENDPOINT).then((res)=>{
       
        setCurrent(JSON.parse(JSON.stringify(res.data.data)))
    }).catch((err)=>{
        console.log(err)
    })
    
  },[])
  function handleChange(e,key,id,name){
    setCurrent((prev)=>{
      const newData = JSON.parse(JSON.stringify(prev));
      newData[key][name] = (e.target.checked?1:0);
      return newData;
    })
    axios.put(`/api/updateAdmin/${id}`,{access:e.target.checked}).then((res)=>{
        alert(res.data.msg)
    })
  
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
                        Admin Access
                    </th>
                </tr>
            </thead>
            <tbody> 
            
                {
                    current.map((v,k)=>(
                        (v.employee_id!=props.id)?
                        <tr className="bg-white border-b hover:bg-gray-50">
                            <td className="px-6 py-4">
                                {v.name}
                            </td>
                            <td className="px-6 py-4">
                                
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" name='admin' onClick={(e)=>{handleChange(e,k,v.employee_id,e.target.name)}} value="" checked={v.admin?"true":''} className="sr-only peer"></input>
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>

                            </td>
                        </tr>
                        :<></>
                    ))
                }
            </tbody>
            
        </table>
    </div>
  )
}

export default Employees