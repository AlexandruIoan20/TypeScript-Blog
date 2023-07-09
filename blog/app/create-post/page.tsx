'use client'; 

import Form from '@/components/Form';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Post } from '@/models/interfaces/Post';
import { useDispatch, useSelector} from 'react-redux';
import type { RootState } from '../GlobalRedux/store';
import { addPost } from '../GlobalRedux/Features/post/postSlice';


const CreatePost = () => {
    const posts = useSelector((state: RootState) => state.posts); 
    const dispatch = useDispatch(); 
    const { data: session } = useSession(); 
    const router = useRouter (); 

    const [submitting, setSubmitting ] = useState <boolean> (false); 
    const [post, setPost] = useState <Partial<Post>> ({}); 

    const handleSubmit = async (e: React.FormEvent) => { 
        e.preventDefault(); 
        setSubmitting(true); 

        try { 
            const response = await fetch('api/create-post',{ 
                method: 'POST', 
                mode: 'cors', 
                body: JSON.stringify({ 
                  title: post.title, 
                  userId: session?.user?.id, 
                  text: post.text, 
                  visibility: post.visibility, 
                }), 
              }); 

              if(response.ok) { 
                dispatch(addPost(post));
                console.log("Post added");  
                router.push("/"); 
              }
        } catch (err) { 
            console.log("We have an error")
            console.error(err); 
        } finally { 
            setSubmitting(false); 
        }
    }

    return (
        <Form 
            type = 'Create' 
            submitting = { submitting } 
            post = { post } 
            setPost = { setPost } 
            handleSubmit = { handleSubmit } 
        />
      )
}

export default CreatePost