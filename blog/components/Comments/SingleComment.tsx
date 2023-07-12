'use client'; 

import React, { useState } from 'react'
import { Comment as CommentInterface } from '@/models/interfaces/Comment'

interface Props { 
  comment: Partial <CommentInterface> 
}

const Comment = ({ comment }: Props) => {
  return (
    <article className = 'p-2 bg-slate-200 my-2 mx-4 shadow-md'>
      <div className = 'font-inter text-sm text-gray-600'>
        { comment.creator?.toString() }
      </div>

      <p> { comment.text } </p>
    </article>
  )
}

export default Comment