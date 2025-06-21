import React, { useState, useEffect } from 'react';
import { Database, Clock, AlertCircle, CheckCircle, RefreshCw, Gamepad2, TrendingUp, Calendar, DollarSign } from 'lucide-react';

const DashboardData = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        throw new Error('Token de autenticação não encontrado. Faça login novamente.');
      }

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

      const jsonResponse = await dashboardResponse.json();

      setDashboardData(jsonResponse.data);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar dados do dashboard:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value || 0);
  };

  const formatTime = (hours) => {
    const h = Math.floor(hours || 0);
    const m = Math.floor(((hours || 0) - h) * 60);
    return `${h}:${m.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title flex items-center gap-2">
            <Database className="h-5 w-5" />
            Dados do Dashboard GameNet
          </h3>
        </div>
        <div className="card-body">
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3">
              <RefreshCw className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-gray-600 dark:text-gray-400">Carregando dados da API...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Erro ao Carregar Dashboard
          </h3>
        </div>
        <div className="card-body">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-600 dark:text-red-400 mb-3">{error}</p>
            <button
              onClick={fetchDashboardData}
              className="btn btn-outline-primary flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Dashboard GameNet</h3>
        </div>
        <div className="card-body">
          <p className="text-gray-500 dark:text-gray-400">Nenhum dado disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com informações */}
      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h3 className="card-title flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Dashboard GameNet - Dados da API
            </h3>
            <button
              onClick={fetchDashboardData}
              className="btn btn-outline-primary btn-sm flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              Atualizar
            </button>
          </div>
          {lastUpdated && (
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-2">
              <Clock className="h-4 w-4" />
              Última atualização: {lastUpdated.toLocaleString('pt-BR')}
            </p>
          )}
        </div>
      </div>

      {/* Jogo Atual */}
      {dashboardData.currentGame && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <Gamepad2 className="h-5 w-5 text-blue-500" />
              Jogo Atual
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-3">
                {dashboardData.currentGame.cover && (
                  <img 
                    src={dashboardData.currentGame.cover} 
                    alt={dashboardData.currentGame.name}
                    className="img-fluid rounded"
                  />
                )}
              </div>
              <div className="col-md-9">
                <h4 className="mb-2">{dashboardData.currentGame.name}</h4>
                <p className="text-muted">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Iniciado em: {dashboardData.currentGame.startDate}
                </p>
                {dashboardData.currentGame.platform && (
                  <p className="text-muted">
                    Plataforma: {dashboardData.currentGame.platform}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Estatísticas Principais */}
      <div className="row row-deck row-cards">
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Total de Jogos</div>
              </div>
              <div className="h1 mb-3">{dashboardData.totalGames || 0}</div>
              <div className="d-flex mb-2">
                <div>Valor Total: {formatCurrency(dashboardData.totalValue)}</div>
              </div>
              <div className="progress progress-sm">
                <div className="progress-bar bg-primary" style={{width: "100%"}}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Jogos Digitais</div>
              </div>
              <div className="h1 mb-3">{dashboardData.digitalGames || 0}</div>
              <div className="d-flex mb-2">
                <div>
                  {dashboardData.totalGames ? 
                    Math.round((dashboardData.digitalGames / dashboardData.totalGames) * 100) : 0
                  }% do total
                </div>
              </div>
              <div className="progress progress-sm">
                <div className="progress-bar bg-success" style={{
                  width: dashboardData.totalGames ? 
                    `${(dashboardData.digitalGames / dashboardData.totalGames) * 100}%` : "0%"
                }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Jogos Físicos</div>
              </div>
              <div className="h1 mb-3">{dashboardData.physicalGames || 0}</div>
              <div className="d-flex mb-2">
                <div>
                  {dashboardData.totalGames ? 
                    Math.round((dashboardData.physicalGames / dashboardData.totalGames) * 100) : 0
                  }% do total
                </div>
              </div>
              <div className="progress progress-sm">
                <div className="progress-bar bg-warning" style={{
                  width: dashboardData.totalGames ? 
                    `${(dashboardData.physicalGames / dashboardData.totalGames) * 100}%` : "0%"
                }}></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Horas Totais</div>
              </div>
              <div className="h1 mb-3">
                {dashboardData.hoursPlayedByYear ? 
                  formatTime(dashboardData.hoursPlayedByYear.reduce((acc, item) => acc + (item.hours || 0), 0)) : 
                  "0:00"
                }
              </div>
              <div className="d-flex mb-2">
                <div>Tempo de jogo acumulado</div>
              </div>
              <div className="progress progress-sm">
                <div className="progress-bar bg-info" style={{width: "100%"}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Horas por Ano */}
      {dashboardData.hoursPlayedByYear && dashboardData.hoursPlayedByYear.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              Horas Jogadas por Ano
            </h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-vcenter">
                <thead>
                  <tr>
                    <th>Ano</th>
                    <th>Horas</th>
                    <th>Progresso</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.hoursPlayedByYear.map((item, index) => (
                    <tr key={index}>
                      <td>{item.year}</td>
                      <td className="text-muted">{formatTime(item.hours)}</td>
                      <td>
                        <div className="progress progress-sm">
                          <div 
                            className="progress-bar bg-primary" 
                            style={{
                              width: `${Math.min((item.hours / 400) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Finalizados por Ano */}
      {dashboardData.finishedByYear && dashboardData.finishedByYear.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Jogos Finalizados por Ano</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-vcenter">
                <thead>
                  <tr>
                    <th>Ano</th>
                    <th>Quantidade</th>
                    <th>Progresso</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.finishedByYear.map((item, index) => (
                    <tr key={index}>
                      <td>{item.year}</td>
                      <td className="text-muted">{item.count}</td>
                      <td>
                        <div className="progress progress-sm">
                          <div 
                            className="progress-bar bg-success" 
                            style={{
                              width: `${Math.min((item.count / 30) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Comprados por Ano */}
      {dashboardData.boughtByYear && dashboardData.boughtByYear.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-yellow-500" />
              Jogos Comprados por Ano
            </h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-vcenter">
                <thead>
                  <tr>
                    <th>Ano</th>
                    <th>Quantidade</th>
                    <th>Valor Total</th>
                    <th>Progresso</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.boughtByYear.map((item, index) => (
                    <tr key={index}>
                      <td>{item.year}</td>
                      <td className="text-muted">{item.count}</td>
                      <td className="text-muted">{formatCurrency(item.totalValue)}</td>
                      <td>
                        <div className="progress progress-sm">
                          <div 
                            className="progress-bar bg-warning" 
                            style={{
                              width: `${Math.min((item.count / 100) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Jogos por Plataforma */}
      {dashboardData.gamesByPlatform && dashboardData.gamesByPlatform.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Jogos por Plataforma</h3>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-vcenter">
                <thead>
                  <tr>
                    <th>Plataforma</th>
                    <th>Quantidade</th>
                    <th>Progresso</th>
                  </tr>
                </thead>
                <tbody>
                  {dashboardData.gamesByPlatform.map((item, index) => (
                    <tr key={index}>
                      <td>{item.platformName}</td>
                      <td className="text-muted">{item.count}</td>
                      <td>
                        <div className="progress progress-sm">
                          <div 
                            className="progress-bar bg-info" 
                            style={{
                              width: `${Math.min((item.count / 100) * 100, 100)}%`
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardData;

