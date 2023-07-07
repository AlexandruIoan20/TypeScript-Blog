import { Schema, models, model } from "mongoose";
import User from "./user";
import Comment from "./comment";

const PostSchema = new Schema({ 
    title: { 
        type: String, 
        required: [true, 'Title is required!'], 
    }, 
    text: { 
        type: String, 
        required: [true, 'String is required'], 
    }, 
    creator: { 
        type: Schema.Types.ObjectId, 
        ref: "User", 
    }, 
    visibility: { 
        type: String, 
        required: [ true, 'Visibility is required!'], 
    },
    interaction: { 
        likes: { 
            type: Schema.Types.Number, 
            default: 0, 
        }, 
        likeUsers: { 
            type: [Schema.Types.ObjectId], 
            ref: 'User'
        }, 
        comments: { 
            type: [Schema.Types.ObjectId], 
            ref: "Comment", 
        }
    }
}); 

const Post = models.Post || model('Post', PostSchema); 
export default Post;