import React from 'react'
import EditProfile from "./EditProfile"
import UserCard from './UserCard'
import { useSelector } from 'react-redux'

const Profile = () => {
    const currentUser=useSelector((store)=>store.user)
    if(!currentUser) return
  return (
    <>   
    <EditProfile user={currentUser}/>
    </>
  )
}

export default Profile
