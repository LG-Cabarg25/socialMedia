// src/pages/ProfilePage.jsx
import ProfilePhotoUploader from '../components/ProfilePhotoUploader';

const ProfilePage = () => {
  return (
    <div>
      <h1>Perfil</h1>
      <ProfilePhotoUploader /> {/* Componente para subir la foto de perfil */}
      {/* Otros elementos del perfil */}
    </div>
  );
};

export default ProfilePage;
