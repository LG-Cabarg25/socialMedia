// src/components/FriendRequests.jsx
import { useEffect, useState } from 'react';
import {
  acceptFriendRequest,
  getFriendRequests,
  deleteFriendRequest,
} from '../services/friendsService';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);


  useEffect(() => {
    const loadRequests = async () => {
      const requestsData = await getFriendRequests();
      setRequests(requestsData);
    };
    loadRequests();
  }, []);



  const handleAcceptRequest = async (friendId) => {
    await acceptFriendRequest(friendId);
    const updatedRequests = await getFriendRequests();
    setRequests(updatedRequests);
  };

  const handleDeleteRequest = async (friendId) => {
    await deleteFriendRequest(friendId);
    const updatedRequests = await getFriendRequests();
    setRequests(updatedRequests);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Solicitudes de Amistad</h2>


      {requests.length > 0 ? (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li key={request.requesterId} className="flex justify-between items-center bg-gray-100 p-2 rounded-lg">
              <span className="text-gray-700">Solicitud de: {request.username}</span> {/* Muestra el nombre */}
              <div className="space-x-2">
                <button
                  onClick={() => handleAcceptRequest(request.requesterId)}
                  className="bg-green-500 text-white px-2 py-1 rounded-md"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => handleDeleteRequest(request.requesterId)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md"
                >
                  Rechazar
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No tienes solicitudes de amistad pendientes.</p>
      )}
    </div>
  );
};

export default FriendRequests;
