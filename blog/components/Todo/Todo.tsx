import { Todo as TodoInterface, listItemInterface } from '../../models/interfaces/Todo'; 

interface Props { 
  todo: Partial<TodoInterface> 
  markDone: (id: string, itemIndex: number) => void
}

interface ListProps { 
  id: string
  list: listItemInterface []
  markDone: (id: string, itemIndex: number) => void
}

interface TodoItemProps { 
  index: number
  id: string
  item: listItemInterface
  markDone: (id: string, itemIndex: number) => void
}

const TodoItem = ({ item, markDone, index, id}: TodoItemProps) => { 
  const DEFAULT_CLASSES = `flex justify-between mx-8 my-2 p-2 shadow-md `
  return ( 
    <>
      { item.done ? 
      (
        <div className =  { `${DEFAULT_CLASSES} bg-green-200` }>
        <p className = 'flex items-center'> { item.text } </p>
        <button className = 'default_button'  onClick = { () => { markDone(id, index)}}> Unmark </button>
      </div>
      )  : (
        <div className =  { `${DEFAULT_CLASSES} bg-slate-200` }>
          <p className = 'flex items-center'> { item.text } </p>
          <button className = 'default_button'  onClick = { () => { markDone(id, index)}}> Mark </button>
        </div>
      )
    }
    </>
  )
}

const ListArea = ({ list, markDone, id }: ListProps) => { 
  return ( 
    <section>
      { list.map((item, index) => { 
        return <TodoItem id = { id } item = { item } index = { index } markDone = { markDone } /> 
      })}
    </section>
  )
}

const Todo = ({ todo, markDone }: Props) => {
  return (
    <section>
      <div className = 'bg-slate-200 mx-4 my-8 px-4 py-2 shadow-md '>
        <h2> { todo.title } </h2>
        <p>{ todo.description } </p>
      </div>

      <div>
        <ListArea
          id = { todo._id === undefined ? "" : todo._id.toString() } 
          list = { todo.list === undefined ? [] : todo.list } 
          markDone = { markDone } /> 
      </div>
      <pre> {JSON.stringify(todo) } </pre>
    </section>
  )
}

export default Todo