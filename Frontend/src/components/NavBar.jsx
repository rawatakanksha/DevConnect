import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Await, NavLink } from "react-router-dom"
import { removeUser } from "../utils/userSlice"
import { BASE_URL } from "../utils/constants"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Navbar=()=>{
  const user=useSelector((store)=>store.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const handleLogout=async ()=>{
      try{
   await axios.post(BASE_URL+"/logout",
    {},
        {withCredentials:true}
      );
      navigate("/login")
      dispatch(removeUser());
      }
      catch(err){
         console.log(err.message)
      }

  }

    return(
        <>
        <div className="navbar bg-base-200 shadow-sm fixed">
  <div className="flex-1">
    <NavLink to="/feed" className="btn btn-ghost text-xl">devConnect</NavLink>
  </div>
  {user && (
  <div className="flex gap-2">
    <div className="dropdown dropdown-end">
      <div className="flex">
      <div className="m-2">{user.fName}</div>
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar mr-2">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <NavLink to="/profile/view" className="justify-between">
            Profile
            <span className="badge">New</span>
          </NavLink>
        </li>
        <li><a>Settings</a></li>
        <li><a onClick={handleLogout}>Logout</a></li>
      </ul>
    </div>
  </div>
  )
}
</div>
        </>
    )
}
export default Navbar