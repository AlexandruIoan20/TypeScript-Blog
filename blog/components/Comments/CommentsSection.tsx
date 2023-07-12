'use client'; 
import React, { useState, useEffect } from "react";
import { Comment as CommentInterface, initialComment} from "@/models/interfaces/Comment";
import CommentsForm from "./CommentsForm";
import { useSession } from "next-auth/react";

interface Props { 
    limit?: number
    id: string, 
}

const CommentsSection = ({ limit, id }: Props) => {
    const [ comments, setComments ] = useState<Partial<CommentInterface> []> ([]); 
    const [ newComment, setNewComment ] = useState <Partial<CommentInterface>> (initialComment); 
    const { data: session } = useSession(); 

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

    const createComment = async (e: React.FormEvent, comment: Partial<CommentInterface> ) => { 
        e.preventDefault(); 
        try  { 
            const response = await fetch(`/api/posts/${id}/comments/create`, { 
                method: "POST", 
                mode: 'cors', 
                body: JSON.stringify({ text: comment.text, userid: session?.user?.id, postid: id }), 
                headers: { 
                    'Content-Type': 'application/json', 
                } 
            }); 

            let commentsUpdate = comments; 
            commentsUpdate.push(comment); 
            setComments(commentsUpdate); 

            if(response.ok) { 
                return; 
            }
        } catch (err) { 
            console.log(err); 
        }
    }
  return (  
    <section>
        <pre> {  JSON.stringify(comments) } </pre>
        <p> Comentarii: </p>
        <CommentsForm 
            handleSubmit = { createComment }
            comment = { newComment }
            setComment =  { setNewComment }
        /> 
    </section>
  )
}

export default CommentsSection