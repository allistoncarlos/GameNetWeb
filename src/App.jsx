import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Card from './components/Card';
import StatCard from './components/StatCard';
import LoginPage from './components/LoginPage';
import DashboardData from './components/DashboardData';
import IOSDashboard from './components/IOSDashboard';
import { ThemeProvider } from './contexts/ThemeContext';
import { Users, ShoppingCart, DollarSign, Activity, LogOut } from 'lucide-react';
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

  // Se estiver autenticado, mostrar dashboard
  return (
    <ThemeProvider>
      <Layout title="Dashboard" subtitle="Visão Geral">
        {/* Botão de logout no header */}
        <div className="mb-4 flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              Bem-vindo, {user?.username || user?.name || 'Usuário'}!
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Você está logado no sistema
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </button>
        </div>

        {/* Dados da API Dashboard */}
        <div className="mb-6">
          <DashboardData />
        </div>

        {/* Estatísticas principais */}
        <div className="row row-deck row-cards mb-4">
          <div className="col-sm-6 col-lg-3">
            <StatCard
              title="Total de Usuários"
              value="2,986"
              change="+4%"
              changeType="positive"
              icon={Users}
              color="primary"
              subtitle="Últimos 7 dias"
            />
          </div>
          <div className="col-sm-6 col-lg-3">
            <StatCard
              title="Vendas"
              value="75%"
              change="+7%"
              changeType="positive"
              icon={ShoppingCart}
              color="success"
              subtitle="Taxa de conversão"
            />
          </div>
          <div className="col-sm-6 col-lg-3">
            <StatCard
              title="Receita"
              value="$4,300"
              change="+8%"
              changeType="positive"
              icon={DollarSign}
              color="warning"
              subtitle="Últimos 7 dias"
            />
          </div>
          <div className="col-sm-6 col-lg-3">
            <StatCard
              title="Novos Clientes"
              value="6,782"
              change="-1%"
              changeType="negative"
              icon={Activity}
              color="info"
              subtitle="Últimos 7 dias"
            />
          </div>
        </div>

        {/* Cards de conteúdo */}
        <div className="row row-deck row-cards">
          <div className="col-md-6 col-lg-4">
            <Card
              title="Modo Escuro Implementado"
              subtitle="Funcionalidade Completa"
              status="success"
              statusPosition="top"
            >
              <p>O modo escuro foi implementado com sucesso! Agora você pode alternar entre os temas claro e escuro.</p>
              <p className="text-muted text-sm mt-2">
                <strong>Funcionalidades:</strong> Toggle automático, persistência de preferência, detecção do sistema
              </p>
              <div className="mt-3">
                <span className="badge bg-success">✓ Modo Escuro Ativo</span>
              </div>
            </Card>
          </div>
          
          <div className="col-md-6 col-lg-4">
            <Card
              title="Recursos de Tema"
              ribbon="NOVO"
              ribbonColor="blue"
            >
              <ul className="list-unstyled">
                <li>🌙 Modo escuro completo</li>
                <li>☀️ Modo claro padrão</li>
                <li>🔄 Toggle no navbar</li>
                <li>💾 Persistência de preferência</li>
                <li>🖥️ Detecção automática do sistema</li>
              </ul>
            </Card>
          </div>
          
          <div className="col-md-6 col-lg-4">
            <Card
              title="Sistema Completo"
              footer={
                <div className="d-flex">
                  <button 
                    onClick={handleLogout}
                    className="btn btn-outline-primary"
                  >
                    Testar Logout
                  </button>
                </div>
              }
            >
              <p>Sistema completo com:</p>
              <ol>
                <li>✅ Login com API</li>
                <li>✅ Modo escuro/claro</li>
                <li>✅ Dashboard responsivo</li>
                <li>✅ Persistência de dados</li>
              </ol>
            </Card>
          </div>
          
          <div className="col-12">
            <Card
              title="Dashboard com Modo Escuro"
              subtitle="Experiência completa de usuário"
              active={true}
            >
              <div className="row">
                <div className="col-md-6">
                  <h4>Funcionalidades Implementadas</h4>
                  <p>Este dashboard agora possui modo escuro completo que:</p>
                  <ul>
                    <li>Alterna automaticamente entre temas</li>
                    <li>Salva a preferência do usuário</li>
                    <li>Detecta preferência do sistema</li>
                    <li>Aplica tema em todos os componentes</li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h4>Tecnologias Utilizadas</h4>
                  <div className="row g-2">
                    <div className="col-6">
                      <span className="badge bg-primary me-1">React Context</span>
                    </div>
                    <div className="col-6">
                      <span className="badge bg-success me-1">Tailwind Dark Mode</span>
                    </div>
                    <div className="col-6">
                      <span className="badge bg-info me-1">LocalStorage</span>
                    </div>
                    <div className="col-6">
                      <span className="badge bg-warning me-1">System Detection</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    </ThemeProvider>
  );
}

export default App;

