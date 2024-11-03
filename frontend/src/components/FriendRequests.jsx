// src/components/FriendRequests.jsx
import { useEffect, useState } from 'react';
import {
  acceptFriendRequest,
  getFriendRequests,
  deleteFriendRequest,
  getFriends
} from '../services/friendsService';

const FriendRequests = () => {
  const [requests, setRequests] = useState([]);
  const [friends, setFriends] = useState([]); 

  useEffect(() => {
    const loadRequests = async () => {
      const requestsData = await getFriendRequests();
      setRequests(requestsData);
    };

    const loadFriends = async () => {
      const friendsData = await getFriends();
      setFriends(friendsData);
    };

    loadRequests();
    loadFriends();
  }, []);

  const handleAcceptRequest = async (friendId) => {
    await acceptFriendRequest(friendId);
    const updatedRequests = await getFriendRequests();
    setRequests(updatedRequests);

    const updatedFriends = await getFriends();
    setFriends(updatedFriends);
  };

  const handleDeleteRequest = async (friendId) => {
    await deleteFriendRequest(friendId);
    const updatedRequests = await getFriendRequests();
    setRequests(updatedRequests);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Solicitudes de Amistad</h2>

      {requests.length > 0 ? (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li key={request.requesterId} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-sm">
              <span className="text-gray-700">Solicitud de: {request.username}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleAcceptRequest(request.requesterId)}
                  className="bg-green-500 text-white px-2 py-1 rounded-full hover:bg-green-600 transition"
                >
                  Aceptar
                </button>
                <button
                  onClick={() => handleDeleteRequest(request.requesterId)}
                  className="bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-600 transition"
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

      {/* Sección estilizada para la lista de amigos aceptados */}
      <h2 className="text-2xl font-semibold text-gray-800 mt-10 mb-6">Amigos</h2>
      {friends.length > 0 ? (
        <div className="grid grid-cols-3 gap-6">
          {friends.map((friend) => (
            <div key={friend.friendId} className="flex flex-col items-center space-y-2">
              {/* Avatar circular */}
              <div className="w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center overflow-hidden shadow-lg">
                <img
                  src={friend.avatarUrl || 'https://via.placeholder.com/100'} // Placeholder si no hay avatar
                  alt={friend.username}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Nombre del amigo */}
              <span className="text-gray-700 font-medium">{friend.username}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">Aún no tienes amigos.</p>
      )}
    </div>
  );
};

export default FriendRequests;
