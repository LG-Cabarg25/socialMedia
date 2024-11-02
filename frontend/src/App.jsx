// App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './context/AuthProvider'; // Asegúrate de que este sea el import correcto
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
