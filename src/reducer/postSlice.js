import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchPosts, timelinePost } from "./postApi";

const initialState = {
    posts: [],
    status: "idle",
    error: null, // Added error property to initial state
};

export const fetchPostAsync = createAsyncThunk("post/fetchPost", async () => {
    const res = await fetchPosts();
    return res.data;
});
export const fetchTimeLinePostAsync = createAsyncThunk("post/fetchTimelinePost", async () => {
    const res = await timelinePost()
    return res.data;
});

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPostAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPostAsync.fulfilled, (state, action) => {
                state.status = "success";
                state.posts = action.payload;
            })
            .addCase(fetchTimeLinePostAsync.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchTimeLinePostAsync.fulfilled, (state, action) => {
                state.status = "success";
                state.posts = action.payload;
            })
            .addCase(fetchPostAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchTimeLinePostAsync.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
    },
});

export default postSlice.reducer;
