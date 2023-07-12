import { connectToDB } from "../../../../../../utils/database"; 
import Comment from "../../../../../../models/comment"; 
import User from "../../../../../../models/user"; 

export const GET = async (req, { params }) => { 
    try { 
        await connectToDB(); 
        const comments = await Comment.find({ post: params.id }).limit(2).populate('creator'); 
        const commentsCount = await Comment.countDocuments({ }); 
        console.log(comments[0].creator); 

        return new Response(JSON.stringify({ comments, commentsCount }), { status: 200 }); 
    } catch (err) { 
        console.log('err'); 
        return new Response(`Cannot get the comments due to an error: ${err}`, { status: 500 }); 
    }
}