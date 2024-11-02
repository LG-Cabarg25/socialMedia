// src/services/userService.js (o donde prefieras definir tus servicios)
import api from './api'; // Importa la instancia de API configurada con el token

export const uploadProfilePhoto = async (file) => {
  const formData = new FormData();
  formData.append('photo', file); // 'photo' es el nombre esperado en el backend

  try {
    const response = await api.post('/user-photos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // Especifica el tipo de contenido para archivos
      },
    });
    return response.data; // Devuelve la respuesta del backend
  } catch (error) {
    console.error('Error al subir la foto:', error);
    throw error;
  }
};
