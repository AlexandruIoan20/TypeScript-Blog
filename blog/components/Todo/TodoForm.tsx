import { Todo as TodoInterface } from '../../models/interfaces/Todo'; 
import React from 'react';

interface Props { 
  type: string, 
  todo: Partial <TodoInterface>, 
  submitting: boolean, 
  handleSubmit: (e: React.FormEvent) => void, 
  setTodo: (React.Dispatch<React.SetStateAction<Partial<TodoInterface>>>)
}

interface DefaultProps { 
  labelTitle: string
  placeholder: string, 
  value: string, 
  required: boolean, 
}

interface InputProps extends DefaultProps { 
  executeChange: (e: React.ChangeEvent<HTMLInputElement>) => void 
}

interface TextAreaProps extends DefaultProps { 
  executeChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

const InputElement = ({ labelTitle, placeholder, required, value, executeChange }: InputProps) => { 
  return ( 
    <>
      <label className = "input_label">
        <span className='mx-4 text-base my-0.5 font-medium font-satoshi'> { labelTitle } </span>
        <input 
          type="text" 
          required = { required }
          placeholder = { placeholder }
          className='form_input'
          value = { value }
          onChange = { (e) => { executeChange(e)}}
        /> 
      </label>
    </>
  )
}

const TextAreaInput =({labelTitle, placeholder, required, value, executeChange }: TextAreaProps) => { 
  return ( 
    <>
      <label className = 'input_label'>
        <span className='mx-4 text-base my-0.5 font-medium font-satoshi'> { labelTitle }: </span>
        <textarea 
            required = { required }
            value = { value }
            placeholder =  { placeholder }
            className='form_input h-40'
            onChange = { (e) => executeChange(e) }  
          />
      </label>
    </>
  )
}

const TodoForm = ({ type, todo, submitting, handleSubmit, setTodo }: Props ) => {
  return (
    <section>
        <h1 className='global_header'>{ type } Todo </h1>
        <p className='font-satoshi mx-4 my-8'> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod, quisquam velit in unde voluptates saepe soluta et
      error ullam quos corporis blanditiis officiis, similique perferendis minima tempore quam illo veritatis!</p>

      <form
          onSubmit = { handleSubmit }
          className = 'flex flex-col bg-slate-200 ml-10 mr-40 my-10 p-5 rounded-2xl'
      >
        <InputElement 
          labelTitle='Title'
          placeholder='...your title'
          required = { true }
          value = { todo.title || ""}
          executeChange = { (e) => { setTodo({ ...todo, title: e.target.value })}}
        /> 

        <TextAreaInput 
          labelTitle='Description'
          placeholder = '...your description'
          required =  { true }
          value =  { todo.description || ""}
          executeChange = { e => { setTodo({ ...todo, description: e.target.value })}}
        /> 
      </form>
    </section>
  )
}

export default TodoForm