import { connectToDB } from "../../../../../../utils/database";
import Comment from "../../../../../../models/comment";
import User from "@/models/user";
import Post from "@/models/post";

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
        const { userid, postid } = await req.json(); 
        await connectToDB(); 

        await Comment.findOneAndDelete({ _id: params.commentid });

        const user = await User.findOne({ _id: userid }); 
        user.activity.commentsCount -= 1; 

        if(user.activity.commentsCount < 0) { 
            user.activity.commentsCount = 0; 
        }; 

        await user.save (); 

        const post = await Post.findOne({ _id: postid }); 

        let newCommentsArray = []; 
        post.interaction.comments.forEach(comment => { 
            if(comment._id.toString () != params.commentid.toString()) { 
                newCommentsArray.push(comment._id); 
            }
        }); 

        post.interaction.comments = newCommentsArray; 
        console.log({ newCommentsArray }); 
        await post.save(); 

        console.log({ user });
        return new Response('Comment deleted', { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(`Cannot delete the comment due to an error: ${err}`, { status: 500 }); 
    }
}