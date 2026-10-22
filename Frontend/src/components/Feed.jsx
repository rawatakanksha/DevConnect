import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import { addfeed } from "../utils/feedSlice";

const Feed = () => {
    const feed=useSelector((store)=>store.feed)
    // console.log(feed,"feedd")
   const dispatch=useDispatch()
  const fetchFeed = async () => {
    try {
      const response = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(response.data, "resss");
      dispatch(addfeed(response.data))
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);
if(!feed) return 
  return (
   
     feed && 
     <div className="flex items-center justify-center pt-40 ">
        <UserCard user={feed[0]}/>
    </div>
  )
}


export default Feed;
