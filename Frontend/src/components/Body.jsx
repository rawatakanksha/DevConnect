import React, { useEffect } from 'react'
import Navbar from './NavBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from '../utils/userSlice'
import axios from 'axios'

const Body = () => {

  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userData=useSelector((store)=>store.user)
  const fetchUser = async ()=>{
    if(userData) return
    try{
     const response= await axios.get(BASE_URL +"/profile/view",{
      withCredentials:true
     });
     dispatch(addUser(response.data))
    }
    catch(err){
      if(err.status===401){
        navigate("/login")
      }    
       console.error(err.message)
    }
  }

  useEffect(()=>{
    fetchUser()
  },[])

  return (
    <>
    <Outlet/>
    </>
  )
}

export default Body
