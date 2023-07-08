import NextAuth from "next-auth/next";
import { Schema, Document } from "mongoose";
import { Post } from "./Post";

declare module 'next-auth' { 
    interface User extends Document { 
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

    interface Session { 
        user: { 
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
    }
}