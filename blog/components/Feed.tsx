'use client'; 

import React, { useEffect } from 'react'; 
import type { RootState } from '@/app/GlobalRedux/store';
import { useSelector, useDispatch } from 'react-redux';
import { getFeedData } from '@/app/GlobalRedux/Features/post/postSlice';
import PostCard from './PostCard';
import { useSession } from 'next-auth/react';
import { Post } from '@/models/interfaces/Post';

const Feed = () => {
  const  { data: session } = useSession(); 
  const dispatch = useDispatch(); 
  const posts: Partial <Post> [] = useSelector((state: RootState) => state.posts); 

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

  return (
    <section>
      { posts.length === 0 && 
        <p className='font-satoshi text-base'> Loading... </p>
      }


    { posts.length > 0  && 
        posts.map(post => { 
          return( 
            <PostCard 
              key = { Date.now() }
              post = { post }
              dev = { post.creator?.toString() === session?.user?.id }
            /> 
          )
        })
      } 
    </section>
  )
}

export default Feed