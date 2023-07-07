import { Schema, Document } from "mongoose";
import { Post } from "./Post";

export interface User extends Document { 
    username: string, 
    email: string, 
    image: string, 
    status: string [], 
    activity: { 
        posts: Schema.Types.ObjectId [] | Post [], 
        likesCount: number, 
        commentsCount: number, 
    }
}