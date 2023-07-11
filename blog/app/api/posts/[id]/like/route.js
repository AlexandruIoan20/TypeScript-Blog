import { connectToDB } from '../../../../../utils/database'; 
import Post from '../../../../../models/post'; 


export const PATCH = async (req, { params }) => {
    try {
        const { userid, postid } = await req.json();
        await connectToDB();

        const post = await Post.findById(postid);

        const postUpdate = {
            ...post.toObject(),
            interaction: {
                ...post.interaction,
                likeUsers: post.interaction.likeUsers.includes(userid)
                    ? post.interaction.likeUsers.filter(user => user.toString() !== userid.toString())
                    : [...post.interaction.likeUsers, userid]
            },
            likes: post.interaction.likeUsers.includes(userid)
                ? post.interaction.likes + 5
                : post.interaction.likes - 1
        };

        console.log(postUpdate);

        await Post.findByIdAndUpdate(postid, { $set: postUpdate });
        return new Response(`Post liked: ${postUpdate.interaction}`, { status: 200 });

    } catch (err) {
        console.log(err);
        return new Response(`Cannot like the post due to this error: ${err}`, { status: 500 });
    }
};