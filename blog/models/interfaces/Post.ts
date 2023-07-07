import { Schema, Document } from "mongoose";
import { User } from "./User";
import { Comment } from "./Comment";

export interface Post extends Document { 
    title: string, 
    text: string, 
    creator: Schema.Types.ObjectId | User | string, 
    visibility: String, 
    interaction: { 
        likes: number, 
        likeUsers: Schema.Types.ObjectId [] | User [] | string [], 
        comments: Schema.Types.ObjectId [] | Comment [] | string [], 
    }
}