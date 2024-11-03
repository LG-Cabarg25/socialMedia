// src/services/friendsService.js
import api from './api'; // Asegúrate de tener tu configuración base de axios en este archivo

// Enviar solicitud de amistad
export const sendFriendRequest = async (friendId) => {
  const response = await api.post('/friends/request', { friendId });
  return response.data;
};

// Aceptar solicitud de amistad
export const acceptFriendRequest = async (friendId) => {
  const response = await api.put(`/friends/accept/${friendId}`);
  return response.data;
};

// Obtener solicitudes de amistad pendientes
export const getFriendRequests = async () => {
  const response = await api.get('/friends/requests');
  return response.data;
};

// Eliminar una solicitud o amistad específica
export const deleteFriendRequest = async (friendId) => {
  const response = await api.delete(`/friends/${friendId}`);
  return response.data;
};

export const getFriends = async () => {
  try {
    const response = await api.get('/friends'); // Realiza una solicitud GET al endpoint de amigos aceptados
    return response.data; // Devuelve los datos de amigos aceptados
  } catch (error) {
    console.error('Error al obtener amigos:', error);
    return [];
  }
};