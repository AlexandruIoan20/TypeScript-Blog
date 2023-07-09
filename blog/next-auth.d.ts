import NextAuth from "next-auth/next";
import { Schema, Document } from "mongoose";
import { Post } from "./Post";
import { DefaultSession } from "next-auth";

declare module 'next-auth' { 
    interface User extends Document { 
        id: string | Schema.Types.ObjectId,
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

    interface Session extends DefaultSession { 
        user?: User
    }
}