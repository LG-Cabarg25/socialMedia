// src/components/ProfilePhotoUploader.jsx
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const ProfilePhotoUploader = () => {
  const { user, uploadPhoto } = useAuth();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      await uploadPhoto(selectedFile); // Llama a la función para subir la foto
      setSelectedFile(null); // Resetea el archivo seleccionado
    }
  };

  return (
    <div>
      <h2>Subir Foto de Perfil</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Subir Foto</button>
      </form>
      {user?.photoUrl && (
        <div>
          <h3>Foto Actual:</h3>
          <img src={user.photoUrl} alt="Foto de Perfil" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoUploader;
