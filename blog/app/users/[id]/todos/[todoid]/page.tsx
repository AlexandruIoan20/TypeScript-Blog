'use client'; 
import { useState, useEffect } from 'react'; 
import { Todo as TodoInterface, initialTodo } from '../../../../../models/interfaces/Todo'; 
import Todo from '@/components/Todo/Todo';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

const TodoPage = () => {
  const pathName = usePathname(); 

  const [ todo, setTodo ] = useState <Partial<TodoInterface>> (initialTodo); 
  const [ loading, setLoading ] = useState <boolean> (false); 
  const { data: session } = useSession(); 

  const extractTodoId = () => { 
    return pathName.split("/")[4]; 
  }

  const ID = extractTodoId(); // the todoid to do the backend request

  useEffect ( () => { 
    const getTodoData = async () => { 
      setLoading(true); 

      try { 
        const response = await fetch(`/api/users/${session?.user?.id}/todos/${ID}`); 
        const todoResponse = await response.json(); 

        setTodo(todoResponse); 
        console.log( { todoResponse }); 
      } catch (err) { 
        console.log(err); 
      } finally { 
        setLoading(false); 
      }
    }; 

    getTodoData(); 
  }, [])
  return (
    <section>
      { loading && 
        <p> Loading... </p>
      }

      { !loading &&
        <Todo />
      }
    </section>
  )
}

export default TodoPage; 