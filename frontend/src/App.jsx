// src/App.js
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import AuthProvider from './context/AuthProvider';
import { UserProvider } from './context/UserContext'; // Importa el contexto de usuario

function App() {
  return (
    <AuthProvider>
      <UserProvider> {/* Envuelve la aplicación con UserProvider */}
        <Router>
          <AppRoutes />
        </Router>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
