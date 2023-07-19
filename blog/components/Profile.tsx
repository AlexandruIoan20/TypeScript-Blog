'use client'; 

import React, { useState, useEffect } from 'react';
import { initialUser, User } from '@/models/interfaces/User';
import { Post } from '@/models/interfaces/Post';
import GradesList from './Grade';
import Alert from './Alert';
import PostCard from './PostCard';
import { Todo as TodoInterface } from '@/models/interfaces/Todo';
import TodoCard from './Todo/TodoCard';
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';
import Link from 'next/link';

interface Props { 
  name: string, 
  user: Partial<User>,
  handleEditPost: (post: Partial<Post>) => void, 
  handleDeletePost: (post: Partial<Post>) => void, 
  checkMyProfile: boolean, 
  grades: string [], 
  children?: React.ReactNode,
  setShowPostTypes: React.Dispatch<React.SetStateAction<boolean>>, 
  showPostTypes: boolean, 
  isOwner: boolean
}

interface DeveloperProps { 
  name: string, 
  executeFunction: () => void, 
}

interface ChangerProps { 
  setShowPostTypes: React.Dispatch<React.SetStateAction<boolean>>, 
  showPostTypes: boolean
}

const DeveloperButton = ({ name, executeFunction }: DeveloperProps) => { 
  return ( 
    <button
       onClick = { executeFunction } 
       className = { BUTTON_GENERAL_CLASSNAME }
    > { name } </button>
  )
}

const BUTTON_GENERAL_CLASSNAME: string =  `mx-5 text-base font-satoshi bg-light-green px-2 py-1 font-medium 
  rounded-xl hover:rounded-3xl transition-all duration-300 hover:text-xl`; //Class for developer button in profile

const CHANGER_ITEM = `bg-slate-200 w-1/2 text-center py-2 my-4 shadow-xl`; 
const CHANGER_ITEM_HOVER = `bg-slate-500 font-bold text-white w-1/2 text-center py-2 my-4 shadow-xl`

const DeveloperArea = ({ onShowStats }: { onShowStats: () => void }) => { 
  return ( 
    <div className= 'flex flex-col justify-center content-center ml-auto mr-10'>
        <ul className='flex flex-row'>
          <DeveloperButton name = { 'View Stats' } executeFunction = { onShowStats }  /> 
          <Link href = '/create-post' className = { BUTTON_GENERAL_CLASSNAME }> Create Post </Link>
          <Link href = '/create-todo' className = { BUTTON_GENERAL_CLASSNAME }> Create To Do</Link>
        </ul> 
    </div>
  )
}; 

  const ChangerMenu = ({ showPostTypes, setShowPostTypes }: ChangerProps ) => { 
    const [ itemClasses, setItemClasses ] = useState <string []> ([CHANGER_ITEM_HOVER, CHANGER_ITEM]); 

    useEffect( () => { 
      if(showPostTypes) { 
        setItemClasses([CHANGER_ITEM_HOVER, CHANGER_ITEM])
      } else { 
        setItemClasses([CHANGER_ITEM, CHANGER_ITEM_HOVER])
      }
    }, [showPostTypes]);

    return ( 
      <section className = 'flex'>
        <p onClick = { () => { setShowPostTypes(true)} } className = { `${itemClasses[0]}` }>
          Posts
        </p>
        <p onClick = { () => { setShowPostTypes(false)} } className = { `${itemClasses[1]}` }>
          Todo Lists
        </p>
      </section>
    )
}

const GradesSet = ({ id }: { id: string }) => { 
  const router = useRouter(); 
  const setGrade = async (grade: string) => { 
    try { 
      const response = await fetch(`/api/users/${id}/promote`, { 
        method: "PATCH", 
        mode: "cors", 
        body: JSON.stringify({ grade }), 
        headers: { 
          'Content-Type': "application/json", 
        }
      }); //API call 

      if(response.ok) { 
        return; 
      }

      router.push(`/users/${id}`); 
    } catch(err) { 
      console.log(err); 
    }
  }
  return ( 
    <>
      <button className = 'default_button' onClick = { () => { setGrade('Member')}}> Set Member</button>
      <button className = 'default_button' onClick = { () => { setGrade('Admin')}}> Set Admin </button>
      <button className = 'default_button' onClick = { () => { setGrade('Owner')}}> Set Owner </button>
    </>
  )
}
  
