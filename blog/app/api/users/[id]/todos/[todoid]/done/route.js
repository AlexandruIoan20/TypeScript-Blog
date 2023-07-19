import { connectToDB } from '../../../../../../../utils/database'; 
import Todo from '../../../../../../../models/todo'

export const PATCH = async (req,  { params }) => { 
    try { 
        await connectToDB(); 
        const { itemIndex } = await req.json(); 

        const todo = await Todo.findOne( { _id: params.todoid }); 
        let list = todo.list; 

        for(let i = 0; i < list.length; i++) { 
            if(i === itemIndex) 
                list[i].done = !list[i].done; 
        }; 

        todo.list = list; 
        console.log("Marked"); 
        await todo.save(); 

        return new Response('Item updated successfully',  { status: 200 });
    } catch (err) { 
        console.log(err); 
        return new Response(err, { status: 500 }); 
    }
}