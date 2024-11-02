// src/pages/Dashboard.jsx
import { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { useAuth } from '../context/AuthContext';
import ProfilePage from './Profile';
import PostForm from '../components/PostForm.jsx';
import PostList from '../components/PostList.jsx';

const Dashboard = () => {
  const [currentSection, setCurrentSection] = useState('publicaciones');
  const { logout } = useAuth();

  // Función para renderizar la sección actual
  const renderSection = () => {
    switch (currentSection) {
      case 'amigos':
        return (
          <section className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800">Amigos</h2>
            <p className="mt-4 text-gray-600">
              Aquí puedes ver solicitudes de amistad y tu lista de amigos.
            </p>
          </section>
        );
      case 'perfil':
        return <ProfilePage />;
      case 'mensajes':
        return (
          <section className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800">Mensajes</h2>
            <p className="mt-4 text-gray-600">
              Aquí están tus conversaciones con amigos.
            </p>
          </section>
        );
      case 'publicaciones':
      default:
        return (
          <section className="p-8">
            <h2 className="text-3xl font-semibold text-gray-800">Publicaciones</h2>
            <PostForm /> {/* Formulario para crear publicaciones */}
            <PostList /> {/* Lista de publicaciones */}
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
