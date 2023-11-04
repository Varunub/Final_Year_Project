/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Employees(props) {
    console.log(props.id)
  const [current,setCurrent]=useState([{}])
  useEffect(()=>{
    axios.get(import.meta.env.VITE_API_GETEMPLOYEES_ENDPOINT).then((res)=>{
        // console.log(res.data.data)
        setCurrent(res.data.data)
    }).catch((err)=>{
        console.log(err)
    })
    // console.log(current)
  },[])
 
  return (
    <div>
        <div>
            <h1>Employees</h1>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Admin Access</th>
                    </tr>
                </thead>
                <tbody>
                {
                    current.map((v,k)=>(
                        // console.log(v,k);
                        <tr>
                            <td>
                                {v.name}
                            </td>
                            <td>
                                
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" className="sr-only peer"></input>
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>

                            </td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default Employees