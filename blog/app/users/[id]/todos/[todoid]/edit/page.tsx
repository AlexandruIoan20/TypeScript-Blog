'use client'; 

import { useState, useEffect } from 'react'; 
import { Todo as TodoInterface, initialTodo } from '../../../../../../models/interfaces/Todo'; 
import TodoForm from '../../../../../../components/Todo/TodoForm'; 

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const EditTodo = () => {
    const pathName = usePathname(); //for extracting the todoid
    const { data: session } = useSession(); 

    // Elements for Todo Form
    const [ todo, setTodo ] = useState <Partial<TodoInterface>> (initialTodo); 
    const [ submitting, setSubmitting ] = useState <boolean> (false);
    const [ loading, setLoading ] = useState <boolean> (false); 

    const extractTodoId = () => { 
      const id = pathName.split("/")[4];
      return id; 
    }

    const ID = extractTodoId(); //todo id 

    useEffect( () => {

      const getTodoData = async  () => { 
        setLoading(true); 

        try { 
          const response = await fetch(`/api/users/${session?.user?.id}/todos/${ID}`); 
          const todoResponse = await response.json();
          console.log({ todoResponse }) //DELETE
          setTodo(todoResponse); 
        } catch(err) { 
          console.log(err); 
        } finally { 
          setLoading(false); 
        }
      }; 

      getTodoData(); 
    }, [])

    const editTodo = async (e: React.FormEvent) => { 
        e.preventDefault(); 
        setSubmitting(true); 

      // try { 
      //   const response = await fetch(`/api/users/${session?.user?.id}/todos/${}`)
      // } catch (err) { 
      //   console.log(err); 
      // } finally { 
      //   setSubmitting(false); 
      // }
    }

  return (
    <TodoForm 
        type = 'Edit'
        todo = { todo }
        setTodo = { setTodo }
        submitting = { submitting }
        handleSubmit = { editTodo }
    /> 
  )
}

export default EditTodo