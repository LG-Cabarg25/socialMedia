// src/components/FriendRequestModal.jsx
import PropTypes from 'prop-types';
import { sendFriendRequest } from '../services/friendsService';

const FriendRequestModal = ({ user, onClose }) => {
  if (!user) return null; // Asegura que el modal no se muestre si `user` es indefinido

  const handleSendRequest = async () => {
    await sendFriendRequest(user.id);
    alert(`Solicitud de amistad enviada a ${user.username}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Enviar solicitud de amistad</h2>
        <p className="text-gray-700">
          ¿Deseas enviar una solicitud de amistad a <strong>{user.username}</strong>?
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={handleSendRequest}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Enviar solicitud
          </button>
        </div>
      </div>
    </div>
  );
};

FriendRequestModal.propTypes = {
  user: PropTypes.object, // `user` es opcional para evitar errores
  onClose: PropTypes.func.isRequired,
};

export default FriendRequestModal;