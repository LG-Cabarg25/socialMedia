// src/components/ProfilePhotoUploader.jsx
import { useState } from 'react';
import { useUser } from '../context/UserContext';

const ProfilePhotoUploader = () => {
  const { user, updateProfilePhoto } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      try {
        await updateProfilePhoto(selectedFile);
        setSelectedFile(null);
      } catch (error) {
        console.error('Error al subir la foto:', error);
      }
    }
  };

  return (
    <div className="relative inline-block mr-6">
      {user?.photoUrl ? (
        <img
          src={`http://localhost:3000/uploads/${user.photoUrl}`}
          alt="Foto de Perfil"
          className="w-32 h-32 rounded-full object-cover"
        />
      ) : (
        <p className="text-gray-500">No hay foto de perfil</p>
      )}
      <form onSubmit={handleSubmit} className="mt-2 text-center">
        <label
          htmlFor="fileUpload"
          className="cursor-pointer text-blue-600 underline text-sm absolute bottom-2 right-2 bg-white px-2 py-1 rounded-md shadow-md"
        >
          Actualizar Foto
        </label>
        <input
          id="fileUpload"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
      </form>
    </div>
  );
};

export default ProfilePhotoUploader;
