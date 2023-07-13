import { Schema, models, model } from "mongoose";
import User from './user';

const listItemSchema = new Schema({ 
    text: { 
        type: string, 
        required: [ true, 'Text is required'], 
    }, 
    done: { 
        type: Boolean, 
        default: false,
    }
})

const ToDoSchema = new Schema({ 
    title: { 
        type: string,
        required: [ true, 'Title is required'], 
    }, 
    description: { 
        type: string, 
        required: [ true, 'Description is required'], 
    },
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'User' 
    }, 
    list: { 
        type: [ listItemSchema ], 
        required: true, 
    }
}); 

const Todo = models.Todo || model('Todo', ToDoSchema); 
export default Todo; 
