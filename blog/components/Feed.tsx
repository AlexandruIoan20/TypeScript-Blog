'use client'; 

import React, { useEffect, useState} from 'react'; 
import PostCard from './PostCard';
import { useSession } from 'next-auth/react';
import { Post } from '@/models/interfaces/Post';

const Feed = () => {
  const  { data: session } = useSession(); 
  const [ posts, setPosts ] = useState<Partial<Post> []> ([]); 

  useEffect(() => { 
    const getPostsData = async () => {
      try { 
        const response = await fetch('/api/posts/public'); 
        const postsResponse: Partial<Post> [] = await response.json() 
        
        if(postsResponse.length === 0) {
          return; 
        }

        setPosts(postsResponse); 
        console.log('Data got succesfully'); 
      } catch (err) {
        console.log("Error in feed");  
        console.error(err); 
      }
    }

    getPostsData (); 
  }, []); 

  const like = async (post: Partial<Post>) => { 
    console.log("Hello"); 
  }

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
              like = { like }
              dev = { post.creator?.toString() === session?.user?.id }
            /> 
          )
        })
      } 
    </section>
  )
}

export default Feed