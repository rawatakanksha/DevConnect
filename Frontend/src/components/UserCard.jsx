import React from "react";

const UserCard = ({ user }) => {
  const { fName, Lname, age, skills, about, photo } = user;
  return (
    <>
      <div className=" p-0.5 bg-[length:300%_300%] bg-gradient-to-r from-indigo-500 via-pink-500  to-indigo-500 rounded-lg animate-gradient">
        <div className="card bg-base-300 w-96 shadow-sm  p-2">
          <figure className=" bg-base-300 rounded-lg p-4 ">
            <img src={photo} alt="Shoes" />
          </figure>

          <div className="card-body p-3">
            <h2 className="card-title">{fName + " " + Lname}</h2>
            <p>{age} years</p>
            <p>Skills: {skills}</p>
            <p className="my-6">{about}</p>
            <div className="card-actions items-center justify-center">
              <button className="btn btn-primary m-2  shadow-md
               hover:bg-[length:300%_300%] hover:bg-gradient-to-r hover:from-indigo-300 hover:via-indigo-500  hover:to-indigo-300 rounded-lg hover:animate-gradient
               hover:-translate-y-1 hover:shadow-xl 
               active:translate-y-0 active:shadow-md
               transition-all duration-200 ease-out">Ignore</button>
              <button className="btn btn-secondary m-2  shadow-md
              hover:bg-[length:300%_300%] hover:bg-gradient-to-r hover:from-pink-300 hover:via-pink-500  hover:to-pink-300 rounded-lg hover:animate-gradient
               hover:-translate-y-1 hover:shadow-xl 
               active:translate-y-0 active:shadow-md
               transition-all duration-200 ease-out">Intrerested</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
