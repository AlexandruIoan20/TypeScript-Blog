import React from 'react'; 
import { Comment as CommentInterface } from '@/models/interfaces/Comment';

interface Props  { 
  handleSubmit: (e: React.FormEvent, comment: Partial<CommentInterface>) => void
  comment: Partial<CommentInterface> 
  setComment: React.Dispatch<React.SetStateAction<Partial<CommentInterface>>> 
}

const CommentsForm = ({ handleSubmit, comment, setComment }: Props) => {
  return (
    <form onSubmit = {(e) => handleSubmit(e, comment) } className = 'px-4 my-2 py-2'> 
      <input type="text" value = { comment.text } className = 'rounded-sm px-2 py-1 border-none font-inter outline-none'
        onChange = { (e: React.FormEvent<HTMLInputElement>) => { setComment({ ...comment, text: e.currentTarget.value })}} 
      />

      <button type = 'submit' className = 'bg-slate-300 ml-1 rounded-md py-1 px-2 hover:bg-slate-400 transition-all duration-300'> Comment </button>
    </form>
  )
}

export default CommentsForm; 