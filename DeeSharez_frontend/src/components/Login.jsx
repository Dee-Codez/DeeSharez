import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'
import {FcGoogle} from 'react-icons/fc'
import {client} from '../client'

const Login = () => {
  const navigate =useNavigate();
const responseGoogle = (response) => {
  if (response.credential != null) {
    const USER_CREDENTIAL = jwtDecode(response.credential);
    console.log(USER_CREDENTIAL);
    localStorage.setItem('user',JSON.stringify(USER_CREDENTIAL));

    const {name, sub, picture} = USER_CREDENTIAL;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture
    }

    client.createIfNotExists(doc)
      .then(() =>{
        navigate('/',{replace: true})
      })
  }
}

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full bg-zinc-950 text-white'>
        <div className='absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0'>
          <p className='text-2xl p-4'>
            DeeSharez
          </p>
          <div className='shadow-2xl'>
            <GoogleLogin
            render={(renderProps) => (
              <button
              type='button'
              className='bg-white text-black flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              >
                <FcGoogle className='mr-4' /> Sign In With Google
              </button>
            )}
            onSuccess={responseGoogle}
            onError={responseGoogle}
          />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
