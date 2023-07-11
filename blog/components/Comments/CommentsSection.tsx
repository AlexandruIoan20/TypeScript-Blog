'use client'; 
import React, { useState, useEffect } from "react";
import { Comment as CommentInterface, initialComment} from "@/models/interfaces/Comment";
import CommentsForm from "./CommentsForm";

interface Props { 
    limit?: number
    id: string, 
}

const CommentsSection = ({ limit, id }: Props) => {
    const [ comments, setComments ] = useState<Partial<CommentInterface> []> ([]); 
    const [ newComment, setNewComment ] = useState <Partial<CommentInterface>> (initialComment); 

    useEffect( () => { 
        if(id == "") { 
            console.log("id is null in comments section"); 
        }
        const getCommentsData = async () => { 
            if(limit) { 
                const response = await fetch(`/api/posts/${id}/comments/limit`); 
                const commentsResponse: Partial<CommentInterface> [] = await response.json();
                console.log(commentsResponse); 
                setComments(commentsResponse); 
            } else { 
                const response = await fetch(`/api/posts/${id}/comments`); 
                const commentsResponse: Partial<CommentInterface> [] = await response.json();
                setComments(commentsResponse); 
            }
        }; 

        getCommentsData(); 
    }, []); 

    const createComment = () => { 

    }
  return (  
    <section>
        <pre> {  JSON.stringify(comments) } </pre>
        <CommentsForm 
            handleSubmit = { createComment }
            comment = { newComment }
            setComment =  { setNewComment }
        /> 
    </section>
  )
}

export default CommentsSection