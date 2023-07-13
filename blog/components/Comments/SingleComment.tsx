'use client'; 

import React from 'react'
import { Comment } from '@/models/interfaces/Comment'; 
import { useSession } from 'next-auth/react';
import { User as UserInterface, initialUser } from '@/models/interfaces/User';

import Image from 'next/image';

interface Props { 
  comment: Partial <Comment>, 
  deleteComment: (comment: Partial<Comment> ) => void,  
  editComment: (e: React.FormEvent<Element> , comment: Partial <Comment>, text: string ) => void,  
  showEditor: string, 
  newCommentText: string, 
  setNewCommentText: React.Dispatch<React.SetStateAction<string>>, 
  handleShowEdit: (id: string) => void, 
  developerMode: boolean
}

const SingleComment = ({ comment, deleteComment, editComment, newCommentText, showEditor, setNewCommentText, handleShowEdit, developerMode}: Props) => {
  const { data: session } = useSession(); 
  const CREATOR: Partial<UserInterface> = comment.creator || initialUser;

  return (
    <article className = 'p-2 bg-slate-200 my-2 mx-4 shadow-md'>
      <section className = 'flex items-center gap-x-2 mb-2'>
        <Image src = { `${CREATOR.image}` } width = { 30 } height = { 30 } className = 'rounded-3xl' alt = 'user_image' /> 
        <div className = 'font-inter text-sm text-gray-600'>
          { `@${CREATOR.username}` }
        </div>
      </section>

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

        { developerMode ? 
          ( 
            <>
              { session?.user?.id.toString() === CREATOR._id?.toString()  ? 
                ( 
                  <>
                    <button className = 'default_button' onClick = { () => handleShowEdit(comment._id?.toString() || "") }> Edit </button>
                    <button className = 'default_button' onClick = { () => { deleteComment(comment)}}> Delete </button></> 
                ) : ( 
                  <>
                    <button className = 'default_button' onClick = { () => { deleteComment(comment)}}> Delete </button>
                  </>
                )

              }
            </>
          ) : ( 
            <>
            </>
          )
        }
      </section>
    </article>
  )
}

export default SingleComment