'use client'; 

import React, { useEffect, useState} from 'react'; 
import PostCard from './PostCard';
import { useSession } from 'next-auth/react';
import { Post } from '@/models/interfaces/Post';
import { Comment } from '@/models/interfaces/Comment';

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
    const id = session?.user?.id; 
    try { 
      console.log('Start'); 
      const response = await fetch(`/api/posts/${post._id}/like`, { 
        method: 'PATCH', 
        mode: 'cors', 
        body: JSON.stringify({ userid: session?.user?.id, postid: post._id  }),
        headers: {
          'Content-Type': 'application/json', 
        }
      }); 
      
      if(post.interaction?.likeUsers.includes(id)) { 
        post.interaction.likeUsers.filter((user: any) => user.toString() != id?.toString()); 
      }

      if(response.ok) { 
        console.log("Finished"); 
        return; 
      }; 

      console.log("END"); 
    } catch (err) { 
      console.log("We have an error durring giving a like"); 
      console.log(err); 
    }
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
              dev = { post.creator?.toString() === session?.user?.id }
            /> 
          )
        })
      } 
    </section>
  )
}

export default Feed