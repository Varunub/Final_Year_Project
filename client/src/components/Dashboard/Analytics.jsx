/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import Modal from 'react-modal'
import {RiMenu3Line} from 'react-icons/ri'
import {AiOutlineClose} from 'react-icons/ai'
import NavBar from './NavBar'
import axios from 'axios';
import Graph from './Graph'
import TableData from './TableData'
import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import { Navigate, redirect, useNavigate } from 'react-router-dom'
function Analytics() {
  const [type,setType]=useState("");
  const navigate=useNavigate()
  const [alldata,setalldata]=useState([{}]);
  const data={
    from:"",
    to:"",
    type:"",
    machinetype:""
  }
  const [formData,setFormData]=useState(data)
  const [toogle,setToogle]=useState(false)

  async function onSubmit(e){
    e.preventDefault();
    if(!formData.from || !formData.to){
      alert("Please Select dates")
      setType('')

      return
    }
    if(formData.type[0]==='Graph' && (!formData.machinetype || formData.machinetype[0]==='None')){
      alert("Please Select machine type")
      navigate('/analytics')
      setType('')
      return
    }
    else{
      await axios.post(import.meta.env.VITE_API_GETSPECIFICRECORD_ENDPOINT,formData).then((res)=>{
        if(res.data.msg=="Success"){
          setalldata(res.data.data);
        }
      })
    }
    setType(formData.type[0])
    setToogle(true)

   
  }

  function handleChange(e){
    setFormData((prev)=>{
      return {...prev,[e.target.name]:[e.target.value]}
    })
  }

  function formatdata(data){
    const header=["Employee_id","DataTime","Temperature","GCS","Compactibility","Moisture","Permeability"]
    const rows=data.map((row)=>[row.empid,row.datetime,row.temp,row.gcs,row.comp,row.moist,row.perm])

    return [header,...rows]
  }

  async function downloadDataInExcel(){
      const formatedData=formatdata(alldata)
      const workbook=new ExcelJS.Workbook();
      const workSheet=workbook.addWorksheet("Sheet 1")
      workSheet.addRows(formatedData)
      const blob=await workbook.xlsx.writeBuffer();
      saveAs(new Blob([blob],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),`${formData.from[0]} to ${formData.to[0]}.xlsx`)
  }
  return (
    <div className=' py-9 min-h-screen bg-gray-50'>
      <div className='w-[95%] m-auto'>
        <NavBar></NavBar>
        <div className=' flex flex-col'>
          <div>
            <form action="">
              <div className=' flex justify-evenly max-md:flex-col'>
                <div className='max-md:mt-4'>
                  <label htmlFor="from" className=' font-semibold text-xl p-4'>From :</label>
                  <input id='from' type='date' value={formData.from} name='from' className=' border-2 rounded-md hover:border-black' onChange={handleChange} required='true'></input>
                </div>
                <div className='max-md:mt-4'>
                  <label htmlFor="to" className=' font-semibold text-xl p-4'>To :</label>
                  <input id='to' type='date' name='to' value={formData.to} className=' border-2 rounded-md hover:border-black' onChange={handleChange} required='true'></input>
                </div>
                <div className='max-md:mt-4'>
                  <label htmlFor="type" className=' font-semibold  text-xl p-4'>Type :</label>
                  <select id='type' name='type' onChange={handleChange} className=' border-2 rounded-md hover:border-black'required='true'>
                      <option value="None" >None</option>
                      <option value="Graph" >Graph</option>
                      <option value="Table" >Table</option>
                  </select>
                </div>
                {
                  (formData.type=='Graph')?
                  <div className='max-md:mt-4'>
                    <label htmlFor="type" className=' font-semibold  text-xl p-4'>Machine Type :</label>
                    <select id='type' name='machinetype' onChange={handleChange} className=' border-2 rounded-md hover:border-black'required='true'>
                        <option value="None" >None</option>
                        <option value="temp" >Temperature</option>
                        <option value="gcs" >Green Compression Strength</option>
                        <option value="comp" >Compactibility</option>
                        <option value="moist" >Moisture</option>
                        <option value="perm" >Permiability</option>
                    </select>
                  </div>
                  :<></>
                }
                
              </div>
              <div className=' text-center ' >
                  <button onClick={onSubmit} type="button" className=" text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 m-4  w-36  focus:outline-none ">Submit</button>
              </div>
            </form>
          </div>
          <div className=' w-[80%] text-center m-auto mt-5 max-md:w-full'>
            {type==="Graph"?<Graph data={alldata} machinetype={formData.machinetype[0]} from={formData.from[0]} to={formData.to[0]}></Graph>:type==='Table'?<TableData data={alldata} insertButton={0}></TableData>:<></>}
          </div>
          {
            ((type=="Table") && toogle)?
            <div className=' text-center ' >
              <button onClick={downloadDataInExcel} type="button" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 m-4  w-36  focus:outline-none ">Download Data</button>
            </div>
            :<></>
          }
          

        </div>
      </div>
    </div>
    
    
  )
}

export default Analytics