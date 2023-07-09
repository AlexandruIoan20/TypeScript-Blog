'use client'; 

import { useState, useEffect } from 'react'; 
import Profile from '@/components/Profile';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation'; 
import { User as UserInterface, initialUser } from '@/models/interfaces/User';
import { Post } from '@/models/interfaces/Post';
import { Schema } from 'mongoose';

const ProfilePage = () => { 
    const { data: session }: { data: any } = useSession(); 
    const router = useRouter(); 
    const pathname = usePathname(); 

    const [ user, setUser ] = useState <Partial<UserInterface>> (initialUser); 
    const [ grades, setGrades ] = useState <string []> ([]); 
    const [ checkMyProfile, setCheckMyProfile ] = useState <boolean> (false); 

  useEffect( () => { 
    console.log(user); 
    const getUserData = async () => { 
      // Get User
      try { 
        const response = await fetch(`/api${pathname}`); 
        const userResponse = await response.json(); 
  
        setUser(userResponse); 
        setGrades(userResponse.status); 
  
        // Check if it is my account
        const id = pathname.split('/')[2]; 
        if(id === session?.user.id)
          setCheckMyProfile(true); 
      } catch(err) { 
        console.log(err); 
      }
    }; 

    getUserData(); 
  }, []); 

    const handleEditPost = (post: Partial<Post>) => { 
        console.log(post); 
        router.push(`/update-post?id=${post._id}`); 
    }

    const handleDeletePost = (post: Partial<Post>) => { 

    }

    return (
        <>
          { user != undefined ? 
          (
            <Profile 
              name = 'My'
              user = { user }
              handleEditPost = { handleEditPost }
              handleDeletePost = { handleDeletePost }
              checkMyProfile = { checkMyProfile }
              grades = { grades }
            />
          ) 
          : 
          ( 
            <p> No user yet </p>
          )
        }
        </>
      )
}; 

export default ProfilePage; 