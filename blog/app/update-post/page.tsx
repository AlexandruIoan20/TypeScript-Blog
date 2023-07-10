'use client'
import React, { useState, useEffect } from 'react'; 
import Form from '../../components/Form'; 
import { useRouter, useSearchParams } from "next/navigation";
import { Post as PostInterface } from '../../models/interfaces/Post'; 
import { useSession } from 'next-auth/react';

const UpdatePage = () => {
    const searchParams = useSearchParams(); 
    const POST_ID = searchParams.get('id'); 
    const { data: session } = useSession(); 

    const router = useRouter(); 
    const [submitting, setSubmitting] = useState <boolean> (false); 
    const [post, setPost] = useState <Partial<PostInterface>> ({});
    
    useEffect(() => { 
        async function getPostData () { 
            try { 
              const response = await fetch(`/api/posts/${POST_ID}`, { 
                method: 'GET'
              }); 
    
              const postResponse: Partial<PostInterface> = await response.json(); 
              console.log(postResponse); 
              setPost(postResponse); 
            } catch(err) { 
              console.error(err); 
            }
          }
    
          getPostData(); 
    }, []); 

    const editPost = async (e: React.FormEvent) => { 
      e.preventDefault(); 
      setSubmitting(true); 

      try { 
        const response = await fetch(`/api/posts/${POST_ID}`, { 
          method: 'PATCH', 
          mode: 'cors', 
          body: JSON.stringify({  
            title: post.title, 
            visibility: post.visibility, 
            text: post.text, 
          }), 
          headers: { 
            'Content-Type': 'application/json'
          }
        }); 

        if(response.ok) { 
          router.push('/'); 
        }
      } catch(err) { 
        console.error(err); 
      } finally { 
        setSubmitting(false); 
      }

      router.push(`/users/${session?.user?.id}`); 
  }
  return (
    <section>
        <Form 
            type = 'Edit'
            submitting = { submitting }
            post = { post }
            setPost = { setPost }
            handleSubmit = { editPost }
        /> 
    </section>
  )
}

export default UpdatePage