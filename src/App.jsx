import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { LogOut } from 'lucide-react';

// Componentes
import LoginPage from './components/LoginPage';
import NavigationMenu from './components/NavigationMenu';
import Navbar from './components/Navbar';

// Páginas
import DashboardPage from './pages/DashboardPage';
import GamesPage from './pages/GamesPage';
import PlataformaPage from './pages/PlataformaPage';
import ListasPage from './pages/ListasPage';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar se usuário está logado ao carregar a aplicação
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (data) => {
    setIsAuthenticated(true);
    setUser(data.user || { username: data.username || 'Usuário' });
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    setUser(null);
  };

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <ThemeProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </ThemeProvider>
    );
  }

  // Se não estiver autenticado, mostrar página de login
  if (!isAuthenticated) {
    return (
      <ThemeProvider>
        <LoginPage onLoginSuccess={handleLoginSuccess} />
      </ThemeProvider>
    );
  }

  // Layout principal com roteamento
  return (
    <ThemeProvider>
      <Router>
        <div className="page">
          {/* Navbar principal */}
          <Navbar onMenuClick={() => {}} />
          
          {/* Menu de navegação */}
          <NavigationMenu />
          
          {/* Botão de logout fixo */}
          <div className="position-fixed top-0 end-0 m-3" style={{ zIndex: 1050 }}>
            <button
              onClick={handleLogout}
              className="btn btn-outline-danger btn-sm d-flex align-items-center"
              title="Sair do sistema"
            >
              <LogOut size={16} className="me-2" />
              Sair
            </button>
          </div>
          
          {/* Conteúdo das páginas */}
          <div className="page-wrapper">
            <Routes>
              {/* Rota padrão redireciona para dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Rotas das páginas */}
              <Route 
                path="/dashboard" 
                element={<DashboardPage user={user} onLogout={handleLogout} />} 
              />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/plataforma" element={<PlataformaPage />} />
              <Route path="/listas" element={<ListasPage />} />
              
              {/* Rota catch-all para páginas não encontradas */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </div>
          
          {/* Footer */}
          <footer className="footer footer-transparent d-print-none">
            <div className="container-xl">
              <div className="row text-center align-items-center flex-row-reverse">
                <div className="col-lg-auto ms-lg-auto">
                  <ul className="list-inline list-inline-dots mb-0">
                    <li className="list-inline-item">
                      <a href="#" className="link-secondary">Documentação</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="link-secondary">Licença</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="link-secondary">Código Fonte</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                  <ul className="list-inline list-inline-dots mb-0">
                    <li className="list-inline-item">
                      Copyright © 2024
                      <a href="#" className="link-secondary">GameNet Platform</a>.
                      Todos os direitos reservados.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

