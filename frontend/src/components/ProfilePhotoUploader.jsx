// src/components/ProfilePhotoUploader.jsx
import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FaCamera } from 'react-icons/fa';

const ProfilePhotoUploader = () => {
  const { user, updateProfilePhoto } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file)); // Genera una URL temporal para mostrar la imagen seleccionada
  };

  const handleConfirmUpload = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      try {
        await updateProfilePhoto(selectedFile);
        setSelectedFile(null);
        setPreview(null);
        alert("Foto de perfil actualizada exitosamente");
      } catch (error) {
        console.error('Error al subir la foto:', error);
        alert("Hubo un error al subir la foto");
      }
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
  };

  return (
    <div className="relative w-32 h-32">
      {preview ? (
        <img
          src={preview}
          alt="Vista previa de la Foto"
          className="w-full h-full rounded-full object-cover border border-gray-300"
        />
      ) : user?.photoUrl ? (
        <img
          src={`http://localhost:3000/uploads/${user.photoUrl}`}
          alt="Foto de Perfil"
          className="w-full h-full rounded-full object-cover border border-gray-300"
        />
      ) : (
        <p className="text-gray-500">No hay foto de perfil</p>
      )}

      {!selectedFile && (
        <label
          htmlFor="fileUpload"
          className="cursor-pointer bg-white rounded-full p-2 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 absolute bottom-2 right-2"
          title="Editar foto"
        >
          <FaCamera className="w-4 h-4" />
        </label>
      )}
      
      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {selectedFile && (
        <div className="mt-4 space-x-2">
          <button
            onClick={handleConfirmUpload}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Confirmar Foto
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
