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
function Analytics() {
  const [type,setType]=useState("");
  const sampleData = {
    shift: [1, 2, 3, 4, 5, 6, 7, 8, 9], 
    avg: [1450, 1420, 1385, 1395, 1412, 1378, 1365, 1440, 1432], 
  };
  
  const WL1 = 1050  
  const LCL = 1150  
  const UCL = 1350  
  const SC1 = 1450  
  const SC2 = 1800 
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
    setType(formData.type[0])
    axios.post(import.meta.env.VITE_API_GETSPECIFICRECORD_ENDPOINT,{from:formData.from[0],to:formData.to[0]}).then((res)=>{
      if(res.data.msg=="Success"){
        setalldata(res.data.data);
        setToogle(true)
      }
    })
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
      saveAs(new Blob([blob],{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}),'data.xlsx')
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
                        <option value="Graph" >Temperature</option>
                        <option value="Green Compression Strength" >Green Compression Strength</option>
                        <option value="Compactibility" >Compactibility</option>
                        <option value="Moisture" >Moisture</option>
                        <option value="Permiability" >Permiability</option>
                    </select>
                  </div>
                  :<></>
                }
                
              </div>
              <div className=' text-center ' >
                  <button onClick={onSubmit} type="button" className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 m-4  w-36  focus:outline-none ">Submit</button>
              </div>
            </form>
          </div>
          <div className=' w-[80%] text-center m-auto mt-5 max-md:w-full'>
            {type==="Graph"?<Graph data={sampleData} WL1={WL1}  LCL={LCL} UCL={UCL} SC1={SC1} SC2={SC2}></Graph>:type==='Table'?<TableData data={alldata} insertButton={0}></TableData>:<></>}
          </div>
          {
            ((formData.type=="Table" || formData.type=="Graph") && toogle)?
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