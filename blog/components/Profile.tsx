
'use client'; 

import React, { useEffect } from 'react';
import { initialUser, User } from '@/models/interfaces/User';
import { Post } from '@/models/interfaces/Post';
import GradesList from './Grade';
import Alert from './Alert';
import PostCard from './PostCard';

import { useSession } from 'next-auth/react';
import { useState } from 'react';
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
  showPostTypes: boolean
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
          <Link href = '/create-post' className= { BUTTON_GENERAL_CLASSNAME }> Create Post </Link>
          <DeveloperButton name = { 'testB' } executeFunction = { () => { }} /> 
        </ul>
    </div>
  )
}; 

  const ChangerMenu =  ({ showPostTypes, setShowPostTypes }: ChangerProps ) => { 
    const [ itemClasses, setItemClasses ] = useState <string []> ([CHANGER_ITEM_HOVER, CHANGER_ITEM]); 

    useEffect( () => { 
      if(showPostTypes) { 
        setItemClasses([CHANGER_ITEM_HOVER, CHANGER_ITEM])
      } else { 
        setItemClasses([CHANGER_ITEM, CHANGER_ITEM_HOVER])
      }
    })
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
  

const Profile = ({ name, user, handleDeletePost, handleEditPost, checkMyProfile, showPostTypes, setShowPostTypes, grades}: Props) => {
  const { data: session } = useSession(); 
  const [ showStats, setShowStats ] = useState<boolean>(false); 

  useEffect( () => { 
    const getTodoData = async () => { 
      const response = await fetch(`/api/users/${user._id}/todos`); 
      const todoResponse = await response.json(); 
    }
    if(!showPostTypes) { 
      getTodoData(); 
    }
  }, [showPostTypes])

  const like = () => { 

  }

  const handleShowStats = () => { 
    setShowStats((x) => !x); 
  }

  const handleCancel = () => { 
    setShowStats(false); 
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
    </div>
  )
}

export default Profile; 
