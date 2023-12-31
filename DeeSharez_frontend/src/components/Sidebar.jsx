import React from 'react'
import { NavLink,Link, useNavigate } from 'react-router-dom'
import { IoIosArrowForward } from 'react-icons/io'
import {RiHome2Fill} from 'react-icons/ri'
import { googleLogout } from '@react-oauth/google'
import { AiOutlineLogout } from 'react-icons/ai'


import logo from '../assets/logo.png'

const isNotActiveStyle = 'flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-75 ease-in-out capitalize';
const isActiveStyle = 'flex items-center px-5 gap-3 font-extrabold border-r-2 border-black transition-all duration-75 ease-in-out capitalize';

import { categories } from '../utils/data'

const Sidebar = ({user, closeToggle}) => {

  const navigate = useNavigate();

  const logout = () => {
    googleLogout();
    localStorage.clear();
    navigate('/login');
  }

  const handleCloseSidebar = (event) => {
    if(closeToggle){
      closeToggle(false);
    }
  };

  return (
    <div className='flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar'>
      <div className='flex flex-col'>
        <Link to='/'
          className='flex px-5 gap-2 my-6 pt-1 w-190 items-center'
          onClick={handleCloseSidebar}
        >
          <img src={logo} className='w-28' />
        </Link>
        <div className='flex flex-col gap-5'>
          <NavLink
            to="/"
            className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
            onClick={handleCloseSidebar}
          >
            <RiHome2Fill />
            Home
          </NavLink>
          <h3 className='mt-2 px-5 text-base 2xl:text-xl'>
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) =>(
            <NavLink
              tag={Link}
              to={`/category/${category.name}`}
              className={({isActive}) => isActive ? isActiveStyle : isNotActiveStyle}
              onClick={handleCloseSidebar}
              key={category.name}>
                <img src={category.image} className='w-8 h-8 rounded-full shadow-sm' alt="category" />
                {category.name}
              </NavLink>
          )
          )}
        </div>
      </div>
      {user && (
        <>
        <div
        className="flex justify-center my-5 mb-2 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
        >
          <Link to={`/user-profile/${user._id}`}
          className='flex flex-row justify-center items-center gap-2'
          onClick={handleCloseSidebar}>
          <img src={user.image} className='w-10 h-10 rounded-full' alt="user/profile" />
          <p className='font-bold'>{user.userName}</p>
          </Link>
          <button
          type='button'
          className='bg-red-500 text-white p-2 rounded-full cursor-pointer outline-none shadow-md z-50'
          onClick={logout}
          >
          <AiOutlineLogout fontSize={20} />
        </button>
        </div>
        
        </>
      )}
    </div>
  )
}

export default Sidebar
