import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { feedQuery, searchQuery } from '../utils/data'

import { client } from '../client'
import MasonryLayout from './MasonryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  const {categoryId} = useParams();
  useEffect(() => {
    setLoading(true);
    if(categoryId){
      setLoading(true);
      const query = searchQuery(categoryId);

      client.fetch(query)
        .then((data) => {
          setPins(data);
          console.log(data);
          setLoading(false);
        })
    }else{ 
      setLoading(true);
      client.fetch(feedQuery)
      .then((data) => {
        setPins(data);
        setLoading(false);
      })

    }
  }, [categoryId])
  
  let catName = categoryId || 'new';
  catName= catName.charAt(0).toUpperCase() + catName.slice(1).toLowerCase();
  if (loading) {
    return <Spinner message={`We are adding ${catName} ideas to your feed!`} />
  }

  if(!pins?.length) return <h2>{`No ${catName} Pins Available`}</h2>

  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed
