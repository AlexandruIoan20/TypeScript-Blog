'use client'; 

import { useState, useEffect } from 'react'; 
import Profile from '@/components/Profile';
import { useSession } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation'; 
import { User as UserInterface, initialUser } from '@/models/interfaces/User';
import { Post } from '@/models/interfaces/Post';

const ProfilePage = () => { 
    const { data: session } = useSession(); 
    const router = useRouter(); 
    const pathname = usePathname(); 

    const [ user, setUser ] = useState <Partial<UserInterface>> (initialUser); 
    const [ grades, setGrades ] = useState <string []> ([]); 
    const [ checkMyProfile, setCheckMyProfile ] = useState <boolean> (false); 
    const [ userPosts, setUserPosts ] = useState <Partial<Post> []> ([]); 
    const [ showPostTypes, setShowPostTypes ] = useState <boolean> (true) //true for posts and false for todo lists

  useEffect( () => { 
    console.log(user); 
    const getUserData = async () => { 
      // Get User
      try { 
        const response = await fetch(`/api${pathname}`); 
        const userResponse = await response.json();     
  
        setUser(userResponse); 
        setGrades(userResponse.status); 
        setUserPosts(userResponse.activity.posts); 
  
        // Check if it is my account
        const id = pathname.split('/')[2]; 
        if(id === session?.user?.id)
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

    const handleDeletePost = async (post: Partial<Post>) => { 
      const posts: Partial<Post> [] = userPosts; 
      try { 
        await fetch(`/api/posts/${post._id?.toString()}`, { 
          method: "DELETE", 
          mode: 'cors',
          headers: { 
            'Content-Type': 'application/json', 
          }
        }); 
         
      } catch (err) { 
        console.log("We have an error"); 
        console.error(err); 
      }

      const filteredPosts: Partial<Post> [] = posts.filter(el => el._id != post._id); 
      setUser({ ...user, activity: { ...user.activity, posts: filteredPosts }}); 
    }

    return (
        <>
          { user != undefined ? 
          (
            <Profile 
              name = { `${user.username}'s` }
              user = { user }
              handleEditPost = { handleEditPost }
              handleDeletePost = { handleDeletePost }
              checkMyProfile = { checkMyProfile }
              grades = { grades }
              showPostTypes = { showPostTypes }
              setShowPostTypes = { setShowPostTypes }
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