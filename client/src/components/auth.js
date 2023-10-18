import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { CloseOutlined } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import "./cart.css";
import { getUserDetails, updateUserDetails, logout } from "../redux/userSlice";
import { getDetails } from "../api/api";
import jwtDecode from 'jwt-decode';


export default function Auth({ setShowModal }) {




  const [selectedLanguage, setSelectedLanguage] = useState('');
  const languages = ['English', 'Spanish', 'French', 'German', 'Hindi', 'Japanese'];
  const {isAuthenticated, user} = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const dispatch = useDispatch();

  const closeCart = (e) => {
    e.preventDefault();
    const el = document.querySelector('.user');
    el.classList.remove('showCart');
    el.classList.add('hidecart');
  }

  useEffect(() => {  
    const token = localStorage.getItem("profile");
      if (token) {
        if (Date.now() / 1000 > jwtDecode(token).exp) { 
          return;
        } else {
          dispatch(getUserDetails());
        }
      }
  }, [isAuthenticated]);


  console.log(user);


  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };


  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  }

  const handleUpdate = async(reset) => {
    if (reset === 1) {
      await dispatch(updateUserDetails({ reset: 1 }));
    }
    else {
      await dispatch(updateUserDetails({ lang: selectedLanguage }))   // using only reset to handle both update language action and reset option also
    }
    dispatch(getUserDetails());
  }

  return (

    <div className='user p-8 h-full gap-4 hidecart' style={{ transition: "0.4s all ease-in-out" }}>
      <div className='flex justify-between'>
        <h4 className="">Account Details</h4>
        <CloseOutlined className='cursor-pointer' onClick={(e) => closeCart(e)} />
      </div>

      <div className='flex flex-col justify-between h-full'>

        {
          user ?
            <>
              <div className="flex flex-col gap-2">
                <p className="cursor-pointer text-lg flex items-center justify-between">
                  {user?.imageUrl ? <Avatar alt="Remy Sharp" src={user.imageUrl} /> :
                    <Avatar> {user?.name?.slice(0, 1)} </Avatar>
                  }
                  Welcome {user?.name} 👋
                </p>

                {user?.role === 'user' && (
                  <>
                    <div className="mb-3">
                      <p className="text-darkGreen">Your Language: {user?.language}</p>
                    </div>
                    <div className="mb-3">
                      <p className="text-darkGreen">Tests Completed: {user?.testsCompleted}</p>
                    </div>
                    {user?.badge !== null ? (
                      <div className="card badge-card p-3">
                        <div className="flex items-center justify-between">
                          <img src={user.badge?.icon} alt="Badge" className="badge-icon h-12 w-12 " />
                          <p className="badge-name my-auto">{user.badge?.name}</p>
                        </div>
                      </div>
                    ) : (
                      <p className="text-darkGreen">
                        You have no badge as of now. <br /> Complete a test to earn a badge.
                      </p>
                    )}

                    <div className="flex flex-col items-center justify-center" >

                      <div className="items-center flex gap-2 w-full justify-between mb-4">

                        <div className="flex flex-col justify-center items-center">
                          <label htmlFor="languageSelect" className="block text-gray-700">Update Language</label>
                          <select
                            id="languageSelect"
                            onChange={handleLanguageChange}
                            value={selectedLanguage}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-400"
                          >
                            <option value="" disabled>Select a language</option>
                            {languages.map((language, index) => (
                              <option key={index} value={language}>{language}</option>
                            ))}
                          </select>
                        </div>

                        <button
                          className="text-sm bg-red-800 rounded-lg cursor-pointer p-3 text-white"
                          onClick={() => handleUpdate(2)}
                        >
                          Update Language
                        </button>
                      </div>

                      <button
                        className="mt-3 text-sm bg-darkGreen rounded-lg  hover:bg-red-800 cursor-pointer p-3 text-white transition duration-300 ease-in-out "
                        onClick={() => handleUpdate(1)}
                      >
                        Reset Progress
                      </button>

                    </div>

                  </>
                )}


                {user?.role === 'admin' && (
                  <>
                    <Link to='/addQuestion'>
                      <button className="cursor-pointer text-center text-md text-decoration-none w-full shop-now p-2 text-darkGreen">Add Question</button>
                    </Link>

                  </>
                )}
              </div>
              <button className="cursor-pointer text-center text-md text-decoration-none w-1/2 shop-now p-2 bg-darkGreen text-white" onClick={(e) => handleLogout(e)}>Logout</button>
            </>
            :
            <>
              <div>
                <p className="cursor-pointer">To View your details please Login</p>
              </div>
              <Link to='/auth' className="cursor-pointer text-center text-md text-decoration-none w-1/2 bg-darkGreen text-white p-2" style={{ backgroundColor: "#435334" }}>Login</Link>
            </>
        }
      </div>
    </div>
  )

}