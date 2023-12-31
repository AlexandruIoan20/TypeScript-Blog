'use client'; 

import React, { useState } from 'react'; 
import { Post } from '@/models/interfaces/Post';

import { usePathname } from 'next/navigation'; 
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CommentButton, LikeButton } from './buttons/interaction_buttons';
import CommentsSection from './Comments/CommentsSection';

import Image from 'next/image';

interface Props { 
    onDeletePost?: (post: Partial<Post>) => void, 
    onEditPost?: (post: Partial<Post>) => void, 
    dev: boolean, 
    post: Partial<Post> , 
    like: (post: Partial<Post>) => void, 
}

const PostCard = ({ onDeletePost, onEditPost, dev, post, like }: Props ) => {
  const [ showComments, setShowComments ] = useState <boolean> (false); 
  const { data: session } = useSession(); 
  const pathName = usePathname ();
  const liked = post.interaction?.likeUsers.map(id => id.toString()).includes(session?.user?.id.toString() || ""); 

  const togCommentSection = () => { 
    setShowComments((sc: boolean) => !sc); 
  }

  return (
    <div className='mb-4'>
      <section className='bg-slate-200 px-6 pb-2 pt-2 mx-4 mt-2 rounded-2xl shadow-lg'>
        <article className='flex'>
          <div>
            { !dev && pathName != `/users/${session?.user?.id}` && 
                <h2 className='text-2xl font-inter'>{ post.title } </h2>
            }

          <Link href = { `/users/${post.creator?._id}`}>
            <div className = 'flex items-center gap-x-2 mb-4'>
              { post.creator?.username != undefined && 
                <Image src = { post.creator?.image } width = { 20 } className = 'rounded-3xl' height = { 20 } alt = 'user_image ' /> 
              }
              <p>
                { post.creator?.username != undefined && `@${ post.creator?.username }`}
              </p>
            </div>  
          </Link>  

            { dev && pathName ==  `/users/${session?.user?.id}` && 
              <h2 className='text-2xl font-inter'>{ post.title } - { post.visibility } </h2>
            }
          </div>
          <div className='flex justify-end ml-auto'>
            <Link href = { `/posts/${post._id}` } className='default_button my-auto py-4'> View Post </Link>
          </div>
        </article>
        <article className = 'flex gap-x-8'>
          <div className = 'flex gap-x-2'>
            <LikeButton liked = { liked } executeFunction={ async () =>  { await like (post) } }  /> 
            <p> In work </p>
            <p> { post.interaction?.likeUsers.length } </p>
          </div>
                    <div className = 'flex gap-x-2'>
            <CommentButton executeFunction={ togCommentSection }  /> 
          </div>
        </article>
      </section>
      { dev && pathName ==  `/users/${session?.user?.id}` && onEditPost != undefined && onDeletePost != undefined && 
          <div className='mx-8 bg-slate-300 rounded-xl py-2 flex justify-center gap-x-64'>
            <button type = 'button' onClick = { () => onEditPost(post) }>Edit</button>
            <button type = 'button' onClick = { () => { onDeletePost(post)}}> 
              Delete
            </button>
          </div>
      }

      { showComments && 
        <CommentsSection limit = { 2 } id = { post._id?.toString() ||  "" } postCreator = { post.creator?._id?.toString()  || "" } /> 
      }
    </div>
  )
}

export default PostCard