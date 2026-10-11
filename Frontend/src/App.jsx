import { useState } from 'react'
import Navbar from './components/NavBar'
import { BrowserRouter, Routes, Route, createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Body from './components/Body'
import Login from './components/Login'
import Footer from './components/Footer'
import appStore from './utils/appStore'
import {Provider} from "react-redux"

function AppLayout(){
return(
<>
<Provider store={appStore}>
    <Navbar/>
    <Outlet/>
    <Footer/>     
</Provider>

 </>
)
}

function App() {
 const router=createBrowserRouter([
  {
    path:"/",
    element:<AppLayout/>,
    children:[
     { path:"/",
      element:<Body/>
     },
     {
      path:"/login",
      element:<Login/>
     }
    ]
  }
 ])

  return (
   
    <>

 <RouterProvider router={router}/>
    </>
  )
}

export default App
