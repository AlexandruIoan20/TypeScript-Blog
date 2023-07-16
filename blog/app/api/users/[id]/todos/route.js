import User from '../../../../../models/user'; 
import { connectToDB } from '../../../../../utils/database';

export const GET = async(req, res) => { 
    try { 
        await connectToDB(); 
        
    } catch (err) { 
        console.log(err); 
        return new Response(`Cannot get the todos of the profile tue to an error, ${err}`, { status: 500 })
    }
}