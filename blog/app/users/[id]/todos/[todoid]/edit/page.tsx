'use client'; 

import { useState, useEffect } from 'react'; 
import { Todo as TodoInterface, initialTodo } from '../../../../../../models/interfaces/Todo'; 
import TodoForm from '../../../../../../components/Todo/TodoForm'; 

import { usePathname, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const EditTodo = () => {
    const pathName = usePathname(); //for extracting the todoid
    const { data: session } = useSession(); 
    const router = useRouter (); 

    // Elements for Todo Form
    const [ todo, setTodo ] = useState <Partial<TodoInterface>> (initialTodo); 
    const [ submitting, setSubmitting ] = useState <boolean> (false);
    const [ loading, setLoading ] = useState <boolean> (false); 
    const [ error, setError ] = useState <string> (""); 

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

      try { 
        const response = await fetch(`/api/users/${session?.user?.id}/todos/${ID}`, { 
          method: "PATCH", 
          mode: "cors", 
          body: JSON.stringify({
            title: todo.title, 
            description: todo.description, 
            list: todo.list, 
            userid: session?.user?.id
          }), 
          headers: { 
            'Content-Type': "application/json", 
          }
        }); 

        if(!response.ok && response.status === 500) { 
          setError('An internal server errror occured. We are sorry!'); 
        }

        if(response.ok) { 
          router.push(`/users/${session?.user?.id}`); 
          return; 
        }
      } catch (err) { 
        console.log(err); 
      } finally { 
        setSubmitting(false); 
      }
    }

    const handleClearError = () => { 
      setError(""); // make the error notification dissapear
    }

  return (
    <section>
      { error && 
        <div className='w-screen fixed'>
        <article className = 'flex justify-between mx-auto w-1/2 bg-red-400 p-4 rounded-xl'> 
            <p> { error } </p>
            <button onClick = { handleClearError } className = 'text-sm hover:scale-150 transition-all duration-300'> X </button>
        </article>
        </div>
      }
      <TodoForm 
          type = 'Edit'
          todo = { todo }
          setTodo = { setTodo }
          submitting = { submitting }
          handleSubmit = { editTodo }
      /> 
    </section>
  )
}

export default EditTodo