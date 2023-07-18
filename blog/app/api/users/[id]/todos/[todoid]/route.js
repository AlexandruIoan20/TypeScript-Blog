import { connectToDB } from '../../../../../../utils/database'; 
import Todo from '../../../../../../models/todo'; 

export const GET = async (req, { params }) => { 
    try { 
        await connectToDB(); 

        const todo = await Todo.findOne({ _id: params.todoid }); 
        console.log({ todo }); 

        if(todo === null || todo === undefined) { 
            return new Response(`Cannot find the todo`, { status: 404 }); 
        }

        return new Response(JSON.stringify(todo), { status: 200 }); 
    } catch(err)  {
        console.log(err); 
        return new Response(`Cannot get the todo due to an error: ${err}`, { status: 500 })
    }
}

export const PATCH = async (req, { params }) => { 
    try {
        await connectToDB(); 
        const { title, description, list, userid } = await req.json(); 

        let todo = await Todo.findOne({ _id: params.todoid }); 
        todo.title = title; 
        todo.description = description;
        todo.list = list; 

        await todo.save (); 

        return new Response(`Todo saved`, { status: 200 }); 
    } catch(err) { 
        console.log(err); 
        return new Response(err,  { status: 500 })
    }
}