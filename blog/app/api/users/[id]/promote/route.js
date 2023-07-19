import { connectToDB } from '../../../../../utils/database'; 
import User from '../../../../../models/user'; 

export const PATCH = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const { grade } = await req.json(); 

        const user = await User.findOne( { _id: params.id }); 
        let grades = user.status; //get the current grades 

        grades.push(grade); //set the new grade; 
        user.status = grades; 

        await user.save () // update the database 
        return new Response('User updated succesfully', { status: 200 });   
    } catch(err) { 
        console.log(err); 
        return new Response(err, { status: 500 })
    }
}