import React, {useState} from 'react'
import { Route,Routes } from 'react-router-dom'

import {Navbar,Feed,PinDetail,CreatePin,Search} from '../components'

const Pins = ({user}) => {
  const [searchTerm, setsearchTerm] = useState('')

  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-50'>
        <Navbar searchTerm={searchTerm} setsearchTerm={setsearchTerm} user={user && user} />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed />}/>
          <Route path='/category/:categoryId' element={<Feed />}/>
          <Route path='/pin-detail/:pinId' element={<PinDetail user={user && user}/>}/>
          <Route path='/creat-pin' element={<CreatePin user={user && user} />}/>
          <Route path='/search' element={<Search searchTerm={searchTerm} setsearchTerm={setsearchTerm} />}/>
          
        </Routes>

      </div>
    </div>
  ) 
}

export default Pins