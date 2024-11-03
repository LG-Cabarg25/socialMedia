// src/services/userService.js
import api from './api';

// Función para subir la foto de perfil
export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append('photo', file);

  try {
    const response = await api.post('/user-photos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al subir la foto:', error);
    throw error; // Lanza el error para que el contexto pueda manejarlo
  }
};

// Función para obtener el perfil del usuario
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile'); // Asegúrate de no usar `userId`
    return response.data;
  } catch (error) {
    console.error('Error obteniendo el perfil del usuario:', error);
    throw error;
  }
};

export const searchUsers = async (query) => {
  try {
    const response = await api.get(`/users/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error buscando usuarios:', error);
    return [];
  }
};


export const sendFriendRequest = async (friendId) => {
  try {
    await api.post('/friends/request', { friendId });
  } catch (error) {
    console.error('Error enviando solicitud de amistad:', error);
  }
};