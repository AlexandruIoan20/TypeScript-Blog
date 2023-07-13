import { Schema, models, model } from "mongoose";

import Post from "./post";
import User from "./user";

const CommentSchema = new Schema({ 
    text: { 
        type: String, 
        required: [ true, 'Text is required!' ], 
    }, 
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: [ true, 'Creator is required!'], 
    }, 
    post: { 
        type: Schema.Types.ObjectId, 
        ref: 'Post', 
        required: [ true, 'Post is required'],  
    }
}); 

const Comment = models.Comment || model('Comment', CommentSchema); 
export default Comment; 