import React, { useEffect } from 'react'
import axios from "axios"
import './form.css'
import { getUser } from '../../../Actions/userActions'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error,  isAuthenticated } = useSelector((state) => state.user);

  const HandleLogin = (e) => {
    e.preventDefault()
    console.log("first")
    let user = {
      email: document.querySelector('[name="email"]').value.toLowerCase(),
      password: document.querySelector('[name="password"]').value
    };

    dispatch(getUser(user)) 
  }

  useEffect(()=>{
    if(isAuthenticated){
      if (navigate.length >= 1)
          navigate(-1)
     else navigate('/')
    } 
  })


  return (
    <div className='h-[80vh] flex justify-center items-center'>
      <div className='login-container flex flex-col w-full m-2 md:w-1/4 h-3/4 pt-4 bg-slate-300'>
      <span className='text-center text-3xl py-8'>Login</span>
      { error? (<div className='text-center h-4 text-xs text-red-800'>{error}</div>):(<div className='h-4'></div>)}
      <form className='flex-box-column [&>*]:w-4/5 [&>*]:h-12 [&>*]:my-1 [&>*]:px-2' onSubmit={HandleLogin}>
          <input placeholder='Email' name="email" required></input>
          <input placeholder='Password' name="password" required></input>
          <button type='submit' className='btn py-4 px-12 bg-green-600 my-8' >Login</button>
        <p className='px-8 text-sm'>Don't have an account? <Link to='/signup'><span className='underline pl-2'>Signup</span></Link></p>
      </form>
      </div>
    </div>
  )
}
