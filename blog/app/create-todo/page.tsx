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