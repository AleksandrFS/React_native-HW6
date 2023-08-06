import { createSlice } from "@reduxjs/toolkit";
import { posts } from "../../src/Data/postsData";

const initialState = {
  postsData: posts,
  postId: null,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    updatePosts(state, { payload }) {
      state.postsData = payload;
    },
    writePostsId(state, { payload }) {
      state.postId = payload;
    },
    addPost(state, { payload }) {
      state.postsData = [...state.postsData, payload];
    },
    addComment(state, { payload: { postId, newComment } }) {
      state.postsData = state.postsData.map((post) =>
        post.id !== postId
          ? post
          : { ...post, comments: [...post.comments, newComment] }
      );
    },
  },
});

export const { updatePosts, writePostsId, addPost, addComment } =
  postsSlice.actions;
export const postsReducer = postsSlice.reducer;
