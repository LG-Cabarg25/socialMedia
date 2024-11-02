import api from './api';

// Obtener todas las publicaciones
export const fetchPosts = async () => {
  const response = await api.get('/posts');
  return response.data;
};

// Crear una publicación de texto
export const createTextPost = async (content) => {
  const response = await api.post('/posts/text', { content });
  return response.data;
};

// Crear una publicación con imagen
export const createImagePost = async (content, file) => {
  const formData = new FormData();
  formData.append('content', content);
  formData.append('image', file);

  const response = await api.post('/posts/image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

// Dar "me gusta" a una publicación
export const likePost = async (id) => {
  const response = await api.post(`/posts/${id}/like`);
  return response.data;
};

// Eliminar una publicación
export const deletePost = async (postId) => {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
};
