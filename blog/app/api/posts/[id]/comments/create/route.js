import { connectToDB } from '../../../../../../utils/database'; 
import Comment from '../../../../../../models/comment'; 
import Post from '../../../../../../models/post'; 

export const POST = async (req, { params }) => { 
    try { 
        await connectToDB(); 
        const { text, userid, postid } = await req.json(); 

        const newComment = new Comment({ 
            text: text, 
            creator: userid, 
            post: postid
        }); 

        const post = await Post.findById(postid); 
        let newCommentsArray = post.interaction.comments; 
        newCommentsArray.push(newComment); 

        await newComment.save ();

        await Post.findOneAndUpdate({ _id: postid }, { '$set': { 
            'interaction.comments': newCommentsArray
        }})

        return new Response('Comment created', { status: 200 })  
    } catch (err) { 
        console.log(err); 
        return new Response(`Cannot create the comment due to an error: ${err}`, { status: 500 })
    }
}