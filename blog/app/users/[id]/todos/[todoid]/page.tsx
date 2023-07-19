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
  }, []); 

  const markDone = async (id: string, itemIndex: number) => {
    try { 
      const response = await fetch(`/api/users/${session?.user?.id}/todos/${id}/done`, { 
        method: "PATCH", 
        mode: "cors", 
        body: JSON.stringify({ itemIndex }),
        headers: { 
          'Content-Type': "application/json", 
        }
      }); 

      let updateList = todo.list || []; 
      let length = updateList.length || 0; 

      for(let i = 0; i < length; i++) { 
        if(i === itemIndex) { 
          updateList[i].done = !updateList[i].done; 
        }
      }

      setTodo({ ...todo, list: updateList } )
      console.log({ updateList }); 

      if(response.ok) { 
        return; 
      }
    } catch(err) { 
      console.log(err); 
    }
  }
  return (
    <section>
      { loading && 
        <p> Loading... </p>
      }

      { !loading &&
        <Todo todo = { todo } markDone = { markDone } />
      }
    </section>
  )
}

export default TodoPage; 