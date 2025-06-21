import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';

// Componentes
import LoginPage from './components/LoginPage';
import NavigationMenu from './components/NavigationMenu';

// Páginas
import DashboardPage from './pages/DashboardPage';
import GamesPage from './pages/GamesPage';
import PlatformPage from './pages/PlatformPage';
import ListsPage from './pages/ListsPage';

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

  // Layout principal com roteamento - APENAS UM MENU
  return (
    <ThemeProvider>
      <Router>
        <div className="page">
          {/* Menu de navegação único - inclui header e navegação */}
          <NavigationMenu />
          
          {/* Conteúdo das páginas */}
          <div className="page-wrapper">
            <Routes>
              {/* Rota padrão redireciona para dashboard */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Rotas das páginas */}
              <Route 
                path="/dashboard" 
                element={<DashboardPage user={user} />} 
              />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/platform" element={<PlatformPage />} />
              <Route path="/lists" element={<ListsPage />} />
              
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
                      <a href="#" className="link-secondary">Documentation</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="link-secondary">License</a>
                    </li>
                    <li className="list-inline-item">
                      <a href="#" className="link-secondary">Source Code</a>
                    </li>
                  </ul>
                </div>
                <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                  <ul className="list-inline list-inline-dots mb-0">
                    <li className="list-inline-item">
                      Copyright © 2024
                      <a href="#" className="link-secondary">GameNet Platform</a>.
                      All rights reserved.
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

