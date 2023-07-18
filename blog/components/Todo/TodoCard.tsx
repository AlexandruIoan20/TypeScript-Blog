import { Todo as TodoInterface } from '../../models/interfaces/Todo'; 
import { useState, useEffect } from 'react'; 
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { BsPencil } from 'react-icons/bs'; 
import { RiDeleteBin7Line } from 'react-icons/ri';


interface Props { 
  todo: Partial<TodoInterface>
  handleDeleteTodo: () => void 
}

const TodoCard = ({ todo, handleDeleteTodo }: Props) => {
  const { data: session } = useSession(); 
  const [ finishedTasks, setFinishedTasks ] = useState <number> (0); 

  useEffect ( () => { 
    let fTasks = 0; 
    let list = todo.list || []; 
    const length = todo.list === undefined ? 0 : todo.list.length; 

    for(let i = 0; i < length; i++) { 
      if(list[i].done === true) fTasks++; 
    }

    setFinishedTasks(fTasks); 
  }, [])
  return (
        <article className = 'bg-slate-200 my-4 mx-8 p-4 rounded-xl'>
          <p className = 'text-xl font-satoshi'> { todo.title } </p>
          { todo.list != undefined &&
            <p className = 'text-sm font-inter text-gray-600'> { todo.list.length } tasks </p>
          }
          <p className = 'text-sm font-inter text-gray-600'> {finishedTasks } tasks finished. </p>

          <div className = 'flex w-full justify-center items-center gap-x-64'>
            <RiDeleteBin7Line className = 'hover:scale-150 transition-all cursor-pointer duraion-300' onClick = { handleDeleteTodo } />
            <Link className = 'hover:scale-150 transition-all cursor-pointer duraion-300' href = { `/users/${session?.user?.id}/todos/${todo._id}/edit`}> <BsPencil /> </Link>
          </div>
          <Link 
            className = 'flex items-center justify-center hover:text-white hover:font-semibold hover:bg-slate-400 transition-all duration-300 mt-4 rounded-xl shadow-inner hover:shadow-md py-1'
            href = {`/users/${session?.user?.id}/todos/${todo._id}`} >
            View
          </Link>
      </article>
  )
}

export default TodoCard