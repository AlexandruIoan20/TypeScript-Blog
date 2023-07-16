import { Schema, Document } from "mongoose";
import { Post } from "./Post";
import { Todo } from '../interfaces/Todo'; 

interface ActivityInterface { 
    posts: Schema.Types.ObjectId [] | Post [] | Partial<Post> [], 
    likesCount: number, 
    commentsCount: number, 
    todos: Partial <Todo> [] | string
}

export interface User extends Document { 
    _id: Schema.Types.ObjectId | string, 
    username: string, 
    email: string, 
    image: string, 
    status: string [], 
    activity: ActivityInterface
}

export const initialUser: Partial<User> = { 
    _id: "", 
    username: "", 
    email: "", 
    image: "", 
    status: [], 
    activity: { 
        posts: [], 
        likesCount: 0, 
        commentsCount: 0, 
        todos: [],
    }
}