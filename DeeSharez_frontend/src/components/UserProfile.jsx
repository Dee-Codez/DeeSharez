import React,{useState,useEffect} from 'react'
import { AiOutlineLogout } from 'react-icons/ai'
import { useParams,useNavigate } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'

import { userCreatedPinsQuery,userQuery,userSavedPinsQuery } from '../utils/data'
import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'


const UserProfile = () => {
  return (
    <div>
      UserProfile
    </div>
  )
}

export default UserProfile
