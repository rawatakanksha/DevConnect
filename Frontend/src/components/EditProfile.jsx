import React, { useEffect } from "react";
import { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import axios from "axios";
import { addfeed } from "../utils/feedSlice";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  //   console.log(user);

  const [Lname, setLname] = useState(user.Lname);
  const [fName, setfName] = useState(user.fName);
  const [photo, setPhoto] = useState(user.photo);
  const [skills, setSkills] = useState(user.skills);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [error, setError] = useState();
  const[toast,setToast]=useState(false)
  const dispatch = useDispatch();

  const saveData = async () => {
    try {
      const currentUserdata = await axios.patch(
        BASE_URL + "/profile/edit",
        { fName, Lname, age, about, skills, photo },
        {
          withCredentials: true,
        },
      );
      dispatch(addUser(currentUserdata?.data?.data));
      setToast(true);
      setTimeout(()=>{
        setToast(false)
      },3000)
      setError("");
      console.log(currentUserdata.data, "this is dattaata");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
    { toast &&(<div className="toast toast-top toast-end pt-16">
        <div className="alert alert-success bg-[length:300%_300%] bg-gradient-to-r from-emerald-500  via-emerald-400  to-emerald-500  animate-gradient  shadow-md">
          <span className="text-amber-50">Profile updated successfully</span>
        </div>
      </div>)}
      
      <div className="flex justify-center items-center pt-36">
        <div className="flex justify-center items-center h-full scroll-auto m-6 ">
          <div className=" p-0.5 bg-[length:300%_300%] bg-gradient-to-r from-indigo-500 via-pink-500  to-indigo-500 rounded-lg animate-gradient">
            <div className="card bg-base-300 w-96 shadow-sm min-h-[640px] ">
              <div className="card-body">
                <h2 className="card-title m-2 justify-center">Edit Profile</h2>
                <div className="card-actions justify-center">
                  <fieldset className="flex">
                    <label className="label w-[70px] " htmlFor="firstname">
                      First Name:
                    </label>
                    <input
                      value={fName}
                      id="firstname"
                      onChange={(e) => setfName(e.target.value)}
                      type="text"
                      placeholder="First Name"
                      className="input m-2 input-primary w-64"
                    />
                  </fieldset>
                  <fieldset className="flex">
                    <label className="label  w-[70px]" htmlFor="lastName">
                      Last Name:
                    </label>
                    <input
                      value={Lname}
                      onChange={(e) => setLname(e.target.value)}
                      type="text"
                      id="lastName"
                      placeholder="Last Name"
                      className="input m-2 input-primary w-64"
                    />
                  </fieldset>

                  <fieldset className="flex">
                    <label className="label  w-[70px]" htmlFor="Age">
                      Age:
                    </label>
                    <input
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      type="text"
                      id="Age"
                      placeholder="Age"
                      className="input m-2 input-primary w-64"
                    />
                  </fieldset>
                  <fieldset className="flex">
                    <label className="label  w-[70px]" htmlFor="skills">
                      Skills:
                    </label>
                    <input
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      type="text"
                      id="skills"
                      placeholder="skills"
                      className="input m-2 input-primary w-64"
                    />
                  </fieldset>
                  <fieldset className="flex">
                    <label className="label  w-[70px]" htmlFor="photo">
                      Photo:
                    </label>
                    <input
                      value={photo}
                      onChange={(e) => setPhoto(e.target.value)}
                      type="text"
                      id="photo"
                      placeholder="photo"
                      className="input m-2 input-primary w-64"
                    />
                  </fieldset>

                  <fieldset className="flex">
                    <label className="label  w-[70px]" htmlFor="About">
                      About:
                    </label>
                    <textarea
                      className="textarea textarea-primary m-2 h-24  w-64"
                      placeholder="About"
                      maxlength="200"
                      value={about}
                      onChange={(e) => setAbout(e.target.value)}
                    ></textarea>
                  </fieldset>
                </div>
                <p className="text-red-500">{error}</p>
                <button
                  onClick={saveData}
                  className="btn btn-primary m-2 bg-[length:300%_300%] bg-gradient-to-r from-indigo-500 via-pink-500  to-indigo-500  hover:animate-gradient  shadow-md
               hover:-translate-y-1 hover:shadow-xl 
               active:translate-y-0 active:shadow-md
               transition-all duration-200 ease-out"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="m-6">
          <UserCard user={{ fName, Lname, skills, age, about, photo }} />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
