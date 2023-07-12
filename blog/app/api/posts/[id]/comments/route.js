import { connectToDB } from "@/utils/database";
import Comment from "@/models/comment";

export const GET = async (req,  { params }) => { 
    try { 
        await connectToDB(); 

        const comments = await Comment.find({ post: params.id }).populate('creator').exec(); 

        return new Response(JSON.stringify(comments),  {status: 200 }); 
    } catch  (err) { 
        console.log(err); 
        return new Response(`Cannot get the comments due to an error: ${err}`, { status: 500 })
    }
}