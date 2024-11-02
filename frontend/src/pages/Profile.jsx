// src/pages/ProfilePage.jsx
import { useUser } from '../context/UserContext';
import ProfilePhotoUploader from '../components/ProfilePhotoUploader';

const ProfilePage = () => {
  const { user } = useUser();

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Información del Perfil</h1>
      {user && (
        <div className="flex items-center space-x-6 mb-8">
          <ProfilePhotoUploader />
          <div className="text-left">
            <h2 className="text-2xl font-semibold text-gray-700">{user.username}</h2>
            <p className="text-gray-500">Email: {user.email}</p>
          </div>
        </div>
      )}

      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Publicaciones</h3>
        <div className="border border-gray-300 p-4 rounded-lg bg-gray-100 text-gray-500">
          <p>Aún no tienes publicaciones. ¡Comparte algo para que aparezca aquí!</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
