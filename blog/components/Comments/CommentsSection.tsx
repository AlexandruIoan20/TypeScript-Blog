'use client'; 
import React, { useState, useEffect } from "react";
import { Comment as CommentInterface, initialComment} from "@/models/interfaces/Comment";
import CommentsForm from "./CommentsForm";
import { useSession } from "next-auth/react";
import SingleComment from "./SingleComment";
import { usePathname } from "next/navigation";

interface Props { 
    limit?: number
    id: string, 
}

const CommentsSection = ({ limit, id  }: Props) => {
    const pathName = usePathname(); 

    const [ comments, setComments ] = useState<Partial<CommentInterface> []> ([]); 
    const [ newComment, setNewComment ] = useState <Partial<CommentInterface>> (initialComment); 
    const [ noComments, setNoComments ] = useState <boolean> (false); 
    const { data: session } = useSession(); 

    useEffect( () => { 
        if(id == "") { 
            console.log("id is null in comments section"); 
        }
        const getCommentsData = async () => { 
            if(limit) { 
                const response = await fetch(`/api/posts/${id}/comments/limit`); 
                const commentsResponse = await response.json();
                console.log(commentsResponse); 
                if(commentsResponse.comments?.length == 0) { 
                    setNoComments(true); 
                }
                setComments(commentsResponse.comments); 
            } else { 
                const response = await fetch(`/api/posts/${id}/comments`); 
                const commentsResponse: Partial<CommentInterface> [] = await response.json();
                setComments(commentsResponse); 
                if(commentsResponse.length == 0) { 
                    setNoComments(true); 
                }
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

            const commentObject: Partial <CommentInterface>  = { 
                text: comment.text, 
                creator: session?.user?.id, 
                post: id, 
            }

            commentsUpdate.push(commentObject); 
            console.log({ commentsUpdate }); 
            setComments(commentsUpdate);
            
            setNewComment(initialComment); 

            if(response.ok) { 
                return; 
            }
        } catch (err) { 
            console.log(err); 
        }
    }

    const deleteComment = async (comment: Partial<CommentInterface> ) => { 
        try { 
            const response = await fetch(`/api/posts/${id}/comments/${comment._id}`, { 
                method: "DELETE", 
                mode: "cors", 
                headers: { 
                    'Content-Type': "application/json" 
                }
            } ); 

            let commentsUpdate = comments; 

            commentsUpdate = commentsUpdate.filter(com => com._id?.toString () != comment._id?.toString()); 
            setComments(commentsUpdate); 

            if(response.ok) { 
                return; 
            }
        } catch (err) { 
            console.log(err); 
        }
    }; 

    const editComment = async (e: React.FormEvent<Element> , comment: Partial<CommentInterface>, text: string ) => { //bug un edit in minus la setstate in display
        e.preventDefault(); 

        try { 
            const response = await fetch(`/api/posts/${id}/comments/${comment._id}`,  {
                method: "PATCH", 
                mode: "cors", 
                body: JSON.stringify({ text }), 
                headers: { 
                    'Content-Type': 'application/json', 
                }
            }); 

            comment.text = text; 

            let commentUpdate = comments; 
            commentUpdate.map(com => { 
                if(com._id?.toString() === comment._id?.toString()) {  
                    console.log(comment); 
                    return comment; 
                }

                return com; 
            }); 

            setComments(commentUpdate); 
            console.log(commentUpdate); 

            if(response.ok) { 
                return; 
            }
        } catch(err) { 
            console.log(err); 
        }
    }

  return (  
    <section className = 'bg-slate-100 my-4 py-2 mx-4 shadow-xl'>
        <>
            <CommentsForm 
                handleSubmit = { createComment }
                comment = { newComment }
                setComment =  { setNewComment }
            /> 

            { !noComments && comments.length == 0 && 
                <p> Loading </p>
            }

            { noComments && 
                <p> This post has no comments </p>
            }

            { !noComments && pathName == `/posts/${id}` && 
                <p> { comments.length} comments </p>
            }

            { !noComments && comments.length > 0 &&
                <>
                    {
                        comments.map((com) => { 
                            return ( 
                                <SingleComment 
                                    comment = { com } 
                                    deleteComment = { deleteComment }
                                    editComment = { editComment }
                                /> 
                            )
                        })
                    }
                </>
            }
        </>
    </section>
  )
}

export default CommentsSection