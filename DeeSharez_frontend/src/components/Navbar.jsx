import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { IoMdAdd, IoMdSearch} from 'react-icons/io'
import { MdLogin } from 'react-icons/md';


const Navbar = ({ searchTerm, setsearchTerm, user}) => {
  console.log(user);
  const navigate = useNavigate();
  return (
    <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-nome focus-within:shadow-sm'>
        <IoMdSearch fontSize={21} className='ml-1' />
        <input 
        type="text" 
        onChange={(e) => setsearchTerm(e.target.value)}
        placeholder='Search'
        value={searchTerm}
        onFocus={() => navigate('/search')}
        className='p-2 w-full bg-white outline-none'
        />
      </div>
      {user !== undefined  ? (
        <div className='flex gap-3'>
        <Link to={`user-profile/${user?._id}`} className="hidden md:block">
          <img src={user?.image} alt="" className='w-14 h-12 rounded-lg'/>
        </Link>
        <Link to={'create-pin'}  className='bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center'>
          <IoMdAdd />
        </Link>
        </div>
      ) : (
        <div className='flex gap-3'>
          <Link to='/login' className=''>
            <p className='p-2 bg-red-600 rounded-lg hover:bg-red-500 hover:shadow-md text-white'>Login</p>
            {/* <MdLogin fontSize={35} className='p-1 bg-red-600 rounded-lg hover:bg-red-500 hover:shadow-md text-white'/> */}
          </Link>
      
        </div>
      
      )}
      
    </div>
  );
return null;
};


export default Navbar;
