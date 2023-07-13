import { connectToDB } from "../../../../../../utils/database"; 
import Comment from "../../../../../../models/comment"; 
import User from "../../../../../../models/user"; 

export const GET = async (req, { params }) => { 
    try { 
        await connectToDB(); 
        const comments = await Comment.find({ post: params.id }).limit(2).populate('creator'); 
        console.log({ comments }); 
        const commentsCount = await Comment.countDocuments({ }); 

        return new Response(JSON.stringify({ comments, commentsCount }), { status: 200 }); 
    } catch (err) { 
        console.log('err'); 
        return new Response(`Cannot get the comments due to an error: ${err}`, { status: 500 }); 
    }
}