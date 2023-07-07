import Post from "@models/post";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (req, res) => { 
    const { title, text, userId, visibility } = await req.json(); 

    try { 
        await connectToDB(); 
        console.log("Connected in request.")
        const post = new Post({ 
            title: title, 
            text: text, 
            creator: userId, 
            visibility: visibility, 
        }); 

        await post.save();   
        await User.findByIdAndUpdate({ _id: userId }, { $push: {'activity.posts': post._id.toString()}}); 
        return new Response('Post created succesfully', { status: 200 }); 
    } catch (err) {
        console.log(err);  
        return new Response(`Something bad happened on the server side: ${err}`, { status: 500 }); 
    }
}