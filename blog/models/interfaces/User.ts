import { Schema, Document } from "mongoose";
import { Post } from "./Post";

interface ActivityInterface { 
    posts: Schema.Types.ObjectId [] | Post [] | Partial<Post> [], 
    likesCount: number, 
    commentsCount: number, 
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
    }
}