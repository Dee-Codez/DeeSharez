import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {v4 as uuidv4} from 'uuid';
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs'

import { client, urlFor } from '../client';
import { fetchUser } from '../utils/fetchUser';


const Pin = ({pin: {postedBy, image, _id, destination ,save}}) => {
  const [postHovered, setPostHovered] = useState(false);
  const [savingPost, setSavingPost] = useState(false);

  const user = fetchUser();
  const navigate = useNavigate();

  const alreadySaved = !!(save?.filter((item) => item.postedBy._id === user?.sub))?.length; //double inv as the filter func return array of matches thus conver the length [0,1] into boolean

  console.log();

  const savePin = (id) => {
    if(!alreadySaved) {
      setSavingPost(true);
      client
        .patch(id)
        .setIfMissing({save: []})
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user.sub,
          postedBy: {
            _type: 'postedBy',
            _ref: user.sub
          }
        }])
        .commit()
        .then(() => {
          window.location.reload();
          setSavingPost(false);
        })
    }
  }

  const deletePin = (id) => {
    client
    .delete(id)
    .then(() => {
        window.location.reload();
      })
  }



  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img src={urlFor(image).width(250).url()} className='rounded=lg w-full' alt='user-post' />
      {postHovered && (
        <div
        className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
        style = {{height: '100%'}}  
        >
          <div className='flex items-center justify-between'>
            <div className='flex gap-2'>
              <a 
                href={`${image?.asset?.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}  //done to stop propagation if dwld btn is clicked
                className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none duration-300'
                >
                  <MdDownloadForOffline />
              </a>
            </div>
            {alreadySaved ? (
              <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none duration-200'>
                {save?.length} Saved
              </button>
            ) : (
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(_id);
                }}
                type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none duration-200'>
                {savingPost? 'saving' : 'Save'}
              </button>
            )
          }
          </div>
          <div className='flex justify-between items-center gap-2 w-full'>
            {destination && (
              <a 
                href={destination}
                onClick={(e) => {
                  e.stopPropagation();
                  savePin(_id);
                }}
                target='_blank'
                rel='noreferrer'
                className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md duration-200"
              >
                <BsFillArrowUpRightCircleFill />
                {destination.length > 15 ? `${destination.slice(0,15)}..` : destination}
              </a>
            )}
            {postedBy?._id === user?.sub && (
              <button 
                type='button'
                onClick={(e) => {
                  e.stopPropagation();
                  deletePin(_id);
                }}
                className='bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none duration-200'
              >
                <AiTwotoneDelete />
              </button>
            )}
          </div>
        </div>
      )}
      </div>
      <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
        <img src={postedBy?.image} className='w-8 h-8 rounded-full object-cover' alt="user-profile" />
        <p className='font-semibold capitalize'>{postedBy?.userName}</p>
      </Link>
    </div>
  )
}

export default Pin
