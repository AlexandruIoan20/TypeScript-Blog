import { connectToDB } from "../../../../../../utils/database";
import Comment from "../../../../../../models/comment";

export const PATCH = async (req, { params }) => { 
    try { 
        const { text } = await req.json(); 
        await connectToDB(); 

        await Comment.findOneAndUpdate( { _id: params.commentid }, { '$set': { text: text }}) ; 
        return new Response('Comment updated', { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(`Cannot update the comment due to an error: ${err}`, { status: 500 }); 
    }
}; 

export const DELETE = async (req,  { params }) => { 
    try { 
        await connectToDB(); 

        await Comment.findOneAndDelete({ _id: params.commentid });
        return new Response('Comment deleted', { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(`Cannot delete the comment due to an error: ${err}`, { status: 500 }); 
    }
}