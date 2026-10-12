import React, { useState } from 'react'
import axios from "axios"
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/userSlice'
import { useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'

const Login = () => {
    const[password,setPassword]=useState("IcyPicy@123");
    const[emailId,setEmailId]=useState("Icy@gmail.com");
    const[error,setError]=useState()
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogin= async()=>{
       try {const response =await axios.post(BASE_URL +"/login",{
            emailId,
            password
        },{
            withCredentials:true
        })
    console.log("login succesful",response);
    dispatch(addUser(response.data));
    return navigate("/");
    }
        catch(err){
            console.error(err)
            setError(err?.response?.data ||"something went wrong")
        }
    }
  return (
   <>
   <div className='flex justify-center items-center h-full scroll-auto'>
   <div className="card bg-base-200 w-96 shadow-sm ">
  <div className="card-body">
    <h2 className="card-title m-2 justify-center">Card Title</h2>
    <div className="card-actions justify-center">
        <input value={emailId} onChange={(e)=>setEmailId(e.target.value)} type="text" placeholder="Email" className="input m-2 input-primary" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="text" placeholder="Password" className="input m-2 input-primary" />
         <p className="text-red-500">{error}</p>
      <button className="btn btn-primary m-2" onClick={handleLogin}>Login</button>
    </div>
  </div>
</div>
</div>
   </>
  )
}

export default Login
