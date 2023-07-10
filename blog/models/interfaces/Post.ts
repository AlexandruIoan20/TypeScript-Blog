import { Schema, Document } from "mongoose";
import { User } from "./User";
import { Comment } from "./Comment";

export interface Post extends Document { 
    _id: Schema.Types.ObjectId | string,
    title: string, 
    text: string, 
    creator: User | Partial<User> | Schema.Types.ObjectId | string, 
    visibility: string, 
    interaction: { 
        likes: number, 
        likeUsers: Schema.Types.ObjectId [] | User [] | string [], 
        comments: Schema.Types.ObjectId [] | Comment [] | string [], 
    }
}; 

export const initialPost: Partial<Post> = { 
    _id: "", 
    title: "", 
    text: "", 
    creator: "", 
    visibility: "", 
    interaction: { 
        likes: 0, 
        likeUsers: [], 
        comments: [],
    }
}; 

