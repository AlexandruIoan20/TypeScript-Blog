import User from '../../../../../models/user'; 
import Todo from '../../../../../models/todo'; 
import { connectToDB } from '../../../../../utils/database';

export const GET = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const userTodos = await User.find({ _id: params.id}, { 'activity.todos': 1}).populate('activity.todos'); 

        return new Response(JSON.stringify(userTodos), { status: 200 }); 
    } catch (err) { 
        console.log(err); 
        return new Response(`Cannot get the todos of the profile tue to an error, ${err}`, { status: 500 })
    }
}

export const DELETE = async(req, { params }) => { 
    try { 
        await connectToDB(); 
        const { deletedIndex } = await req.json(); 

        const user = await User.findOne({ _id: params.id }); //find the user
        const deletedTodoId = user.activity.todos[deletedIndex]; //find the id in users array 

        await Todo.findOneAndDelete({ _id: deletedTodoId }) //remove the list from the collection 

        let newTodos = []; 
        for(let i = 0; i < user.activity.todos.length; i++) { 
            if(i != deletedIndex) { 
                newTodos.push(user.activity.todos[i]); //remove the deleted list from the user array
            }
        }; 

        user.activity.todos = newTodos; //replace todo array
        await user.save(); //update database
        return new Response('Succesfully deleted', { status: 200 }); 
    } catch(err)  {
        console.log(err); 
        return new Response(`Cannot delete the to do list due to an error: ${err}`, { status: 500 })
    }
}