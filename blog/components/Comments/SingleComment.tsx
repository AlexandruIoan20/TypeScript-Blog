'use client'; 

import React, { useState } from 'react'
import { Comment } from '@/models/interfaces/Comment'; 
import { useSession } from 'next-auth/react';

interface Props { 
  comment: Partial <Comment>, 
  deleteComment: (comment: Partial<Comment> ) => void,  
  editComment: (e: React.FormEvent<Element> , comment: Partial <Comment>, text: string ) => void,  
}

const SingleComment = ({ comment, deleteComment, editComment }: Props) => {
  const { data: session } = useSession(); 
  const [ showEditComment, setShowEditComment ] = useState <boolean> (false);
  const [ newCommentText, setNewCommentText ] = useState <string> (comment.text || "");  

  const toggleEditComment = () => { 
    setShowEditComment(sc => !sc); 
  }

  return (
    <article className = 'p-2 bg-slate-200 my-2 mx-4 shadow-md'>
      <div className = 'font-inter text-sm text-gray-600'>
        { comment.creator?.toString() }
      </div>

      <section>
        { !showEditComment && 
          <p> { comment.text } </p>
        }
        { showEditComment && 
          <form onSubmit = {(e) => { editComment(e, comment, newCommentText); setShowEditComment(false)}}>
            <input 
              type="input" className = 'rounded-sm px-2 py-1 border-none font-inter outline-none'
              onChange = { (e) => setNewCommentText(e.target.value )} value = { newCommentText } />
            <button type = 'submit' className='default_button '>Done</button>
          </form>
        }

        { session?.user?.id.toString() === comment.creator?.toString() && 
          <>
            <button className = 'default_button' onClick = { toggleEditComment }> Edit </button>
            <button className = 'default_button' onClick = { () => { deleteComment(comment)}}> Delete </button>
          </>
        }
      </section>
    </article>
  )
}

export default SingleComment