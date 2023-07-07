import User from "@models/user";
import { connectToDB } from "@utils/database";

export const GET = async(request, { params }) => { 
    try { 
        console.log("Getting the user"); 
        await connectToDB(); 
        const id = params.id; 
        console.log(id)
        console.log("Getting the user traala"); 

        const user = await User.findOne({ _id: id }).populate(`activity.posts`).exec();
        console.log(user); 

        if(!user) { 
            return new Response("User not found", { status: 404}); 
        }
    
        return new Response(JSON.stringify(user), { status: 200})
    } catch (err) { 
        console.log(err); 
        return new Response(`Something went wrong on this page: ${err}`, { status: 500 }); 
    }
}; 