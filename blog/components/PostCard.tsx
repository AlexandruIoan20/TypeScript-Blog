'use client'; 

import React from 'react'; 
import { Post } from '@/models/interfaces/Post';

import { usePathname, useRouter} from 'next/navigation'; 
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { CommentButton, LikeButton } from './buttons/interaction_buttons';

interface Props { 
    onDeletePost?: (post: Partial<Post>) => void, 
    onEditPost?: (post: Partial<Post>) => void, 
    dev: boolean, 
    post: Partial<Post> | Post, 
}

const PostCard = ({ onDeletePost, onEditPost, dev, post }: Props ) => {
  const { data: session } = useSession(); 
  const pathName = usePathname ();

  return (
    <div className='mb-4'>
      <section className='bg-slate-200 px-6 pb-2 pt-2 mx-4 mt-2 rounded-2xl shadow-lg'>
        <article className='flex'>
          <div>
            { !dev && pathName != `/users/${session?.user?.id}` && 
                <h2 className='text-2xl font-inter'>{ post.title } </h2>
            }
            { post.creator?.username != undefined && `@${ post.creator?.username }`}

            { dev && pathName ==  `/users/${session?.user?.id}` && 
              <h2 className='text-2xl font-inter'>{ post.title } - { post.visibility } </h2>
            }
          </div>
          <div className='flex justify-end ml-auto'>
            <Link href = { `/posts/${post._id}` } className='default_button'> View Post </Link>
          </div>
        </article>
        <article>
          <LikeButton executeFunction={ () => { console.log('executed') }} /> 
          <CommentButton executeFunction={ () => { console.log('executed') }}/> 
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
    </div>
  )
}

export default PostCard