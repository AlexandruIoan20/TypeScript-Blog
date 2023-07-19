import { Schema, Document } from 'mongoose'; 
import { User } from "../interfaces/User"; 

export interface listItemInterface { 
    text: string, 
    done: boolean 
}; 

export interface Todo extends Document { 
    _id: Schema.Types.ObjectId | string, 
    title: string, 
    description: string, 
    creator: Schema.Types.ObjectId | Partial<User> | string , 
    list: listItemInterface []
}; 

export const initialTodo: Partial<Todo>  = {
    _id: "", 
    title: "", 
    description: "",
    creator: "", 
    list: []
}