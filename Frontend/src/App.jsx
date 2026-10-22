import { useState,useEffect } from 'react'
import Navbar from './components/NavBar'
import { BrowserRouter, Routes, Route, createBrowserRouter, Outlet, RouterProvider,useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Footer from './components/Footer'
import appStore from './utils/appStore'
import {Provider} from "react-redux"
import Profile from './components/Profile'
import Feed from './components/Feed'
import { BASE_URL } from './utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addUser } from './utils/userSlice'
import axios from 'axios'


function AppLayout(){


    const dispatch=useDispatch();
    const navigate=useNavigate();
    const userData=useSelector((store)=>store.user)
    const fetchUser = async ()=>{
      if(userData) return
      try{
       const response= await axios.get(BASE_URL +"/profile/view",{
        withCredentials:true
       });
        console.log("API Response data:", response.data); 
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
  
return(
<>

    <Navbar/>
    <Outlet/>
    <Footer/>     


 </>
)
}

function App() {
 const router=createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
   
     {
      path:"/login",
      element:<Login/>
     },
     {
      path:"/profile",
      element:<Profile/>
     },
     {
      path:"/feed",
      element:<Feed/>
     }
    ]
  }
 ])

  return (
   
    <>

      <Provider store={appStore}>
        <RouterProvider router={router}/>
      </Provider>
    </>
  )
}

export default App
