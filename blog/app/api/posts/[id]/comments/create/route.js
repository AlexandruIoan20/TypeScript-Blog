import { connectToDB } from '../../../../../../utils/database'; 
import Comment from '../../../../../../models/comment'; 

export const POST = async (req, { params }) => { 
    try { 
        await connectToDB(); 
        const { text, userid, postid } = await req.json(); 

        const newComment = new Comment({ 
            text: text, 
            creator: userid, 
            post: postid
        }); 

        await newComment.save ();
        console.log(newComment); 

        return new Response('Comment created', { status: 200 })  
    } catch (err) { 
        console.log(err); 
        return new Response(`Cannot create the comment due to an error: ${err}`, { status: 500 })
    }
}