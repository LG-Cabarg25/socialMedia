// src/context/AuthProvider.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { AuthContext } from './AuthContext';
import { login as loginService, register as registerService } from '../services/authService';
import { uploadProfilePhoto } from '../services/userService'; // Asegúrate de tener la función en userService
import api from '../services/api';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para configurar el token y el encabezado de autorización
  const setAuthToken = (token) => {
    if (token) {
      console.log("Estableciendo token en localStorage y en el encabezado:", token);
      localStorage.setItem('authToken', token);
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.log("Eliminando token de localStorage y del encabezado");
      localStorage.removeItem('authToken');
      delete api.defaults.headers.common['Authorization'];
    }
  };

  // Carga inicial del token y verificación de autenticación
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    console.log("Token cargado desde localStorage:", token);
    if (token) {
      setAuthToken(token); // Configurar encabezado de autorización
      api.get('/users/profile')
        .then((response) => {
          console.log("Perfil de usuario obtenido exitosamente:", response.data);
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch((error) => {
          console.error("Error al obtener el perfil de usuario, cerrando sesión:", error);
          logout(); // Si el token es inválido, cierra sesión
        })
        .finally(() => {
          setLoading(false);
          console.log("Carga inicial completada, loading:", loading);
        });
    } else {
      console.log("No se encontró token en localStorage");
      setLoading(false); // Si no hay token, se finaliza la carga
    }
  }, []); // Solo se ejecuta una vez al montar el componente

  // Función para iniciar sesión
  const login = async (email, password) => {
    try {
      const data = await loginService(email, password);
      const token = data.token;
      console.log("Inicio de sesión exitoso, token recibido:", token);
      setAuthToken(token); // Guardar y configurar el token
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  // Función para registrar un nuevo usuario
  const register = async (username, email, password) => {
    const data = await registerService(username, email, password);
    return data;
  };

  // Función para cerrar sesión
  const logout = () => {
    console.log("Ejecutando logout, limpiando token y estado de usuario");
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Función para subir la foto de perfil
  const uploadPhoto = async (file) => {
    try {
      const data = await uploadProfilePhoto(file); // Llama a la función para subir el archivo
      setUser((prevUser) => ({
        ...prevUser,
        photoUrl: data.photoUrl, // Supón que `photoUrl` es la URL de la imagen devuelta por el backend
      }));
      console.log("Foto de perfil actualizada:", data.photoUrl);
    } catch (error) {
      console.error("Error al subir la foto de perfil:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        loading,
        uploadPhoto, // Exponer la función para subir foto
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