const Profile = ({ name, user, handleDeletePost, handleEditPost, checkMyProfile, showPostTypes, setShowPostTypes, isOwner, grades }: Props) => {
  const router = useRouter(); 
  const { data: session } = useSession(); 

  const [ showStats, setShowStats ] = useState<boolean>(false); 
  const [ todos, setTodos ] = useState <Partial<TodoInterface> []>([]); 
  const [ checkForNoTodos, setCheckForNoTodos ] = useState <boolean> (false);  

  const getMemberGrade = async () => { 
    try { 
      const response = await fetch(`api/users/${session?.user?.id}/promote`, { 
        method: "PATCH", 
        mode: "cors", 
        body: JSON.stringify({ grade: "Member "}), 
        headers: { 
          'Content-Type': "application/json", 
        }
      }); //API call 

      if(response.ok) { 
        router.push(`/users/${session?.user?.id}`); 
        return; 
      }
    } catch(err) { 
      console.log(err); 
    }
  }

  const checkForGrades = async () => { 
    let likesCount = user.activity?.likesCount || 0; 
    let  commentsCount = user.activity?.commentsCount  || 0; 
    if(commentsCount == 0 && likesCount == 0) { 
      getMemberGrade(); 
    }; 
  }

  useEffect( () => { //get todo lists data the first time you click the button
    const getTodoData = async () => { 
      const response = await fetch(`/api/users/${session?.user?.id}/todos`); 
      const todoResponse = await response.json(); 

      if(todoResponse.length === 0) { 
        setCheckForNoTodos(true); //it will show a button to create your fist to do list
      }

      console.log(todoResponse[0].activity.todos); 

      setTodos(todoResponse[0].activity.todos); 
    }
    if(!showPostTypes && todos.length == 0) { 
      getTodoData(); 
    }

    checkForGrades(); 
  }, [showPostTypes])

  const like = () => { 

  }

  const handleShowStats = () => { // show stats like number of comments, of likes and of posts 
    setShowStats((x) => !x); 
  }

  const handleCancel = () => { // close button for stats interface 
    setShowStats(false); 
  }

  const handleDeleteTodo = async (index: number) => { //Detele a todo list card completely; 
    try { 
      const response = await fetch(`/api/users/${session?.user?.id}/todos`, { 
        method: "DELETE", 
        mode: "cors", 
        body: JSON.stringify({ deletedIndex: index }), 
        headers: { 
          'Content-Type': "application/json"
        }
      }); //DELETE call for the database

      let newTodos = []; 
      for(let i = 0; i < todos.length; i++) { 
        if(i != index) { 
          newTodos.push(todos[i]); 
        }
      }; //remove the front end card

      setTodos(newTodos); 

      if(response.ok) { 
        return; 
      }
    } catch (err) { 
      console.log(err); 
    }
  }
  return ( 
    <div>
      <>
      <div className='inline-flex w-screen flex-row'>
        <h1 className='global_header'> { name } Profile </h1>
        {
          checkMyProfile && 
            <DeveloperArea onShowStats = { handleShowStats } /> 
        } 
      </div>
      <article className='px-5 flex flex-row gap-x-8'>
        { user != initialUser && 
          <GradesList gradesArray={grades}/>
        }
      </article>
      <hr className='my-2 mx-10'/>

      { isOwner && 
        <GradesSet id = { user._id === undefined ? "" : user._id?.toString() } /> 
      }

      { session?.user?.id === user._id && 
          <ChangerMenu showPostTypes = { showPostTypes } setShowPostTypes = { setShowPostTypes } /> 
      }

      { showStats && user.activity != undefined && 
        <Alert 
          onCancel= { handleCancel }
          content = { {likes: user?.activity.likesCount, comments: user?.activity.commentsCount }} 
          onExecute = { () => { } }
          hasExecute = { false }
          profileStatus = { true }
        /> 
      }

      { user.activity === undefined && 
        alert('User activity is undefined')
      }

      { user?.activity != undefined && user?.activity.posts.length == 0 && checkMyProfile && 
        <Link href = '/create-post' className='default_button'> Create Your First Post </Link>
      }

      { showPostTypes ? 
        ( 
          <>
            { user?.activity != undefined && user?.activity.posts.length > 0 && 
              user?.activity.posts.map((post: Partial<Post> | any) => { 
                return ( 
                  <PostCard 
                    like = { like }
                    onDeletePost = { handleDeletePost }
                    onEditPost = { handleEditPost }
                    key = { Date.now() }
                    dev = { user._id === session?.user?.id }
                    post = { post }
                  /> 
                )
              })
            } 
          </> 
        ) : 
        ( 
          <>
              { todos.length === 0 && !checkForNoTodos && 
                <p>Loading...</p>
              }

              { todos.length === 0 && checkForNoTodos && 
                <div>
                  <p> You don't have a to do list yet</p>
                  <Link href = { `/create-todo` } className = "default_button"> Create Your First To Do List</Link>
                </div>
              }

              { todos.length > 0  && 
                todos.map(todo => { 
                  return <TodoCard  
                    todo = { todo }
                    handleDeleteTodo = { () => { handleDeleteTodo(todos.indexOf(todo))}} 
                    /> 
                })
              }
          </> 
        )
      }
      </>
    </div>
  )
}

export default Profile; 
