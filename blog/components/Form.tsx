import React from 'react'; 
import { Post } from '@/models/interfaces/Post';

const VISIBILITY_TYPES: string [] = ['public', 'private']; 

interface Props { 
  type: string, 
  submitting: boolean, 
  post: Partial<Post>,
  setPost: React.Dispatch<React.SetStateAction<Partial<Post>>>, 
  handleSubmit: (e: React.FormEvent) => void,  
}

const Form = ({ type, submitting, post, setPost, handleSubmit }: Props) => {
  return (
    <section>
      <h1 className='global_header'>{ type } Post </h1>
      <p className='font-satoshi mx-4 my-8'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod, quisquam velit in unde voluptates saepe soluta et
         error ullam quos corporis blanditiis officiis, similique perferendis minima tempore quam illo veritatis!</p>

      <form 
        onSubmit = { handleSubmit }
        className = 'flex flex-col bg-slate-200 ml-10 mr-40 my-10 p-5 rounded-2xl'
      >
        <label className='input_label'>
          <span className='mx-4 text-base my-0.5 font-medium font-satoshi'> Title: </span>
          <input 
            type="text" 
            required
            placeholder='An amazing holiday'
            className='form_input'
            value = { post.title }
            onChange = { (e) => { setPost({...post, title: e.target.value })}}
          />
        </label>

        <label className='input_label'>
          <span className='mx-8 text-base my-0.5 font-medium font-satoshi'> Type:  </span>
          <select 
            className='mx-8 my-2 bg-slate-300 px-2 py-1 rounded-xl'
            required
            value = { post.visibility }
            onChange = { (e) => { setPost({ ...post, visibility: e.target.value })}}
          >
            <option value= ''>  Choose the status for your post.  </option>
            { VISIBILITY_TYPES.map(type => { 
              return ( 
                <option value= { type }> { type } </option>
              )
            })}
          </select>
        </label>

        <label className='input_label'>
          <span className='mx-4 text-base my-0.5 font-medium font-satoshi'> Post: </span>
          <textarea 
            required 
            value = { post.text }
            placeholder =  "It was a gorgeous day of summer..."
            className='form_input h-40'
            onChange = { (e) => { setPost({ ...post, text: e.target.value })}}  
          />
        </label>

        <div className='flex justify-center items-center mt-4'>
          <button 
            type = 'submit'
            className='submit_button'
            disabled = { submitting }
          >
            { submitting ? `${type}...` : type }
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form