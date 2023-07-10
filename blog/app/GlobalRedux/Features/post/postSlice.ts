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
        },
        getFeedData: (state, action) => { 
            return action.payload
        }, 
        deletePost: (state, action) => { 
            state.filter(post => post._id?.toString() != action.payload); 
            console.log('Globally deleted'); 
            console.log(state); 
        }
    }  
}); 

export const { addPost, getFeedData, deletePost } = postsSlice.actions; 
export default postsSlice.reducer;
