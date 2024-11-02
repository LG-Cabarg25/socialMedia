// services/postService.js
import api from './api';

export const getPosts = () => api.get('/posts');
export const createPost = (postData) => api.post('/posts', postData);
export const deletePost = (postId) => api.delete(`/posts/${postId}`);
