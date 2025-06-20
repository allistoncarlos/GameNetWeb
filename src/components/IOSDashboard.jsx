import React, { useState, useEffect } from 'react';
import { Gamepad2, Clock, Settings, RefreshCw, AlertCircle } from 'lucide-react';

const IOSDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Dados de exemplo para demonstração
  const mockData = {
    currentGame: {
      name: "Conker's Bad Fur Day",
      startDate: "04/06/25",
      cover: "https://via.placeholder.com/400x300/4A90E2/FFFFFF?text=Game+Cover"
    },
    hoursPlayedByYear: [
      { year: 2025, hours: 36.59 },
      { year: 2024, hours: 100.15 },
      { year: 2023, hours: 301.11 },
      { year: 2022, hours: 139.14 },
      { year: 2021, hours: 152.07 },
      { year: 2020, hours: 157.46 }
    ],
    totalGames: 542,
    totalValue: 10340.00,
    digitalGames: 280,
    physicalGames: 117,
    finishedByYear: [
      { year: 2025, count: 4 },
      { year: 2024, count: 8 },
      { year: 2023, count: 14 },
      { year: 2022, count: 6 },
      { year: 2021, count: 7 },
      { year: 2020, count: 7 },
      { year: 2019, count: 4 },
      { year: 2018, count: 10 },
      { year: 2017, count: 7 },
      { year: 2016, count: 14 },
      { year: 2015, count: 15 },
      { year: 2014, count: 26 },
      { year: 2013, count: 13 },
      { year: 2012, count: 5 },
      { year: 2011, count: 1 }
    ],
    boughtByYear: [
      { year: 2025, count: 4, totalValue: 190.00 },
      { year: 2024, count: 3, totalValue: 363.00 },
      { year: 2023, count: 5, totalValue: 180.00 },
      { year: 2022, count: 11, totalValue: 695.00 },
      { year: 2021, count: 9, totalValue: 661.00 },
      { year: 2020, count: 17, totalValue: 914.00 },
      { year: 2019, count: 1, totalValue: 0.00 },
      { year: 2018, count: 7, totalValue: 609.00 },
      { year: 2017, count: 3, totalValue: 618.00 },
      { year: 2016, count: 25, totalValue: 953.00 },
      { year: 2015, count: 73, totalValue: 1022.00 },
      { year: 2014, count: 74, totalValue: 2156.00 },
      { year: 2013, count: 14, totalValue: 551.00 },
      { year: 2012, count: 12, totalValue: 360.00 },
      { year: 2011, count: 6, totalValue: 580.00 }
    ],
    gamesByPlatform: [
      { platformName: "Nintendo WiiU (Virtual Console)", count: 11 },
      { platformName: "PlayStation Vita", count: 47 },
      { platformName: "Nintendo Wii", count: 38 },
      { platformName: "PlayStation 4", count: 83 },
      { platformName: "Nintendo WiiU", count: 19 }
    ]
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Primeiro, obter o token de autenticação usando as credenciais do Postman
      const tokenResponse = await fetch('https://gamenet.azurewebsites.net/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'manus-ai',
          password: 'Aa.7628143'
        })
      });

      if (!tokenResponse.ok) {
        throw new Error('Falha na autenticação');
      }

      const tokenData = await tokenResponse.json();
      const token = tokenData.access_token;

      // Agora fazer a chamada para o dashboard
      const dashboardResponse = await fetch('https://gamenet.azurewebsites.net/api/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      if (!dashboardResponse.ok) {
        throw new Error(`Erro na API: ${dashboardResponse.status}`);
      }

      const data = await dashboardResponse.json();
      setDashboardData(data);
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar dados do dashboard:', err);
      // Em caso de erro, usar dados de exemplo
      setDashboardData(mockData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Usar dados de exemplo inicialmente
    setDashboardData(mockData);
    // Tentar buscar dados reais
    fetchDashboardData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatTime = (hours) => {
    const h = Math.floor(hours);
    const m = Math.floor((hours - h) * 60);
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  if (loading && !dashboardData) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 flex items-center justify-center">
        <div className="flex items-center gap-3 text-white">
          <RefreshCw className="h-8 w-8 animate-spin" />
          <span className="text-xl">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 to-purple-800 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between p-6 pt-12">
        <h1 className="text-white text-3xl font-bold">Dashboard</h1>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchDashboardData}
            className="p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-colors"
          >
            <RefreshCw className={`h-6 w-6 text-white ${loading ? 'animate-spin' : ''}`} />
          </button>
          <Settings className="h-6 w-6 text-white" />
          <Clock className="h-6 w-6 text-white" />
        </div>
      </div>

      <div className="px-6 pb-6 space-y-6">
        {/* Jogo Atual */}
        {dashboardData?.currentGame && (
          <div className="bg-blue-600 rounded-3xl p-6 text-white">
            <h2 className="text-2xl font-bold mb-4">Jogando</h2>
            <div className="bg-black/20 rounded-2xl p-4 mb-4">
              <img 
                src={dashboardData.currentGame.cover} 
                alt={dashboardData.currentGame.name}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
            </div>
            <h3 className="text-xl font-semibold">{dashboardData.currentGame.name}</h3>
            <p className="text-white/80">{dashboardData.currentGame.startDate}</p>
          </div>
        )}

        {/* Horas Jogadas por Ano */}
        <div className="bg-blue-500 rounded-3xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Horas Jogadas por Ano</h2>
          <div className="space-y-3">
            {dashboardData?.hoursPlayedByYear?.slice(0, 6).map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-xl font-medium">{item.year}</span>
                <span className="text-xl font-bold">{formatTime(item.hours)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Estatísticas Gerais */}
        <div className="bg-blue-500 rounded-3xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-2">{dashboardData?.totalGames || 0} Jogos</h2>
          <p className="text-xl mb-2">{formatCurrency(dashboardData?.totalValue || 0)}</p>
          <p className="text-lg">{dashboardData?.digitalGames || 0} Digitais</p>
          <p className="text-lg">{dashboardData?.physicalGames || 0} Físicos</p>
        </div>

        {/* Finalizados por Ano */}
        <div className="bg-gray-700 rounded-3xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Finalizados por Ano</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {dashboardData?.finishedByYear?.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-xl font-medium">{item.count.toString().padStart(2, '0')}</span>
                <span className="text-xl">{item.year}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Comprados por Ano */}
        <div className="bg-gray-700 rounded-3xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Comprados por Ano</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {dashboardData?.boughtByYear?.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-medium">{item.count.toString().padStart(2, '0')}</span>
                  <span className="text-xl">{item.year}</span>
                </div>
                <span className="text-xl font-bold">{formatCurrency(item.totalValue || 0)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Jogos por Plataforma */}
        <div className="bg-gray-700 rounded-3xl p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">Jogos por Plataforma</h2>
          <div className="space-y-3">
            {dashboardData?.gamesByPlatform?.map((item, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-medium">{item.count.toString().padStart(3, '0')}</span>
                  <span className="text-lg">{item.platformName}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {error && (
          <div className="bg-red-500/20 backdrop-blur-sm rounded-3xl p-4">
            <div className="flex items-center gap-2 text-white/80 text-sm">
              <AlertCircle className="h-4 w-4" />
              <span>Usando dados de exemplo - {error}</span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-purple-600 px-6 py-4">
        <div className="flex justify-around items-center">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center mb-1">
              <div className="w-4 h-4 bg-purple-600 rounded"></div>
            </div>
            <span className="text-white text-sm">Dashboard</span>
          </div>
          <div className="flex flex-col items-center">
            <Gamepad2 className="h-8 w-8 text-white/60 mb-1" />
            <span className="text-white/60 text-sm">Games</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center mb-1">
              <div className="w-6 h-4 bg-white/60 rounded"></div>
            </div>
            <span className="text-white/60 text-sm">Plataformas</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 flex items-center justify-center mb-1">
              <div className="w-6 h-6 border-2 border-white/60 rounded"></div>
            </div>
            <span className="text-white/60 text-sm">Listas</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IOSDashboard;

