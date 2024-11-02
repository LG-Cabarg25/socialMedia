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
    throw error;
  }
};

// Función para obtener el perfil del usuario
export const getUserProfile = async () => {
  try {
    const response = await api.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error('Error al obtener el perfil del usuario:', error);
    throw error;
  }
};
