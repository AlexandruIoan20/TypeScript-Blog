'use client'; 
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from 'react'; 
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { IconContext } from "react-icons";
import { CommentButton, LikeButton } from "@/components/buttons/interaction_buttons";
import { Post as PostInterface, initialPost } from "@/models/interfaces/Post";
import CommentsSection from "@/components/Comments/CommentsSection";
import { Comment as CommentInterface  } from "@/models/interfaces/Comment";

const CustomHeartInfo = () => {
    return (
        <IconContext.Provider value = {{ size: '20', color: '#BF99F2'}} >
            <AiFillHeart /> 
        </IconContext.Provider>
    )
}; 

const CustomCommentInfo = () => { 
    return ( 
        <IconContext.Provider value = {{ size: '20', color: '#BF99F2' }}>
            <FaComment /> 
        </IconContext.Provider>
    )
}

const Post = () => {
    const pathName = usePathname(); 
    const id: string = pathName.split("/")[2]; 
    const [post, setPost] = useState <Partial<PostInterface>> (initialPost); 
    const [ showCommentSection, setShowCommentsSection ] = useState <boolean> (false); 

    useEffect( () => { 
        const getPostData = async () => { 
            const response = await fetch(`/api/posts/${id}`); 
            const postData: Partial<PostInterface> = await response.json(); 

            setPost(postData); 
        }

        getPostData(); 
    }, []); 

    const toggleCommentSection = () => { 
        setShowCommentsSection(sc => !sc); 
    }
    
  return (
    <section>
        { post == initialPost && 
            <p> Loading...</p>
        }

        { post!= undefined && 
            <>
                <h1 className="global_header"> {post.title} </h1>

                <article className="mx-20 bg-slate-200 shadow-xl p-5">
                    { post.text }
                    <br />
                    <section className="flex gap-x-10 mt-10">
                        <div className="flex">
                            <LikeButton executeFunction={ () => { }}/> 
                            <p> { post.interaction?.likes }  </p> 
                        </div>
                        <CommentButton executeFunction={ toggleCommentSection } /> 
                    </section>
                </article>

                { showCommentSection && 
                    <CommentsSection id = { post._id?.toString() || "" } /> 
                }
            </>
        }
    </section>
  )
}

export default Post; 