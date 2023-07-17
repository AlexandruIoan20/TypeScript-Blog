'use client'; 

import TodoForm from "@/components/Todo/TodoForm";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Todo as TodoInterface, initialTodo} from '../../models/interfaces/Todo'; 

const CreateTodo = () => {
    const { data: session } = useSession(); 
    const router = useRouter(); 

    const [ todo, setTodo ] = useState <Partial<TodoInterface>> (initialTodo); 
    const [ submitting, setSubmitting ] = useState <boolean> (false); 

    const createTodo = async (e: React.FormEvent) => { 
      console.log({ todo }); 
      e.preventDefault(); 
      setSubmitting(true); 
      try { 
        const response = await fetch('/api/create-todo', { 
          method: "POST", 
          mode: "cors", 
          body: JSON.stringify({ 
            userid: session?.user?.id, 
            title: todo.title, 
            description: todo.description, 
            list: todo.list, 
          }), 
          headers: {
            'Content-Type': "application/json", 
          }
        }); 

        if(response.ok) {
          router.push(`/users/${session?.user?.id}`);  
          return; 
        }
      } catch (err) { 
        console.log(err); 
      } finally { 
        setSubmitting(false); 
        setTodo(initialTodo); 
      }
    }
  return (
    <TodoForm 
      type = 'Create'
      submitting = { submitting }
      todo = { todo }
      handleSubmit = { createTodo }
      setTodo = { setTodo }
    /> 
  )
}

export default CreateTodo