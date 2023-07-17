import { Todo as TodoInterface } from '../../models/interfaces/Todo'; 
import React from 'react';
import ListForm from './ListForm';
import { TextAreaInput, InputElement } from '../Inputs/Inputs';

interface Props { 
  type: string, 
  todo: Partial <TodoInterface>, 
  submitting: boolean, 
  handleSubmit: (e: React.FormEvent) => void, 
  setTodo: (React.Dispatch<React.SetStateAction<Partial<TodoInterface>>>)
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

        <ListForm 
          todo = { todo }
          setTodo = { setTodo }
          listLength = { todo.list?.length || 0 }
        /> 
      </form>
    </section>
  )
}

export default TodoForm