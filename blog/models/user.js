import { Schema, models, model } from 'mongoose'; 
import Post from './post';

const UserSchema = new Schema({ 
    username: {
        type: String, 
        required: [ true, 'Username is required!'], 
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
        "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    }, 
    email: { 
        type: String, 
        required: [ true, 'Email is required!'],  
    }, 
    image: { 
        type: String, 
    },
    status: { 
        type: [String], 
        default: ['User'], 
    }, 
    activity: { 
        posts: {
            type: [Schema.Types.ObjectId], 
            ref: 'Post', 
        }, 
        todos: { 
            type: [Schema.Types.ObjectId], 
            ref: "Todo"
        }, 
        likesCount: { 
            type: Schema.Types.Number, 
            default: 0, 
        }, 
        commentsCount: { 
            type: Schema.Types.Number, 
            default: 0, 
        }
    }
}); 

const User = models.User || model('User', UserSchema); 
export default User; 