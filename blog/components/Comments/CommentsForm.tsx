import React from 'react'; 
import { Comment as CommentInterface } from '@/models/interfaces/Comment';

interface Props  { 
  handleSubmit: () => void
  comment: Partial<CommentInterface> 
  setComment: React.Dispatch<React.SetStateAction<Partial<CommentInterface>>> 
}

const CommentsForm = ({ handleSubmit, comment, setComment }: Props) => {
  return (
    <form onSubmit = { handleSubmit }>
      <input type="text" value = { comment.text } 
        onChange = { (e: React.FormEvent<HTMLInputElement>) => { setComment({ ...comment, text: e.currentTarget.value })}} 
      />

      <button type = 'submit'> Comment </button>
    </form>
  )
}

export default CommentsForm; 