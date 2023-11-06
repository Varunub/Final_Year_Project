/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import axios from 'axios'
import Modal from 'react-modal'
import PasswordForm from '../Modals/PasswordForm'
import { Navigate, redirect, useNavigate } from 'react-router-dom'
import Employees from './Employees'
function Profile() {
  const cookie=new Cookies()
  const navigate=useNavigate()
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
  const data={
    employee_id:"",
    name:"",
    email:"",
    phonenumber:"",
    password:null,
    confirm:null
  }
  const password={
    pass:""
  }
  const [current,setCurrent]=useState(data)
  const [login,setLogin]=useState(false)
  useEffect(()=>{
    
    // console.log(token)
    if(cookie.get("jwt")){
      setLogin(true)
      const token=cookie.get("jwt")
    
      const data=jwt(token)
      // setCurrent((prev)=>{return {...prev}})
      axios.get(`${import.meta.env.VITE_API_GETPROFILE_ENDPOINT}${data.id}`).then((response)=>{
        setCurrent({
          employee_id:response.data.data.employee_id,
          name:response.data.data.name,
          email:response.data.data.email,
          phonenumber:response.data.data.phonenumber
        })
      })
    }
    else{
      setLogin(false)
      navigate("/login")
    }
  },[])
  
  const [onEdit,setEdit]=useState(false)
  const [onCheck,setCheck]=useState(false)
  const [onModal,setModal]=useState(false)
  function handleChange(e){
    setCurrent((prev)=>{
      return {...prev,[e.target.name]:e.target.value}
    })
  }
  async function handleSubmit(e){
    e.preventDefault()
    await axios.put(import.meta.env.VITE_API_UPDATE_ENDPOINT,current).then(res=>{
      if(res.data.msg=='success'){
        alert("Updated successfully")
        window.location.reload(false)
      }
      else{
        alert("Something went wrong")
        navigate('/home')
      }
    });
    
  }
  function handleEdit(){
    setModal(true)
    setEdit(true)
  }
  function handleCancel(){
    setEdit(false)
  }
  async function handleValidate(e){
    e.preventDefault()
    await axios.post(`${import.meta.env.VITE_API_VALIDATE_ENDPOINT}${current.employee_id}`,{data:current.password}).then((res)=>{
      if(res.data.msg=='success'){
        setModal(false)
        setCurrent((prev)=>{
          return {...prev,password:"",confirm:""}
        })
      }
      else{
        setModal(true)
        alert("Incorrect password")
        setCurrent((prev)=>{
          return {...prev,password:"",confirm:""}
        })
        
      }
    })
    
    
  }
  function handleCheck(e){
    
    if(current.password==current.confirm && e.target.checked){
      setCheck(true)
    }
    else{
      if(current.password!=current.confirm){
        alert("password and confirm doesn't match")
      }
      setCheck(false)
      e.target.checked=false
    }
    
  }
  function handleClose(){
    setModal(false)
    setEdit(false)
  }



  function render(){
    return (
      <section className='min-h-screen bg-gray-50   py-9'>
        <div className=' w-[85%] m-auto'>
          <NavBar></NavBar>
          <div className=' border-2 p-8 mt-5 bg-white rounded-lg'>
            <div className=' text-xl  text-gray-900 p-2 '>
              Account Details
            </div>
            <div className= ' mt-8'>
              <form >
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={handleChange} value={current.employee_id} name="employee_id" id="employee_id" disabled className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="employee_id" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Employee ID</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="text" onChange={handleChange} value={current.name} name="name" id="name" disabled className=" block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User Name</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="email" onChange={handleChange} value={current.email} name="email" id="email" disabled={(onEdit)?'':'true'} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" onChange={handleChange} value={current.password} name="password" id="password" disabled={(onEdit)?'':'true'} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
                    <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">New Password</label>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <input type="password" onChange={handleChange} name="confirm" id="confirm" disabled={(onEdit)?'':'true'} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" "/>
                    <label htmlFor="confirm" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm New password</label>
                </div>
                <Modal
                  isOpen={onModal}
                  style={customStyles}
                  onRequestClose={handleClose}
                >
                  <div>
                      <div>
                        
                          <div className=' my-3'>
                            <label htmlFor="password" className='block mb-2 text-sm font-medium text-gray-900'>Password</label>
                            <input name='password'  value={current.password} onChange={handleChange}  type="password" placeholder='********' className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  max-sm:p-1.5" required />
                          </div>
                          <button onClick={handleValidate}  type='button' className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Validate</button>
                          
                      </div>
                      
                  </div>
                </Modal>


                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-6 group">
                      <input type="number" onChange={handleChange} value={current.phonenumber}  name="phonenumber" id="phonenumber" disabled={(onEdit)?'':'true'} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                      <label htmlFor="phonenumber" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number (+91)</label>
                  </div>
                </div>
                <div className="relative z-0 w-full mb-6 group">
                    <p><input type="checkbox" name="consent" id="consent" onChange={handleCheck} disabled={(onEdit)?'':'true'} required /> I Agree that all mentioned details are correct</p>
                </div>
                <div className=' flex space-x-3'>
                  <button onClick={handleSubmit} type="submit" className={(onEdit && onCheck )?' text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ':'hidden'}>Submit</button>
                  <button onClick={handleEdit} type="button" className={ (!onEdit)?"text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center " :'hidden'}>Edit</button>
                  <button onClick={handleCancel} type="button" className={(onEdit)?'text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center  ':'hidden'}>Cancel</button>
                </div>
              </form>

            </div>
          </div>

          <div>
            <Employees id={current.employee_id}></Employees>
          </div>
        </div>
      </section>
    )
  }



  return (
    <>
    {(login)?render():navigate("/login")}
    
    </>
  )
}

export default Profile