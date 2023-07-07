import { Schema, Document } from "mongoose";
import { Post } from './Post'; 
import { User } from "./User";

export interface Comment extends Document { 
    text: string, 
    creator: Schema.Types.ObjectId | User, 
    post: Schema.Types.ObjectId | Post, 
}; 