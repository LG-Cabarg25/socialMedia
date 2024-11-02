// src/pages/Dashboard.jsx
import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import ProfilePhotoUploader from '../components/ProfilePhotoUploader'; // Importa el componente de perfil

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState('publicaciones');

  const handleLogout = () => {
    console.log("Cerrar sesión");
  };

  const renderSection = () => {
    switch (currentSection) {
      case 'amigos':
        return (
          <section className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800">Amigos</h2>
            <p className="mt-4 text-gray-600">Aquí puedes ver solicitudes de amistad y tu lista de amigos.</p>
          </section>
        );
      case 'perfil':
        return (
          <section className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800">Perfil</h2>
            <p className="mt-4 text-gray-600">Aquí puedes actualizar tu foto de perfil y otra información personal.</p>
            <ProfilePhotoUploader /> {/* Muestra el componente de subida de foto */}
          </section>
        );
      case 'mensajes':
        return (
          <section className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800">Mensajes</h2>
            <p className="mt-4 text-gray-600">Aquí están tus conversaciones con amigos.</p>
          </section>
        );
      case 'publicaciones':
      default:
        return (
          <section className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800">Publicaciones</h2>
            <textarea
              placeholder="¿Qué estás pensando?"
              className="w-full h-24 p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
            ></textarea>
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
              Publicar
            </button>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-semibold text-blue-600">Título de la publicación</h3>
                <p className="mt-2 text-gray-700">
                  Aquí va una breve descripción de la publicación de un amigo.
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <button className="text-blue-500 hover:underline">Ver más</button>
                  <button className="text-gray-500 hover:text-blue-500">Me gusta</button>
                </div>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dashboard">
      <Navbar onSectionChange={setCurrentSection} onLogout={handleLogout} />
      
      <main className="max-w-6xl mx-auto p-8">
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;
