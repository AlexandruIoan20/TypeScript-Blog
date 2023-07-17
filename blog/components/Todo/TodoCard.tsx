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
    <Link href = {`/users/${session?.user?.id}/todos/${todo._id}`} >
        <article className = 'bg-slate-200 my-4 mx-8 p-4 rounded-xl hover:bg-slate-400 transition-all duration-300'>
          <p className = 'text-xl font-satoshi'> { todo.title } </p>
          { todo.list != undefined &&
            <p className = 'text-sm font-inter text-gray-600'> { todo.list.length } tasks </p>
          }
          <p className = 'text-sm font-inter text-gray-600'> {finishedTasks } tasks finished. </p>

          <div>
            <RiDeleteBin7Line onClick = { handleDeleteTodo } />
          </div>
      </article>
    </Link>
  )
}

export default TodoCard