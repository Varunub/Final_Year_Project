/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import DataForm from '../Modals/DataForm';
import axios from 'axios';
import jwt from 'jwt-decode'
import {DateTime} from 'luxon';
import TableData from './TableData';
import Cookies from 'universal-cookie'
function Hero() {
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const [onModal,setModal]=useState(false);
  const [toogle,settoogle]=useState(true);
  const [alldata,setalldata]=useState([{}]);
  

  function handleClick(){
    setModal(true)
  }

  
  function onRequestClose(){
    axios.get('/api/getcurrentrecords').then(res=>{
      
      setalldata(res.data.data);
    })
    setModal(false);
  }
  function afterOpenModal(){

  }
  function handleButton(e){
    if(e.target.name==='today'){ 
      settoogle(true);
      axios.get(import.meta.env.VITE_API_GETTODAYRECORD_ENDPOINT).then(res=>{
        setalldata(res.data.data);
      })
    }

    else if(e.target.name==='yesterday'){
      settoogle(false);
      
      axios.get(import.meta.env.VITE_API_GETYESTERDAYRECORD_ENDPOINT).then(res=>{
        setalldata(res.data.data);
      })
     }

  }

 

  useEffect(()=>{
    axios.get(import.meta.env.VITE_API_GETTODAYRECORD_ENDPOINT).then(res=>{
      // console.log(res.data.data)
      setalldata(res.data.data);
    })
  },[]);

  return (
    <>
      {onModal?<div className=' '><DataForm closeModal={onRequestClose}></DataForm></div>:null}
      <div className= {(onModal)?'hidden':'flex flex-row text-center max-md:flex-col'}>
        <div className= ' mt-8 basis-1/4'>
            <button name='today' onClick={handleButton} className={(toogle)?'text-black max-md:p-12 m-4 w-72 py-20 text-4xl rounded-xl shadow-xl':' w-72 bg-white text-4xl  text-gray-400 border-2 py-20  rounded-xl '} >Today</button>
            <button name='yesterday' onClick={handleButton} className={(!toogle)?'text-black max-md:p-12 m-4 w-72 py-20 text-4xl rounded-xl shadow-xl':' w-72 bg-white text-4xl text-gray-400 border-2 py-20  rounded-xl '} >Yesterday</button>
        </div>
        <TableData data={alldata} modelopen={handleClick} insertButton={toogle} ></TableData>
      </div>
    </>
  )
}

export default Hero