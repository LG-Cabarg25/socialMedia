// src/pages/Dashboard.jsx
import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext'; // Importa el hook de autenticación
import ProfilePage from './Profile.jsx';

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState('publicaciones');
  const { logout } = useAuth();

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
        return <ProfilePage />; // Reemplaza por el componente completo de ProfilePage
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
          </section>
        );
    }
  };

  return (
    <div className="min-h-screen bg-dashboard">
      <Navbar onSectionChange={setCurrentSection} onLogout={logout} />
      <main className="max-w-6xl mx-auto p-8">
        {renderSection()}
      </main>
    </div>
  );
};

export default Dashboard;
