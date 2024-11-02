import { useState } from 'react';
import { useUser } from '../context/UserContext';
import { FaCamera } from 'react-icons/fa';

const ProfilePhotoUploader = () => {
  const { user, updateProfilePhoto } = useUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
    setShowModal(true);
  };

  const handleConfirmUpload = async () => {
    if (selectedFile) {
      try {
        await updateProfilePhoto(selectedFile);
        setSelectedFile(null);
        setPreview(null);
        setShowModal(false);
      } catch (error) {
        console.error('Error al subir la foto:', error);
        alert("Hubo un error al subir la foto");
      }
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    setShowModal(false);
  };

  return (
    <div className="relative w-64 h-64">
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
        <div className="flex items-center justify-center w-full h-full text-gray-500 border border-gray-300 rounded-full bg-gray-50">
          No hay foto de perfil
        </div>
      )}

      <label
        htmlFor="fileUpload"
        className="cursor-pointer bg-white rounded-full p-2 shadow-md flex items-center justify-center text-gray-700 hover:bg-gray-100 absolute bottom-1 right-1 transform translate-x-1/2 translate-y-1/2"
        title="Editar foto"
      >
        <FaCamera className="w-4 h-4" />
      </label>

      <input
        id="fileUpload"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">¿Guardar cambios?</h2>
            <p className="text-gray-600 mb-6">¿Estás seguro de que deseas actualizar tu foto de perfil?</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleConfirmUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors"
              >
                Confirmar
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-400 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
