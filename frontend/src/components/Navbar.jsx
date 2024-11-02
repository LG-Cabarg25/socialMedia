// src/components/Navbar.jsx
import { FaHome, FaUserFriends, FaUser, FaEnvelope, FaSignOutAlt } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Navbar = ({ onSectionChange, onLogout }) => {
  return (
    <nav className="bg-blue-600 p-4 shadow-md flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Amixter</h1>
      <div className="flex space-x-6">
        <button onClick={() => onSectionChange('publicaciones')} className="flex items-center space-x-1 text-white hover:text-blue-300">
          <FaHome />
          <span>Inicio</span>
        </button>
        <button onClick={() => onSectionChange('amigos')} className="flex items-center space-x-1 text-white hover:text-blue-300">
          <FaUserFriends />
          <span>Amigos</span>
        </button>
        <button onClick={() => onSectionChange('perfil')} className="flex items-center space-x-1 text-white hover:text-blue-300">
          <FaUser />
          <span>Perfil</span>
        </button>
        <button onClick={() => onSectionChange('mensajes')} className="flex items-center space-x-1 text-white hover:text-blue-300">
          <FaEnvelope />
          <span>Mensajes</span>
        </button>
        <button onClick={onLogout} className="flex items-center space-x-1 text-white hover:text-red-500">
          <FaSignOutAlt />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </nav>
  );
};

// Definición de las propiedades con PropTypes
Navbar.propTypes = {
  onSectionChange: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Navbar;
