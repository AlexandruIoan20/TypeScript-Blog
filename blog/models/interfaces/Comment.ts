import { Schema, Document } from "mongoose";
import { Post } from './Post'; 
import { User } from "./User";

export interface Comment extends Document { 
    _id: Schema.Types.ObjectId | string, 
    text: string, 
    creator: Schema.Types.ObjectId | User | string, 
    post: Schema.Types.ObjectId | Post | string, 
};  

export const initialComment: Partial<Comment> = { 
    _id: "", 
    text: "", 
    creator: "", 
    post: ""
}

