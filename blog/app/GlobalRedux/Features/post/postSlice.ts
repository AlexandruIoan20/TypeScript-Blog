'use client'; 

import { createSlice } from "@reduxjs/toolkit";
import { Post as PostInterface } from "@/models/interfaces/Post";

const initialState: Partial<PostInterface> [] = []; 

const postsSlice = createSlice({ 
    name: "posts", 
    initialState, 
    reducers: { 
        addPost: (state, action) => { 
            state.push(action.payload); 
        }
    }  
}); 

export const { addPost } = postsSlice.actions; 
export default postsSlice.reducer;
