'use client'; 

import { createSlice } from "@reduxjs/toolkit";
import { Post as PostInterface } from "@/models/interfaces/Post";

const initialState: Partial<PostInterface> = { 
    title: "", 
    text: "", 
    creator: "", 
    visibility: "", 
    interaction: { 
        likes: 0, 
        likeUsers: [], 
        comments: [], 
    }
}

export const postSlice = createSlice({ 
    name: "post", 
    initialState, 
    reducers: { 
        likePost: (state, action) => { if(state.interaction != undefined) 
            state.interaction.likes += 1},
        leaveComment: (state, action) => { 
            if(state.interaction != undefined) 
                state.interaction.likes -= 1; 
        }
    }
})

export const { likePost, leaveComment } = postSlice.actions; 
export default postSlice.reducer; 