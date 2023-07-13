'use client'; 

import React, { useState, useEffect } from 'react'
import { Comment } from '@/models/interfaces/Comment'; 
import { useSession } from 'next-auth/react';

interface Props { 
  comment: Partial <Comment>, 
  deleteComment: (comment: Partial<Comment> ) => void,  
  editComment: (e: React.FormEvent<Element> , comment: Partial <Comment>, text: string ) => void,  
  showEditor: string, 
  newCommentText: string, 
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>, 
  handleShowEdit: (id: string) => void
}

const SingleComment = ({ comment, deleteComment, editComment, newCommentText, showEditor, setNewCommentText, handleShowEdit }: Props) => {
  const { data: session } = useSession(); 

  return (
    <article className = 'p-2 bg-slate-200 my-2 mx-4 shadow-md'>
      <div className = 'font-inter text-sm text-gray-600'>
        { comment.creator?.toString() }
      </div>

      <section>
        { showEditor != comment._id?.toString() && 
          <p> { comment.text } </p>
        }
        { showEditor === comment._id?.toString() && 
          <form onSubmit = {(e) => { editComment(e, comment, newCommentText) }}>
            <input 
              type="input" className = 'rounded-sm px-2 py-1 border-none font-inter outline-none'
              onChange = { (e) => setNewCommentText(e.target.value )} value = { newCommentText } />
            <button type = 'submit' className='default_button '>Done</button>
          </form>
        }

        { session?.user?.id.toString() === comment.creator?.toString() && 
          <>
            <button className = 'default_button' onClick = { () => handleShowEdit(comment._id?.toString() || "") }> Edit </button>
            <button className = 'default_button' onClick = { () => { deleteComment(comment)}}> Delete </button>
          </>
        }
      </section>
    </article>
  )
}

export default SingleComment