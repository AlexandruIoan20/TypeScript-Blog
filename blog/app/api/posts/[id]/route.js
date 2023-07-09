import { connectToDB } from '../../../../utils/database';
import Post from '../../../../models/post'
import User from '../../../../models/user'

export const DELETE = async(req, { params }) => { 
    try { 
        console.log(params); 
        await connectToDB(); 
        const updatedUser = await User.findOneAndUpdate({ 'activity.posts': { $in: [params.id]}}, { $pull: { 'activity.posts': params.id }}); 
        console.log(updatedUser); 

        await Post.findOneAndDelete({ _id: params.id }); 
        console.log('Deleted'); 
        return new Response("Post deleted succesfully from creator profile and feed", { status: 200 }); 
    } catch (err) { 
        console.log(err); 
        return new Response(`Can't delete the post due to this error: ${err}`, { status: 500 })
    }
}

export const GET = async(req, { params }) => { 
    try { 
        await connectToDB(); 

        const post = await Post.findById(params.id); 
        console.log(post); 
        return new Response(JSON.stringify(post), { status: 200 }); 
    } catch(err) { 
        console.log('jJHello'); 
        console.log(err); 
        return new Response('Cannot find the post', { status: 404 }); 
    }
}

export const PATCH = async (req, { params }) => { 
    const { title, visibility, text } = await req.json(); 
    console.log({ title, visibility, text }); 

    console.log(params.id); 

    try { 
        await connectToDB(); 

        const post = await Post.findById(params.id); 
        if(!post) { 
            return new Response('Cannot find the post', { status: 404}); 
        }

        post.title = title; 
        post.visibility = visibility; 
        post.text = text; 

        await post.save (); 
        console.log(post); 
        return new Response(`Post saved: ${post}`, { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response('Cannot update the post due to an error', { status: 500 }); 
    }
}