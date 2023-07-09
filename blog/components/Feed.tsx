'use client'; 

import React, { useEffect } from 'react'; 
import type { RootState } from '@/app/GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import { getFeedData } from '@/app/GlobalRedux/Features/post/postSlice';

const Feed = () => {
  const dispatch = useDispatch(); 
  const posts = useSelector((state: RootState) => state.posts); 

  useEffect(() => { 
    const getPostsData = async () => {
      try { 
        const response = await fetch('/api/posts/public'); 
        const postsResponse = await response.json() 
        
        if(postsResponse.length === 0) {
          return; 
        }
        console.log('Data got succesfully'); 
        dispatch(getFeedData(postsResponse)); 
      } catch (err) {
        console.log("Error in feed");  
        console.error(err); 
      }
    }

    getPostsData (); 
  }, [])

  useEffect( () => { 
    console.log(posts); 
  }, [posts]); 
  return (
    <p>re</p>
  )
}

export default Feed