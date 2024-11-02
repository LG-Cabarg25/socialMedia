// src/context/PostContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { fetchPosts, createTextPost, createImagePost } from '../services/postService';

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostsProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      const postsData = await fetchPosts();
      setPosts(postsData);
    };
    fetchAllPosts();
  }, []);

  const addTextPost = async (content) => {
    const newPost = await createTextPost(content);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  // Define addImagePost para manejar publicaciones con imagen
  const addImagePost = async (content, imageFile) => {
    const newPost = await createImagePost(content, imageFile);
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <PostContext.Provider value={{ posts, addTextPost, addImagePost }}>
      {children}
    </PostContext.Provider>
  );
};

PostsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PostsProvider;
