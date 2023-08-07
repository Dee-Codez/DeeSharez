import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { feedQuery, seachQuery } from '../utils/data'

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
      const query = searchQuery(categoryId);

      client.fetch(query)
        .then((data) => {
          setPins(data);
          setLoading(false);
        })
    }else{ 
      client.fetch(feedQuery)
      .then((data) => {
        setPins(data);
        setLoading(false);
      })

    }
  }, [])
  

  if (loading) {
    return <Spinner message="We are adding new ideas!" />
  }
  return (
    <div>
      {pins && <MasonryLayout pins={pins} />}
    </div>
  )
}

export default Feed