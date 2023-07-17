import { Schema, models, model } from "mongoose";
import User from './user';

const listItemSchema = new Schema({ 
    text: { 
        type: String, 
        required: [ true, 'Text is required'], 
    }, 
    done: { 
        type: Boolean, 
        default: false,
    }
})

const ToDoSchema = new Schema({ 
    title: { 
        type: String,
        required: [ true, 'Title is required'], 
    }, 
    description: { 
        type: String, 
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
