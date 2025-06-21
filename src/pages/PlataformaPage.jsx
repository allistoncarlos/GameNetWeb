import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { 
  Monitor, 
  Settings, 
  Server, 
  Database, 
  Shield, 
  Wifi, 
  HardDrive, 
  Cpu,
  MemoryStick,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Globe,
  Lock,
  Zap,
  BarChart3
} from 'lucide-react';

const PlataformaPage = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Dados mock do sistema
  const systemStats = {
    uptime: '99.9%',
    totalUsers: 15420,
    activeConnections: 1247,
    serverLoad: 68,
    memoryUsage: 72,
    diskUsage: 45,
    networkTraffic: '2.4 GB/s',
    lastUpdate: '2024-06-21 14:30:00'
  };

  const servers = [
    {
      id: 1,
      name: 'Web Server 01',
      status: 'online',
      cpu: 45,
      memory: 68,
      disk: 32,
      location: 'São Paulo, BR',
      uptime: '15 dias'
    },
    {
      id: 2,
      name: 'Database Server',
      status: 'online',
      cpu: 72,
      memory: 84,
      disk: 67,
      location: 'São Paulo, BR',
      uptime: '32 dias'
    },
    {
      id: 3,
      name: 'Game Server 01',
      status: 'maintenance',
      cpu: 0,
      memory: 0,
      disk: 45,
      location: 'Rio de Janeiro, BR',
      uptime: '0 dias'
    },
    {
      id: 4,
      name: 'CDN Server',
      status: 'online',
      cpu: 23,
      memory: 41,
      disk: 28,
      location: 'Brasília, BR',
      uptime: '8 dias'
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online':
        return <CheckCircle size={16} className="text-success" />;
      case 'maintenance':
        return <AlertTriangle size={16} className="text-warning" />;
      case 'offline':
        return <AlertTriangle size={16} className="text-danger" />;
      default:
        return <Clock size={16} className="text-muted" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'online':
        return <span className="badge bg-success">Online</span>;
      case 'maintenance':
        return <span className="badge bg-warning">Manutenção</span>;
      case 'offline':
        return <span className="badge bg-danger">Offline</span>;
      default:
        return <span className="badge bg-secondary">Desconhecido</span>;
    }
  };

  const getUsageColor = (percentage) => {
    if (percentage >= 80) return 'danger';
    if (percentage >= 60) return 'warning';
    return 'success';
  };

  const tabs = [
    { id: 'overview', label: 'Visão Geral', icon: Monitor },
    { id: 'servers', label: 'Servidores', icon: Server },
    { id: 'database', label: 'Banco de Dados', icon: Database },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  return (
    <Layout title="Plataforma" subtitle="Configurações e Monitoramento">
      {/* Navegação por abas */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                {tabs.map(tab => {
                  const Icon = tab.icon;
                  return (
                    <li key={tab.id} className="nav-item">
                      <button
                        className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                      >
                        <Icon size={16} className="me-2" />
                        {tab.label}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo das abas */}
      {activeTab === 'overview' && (
        <>
          {/* Estatísticas principais */}
          <div className="row mb-4">
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">Uptime do Sistema</div>
                    <div className="ms-auto lh-1">
                      <Activity size={20} className="text-success" />
                    </div>
                  </div>
                  <div className="h1 mb-0 text-success">{systemStats.uptime}</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">Usuários Totais</div>
                    <div className="ms-auto lh-1">
                      <Users size={20} className="text-primary" />
                    </div>
                  </div>
                  <div className="h1 mb-0">{systemStats.totalUsers.toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">Conexões Ativas</div>
                    <div className="ms-auto lh-1">
                      <Wifi size={20} className="text-info" />
                    </div>
                  </div>
                  <div className="h1 mb-0">{systemStats.activeConnections.toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div className="col-sm-6 col-lg-3">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                    <div className="subheader">Tráfego de Rede</div>
                    <div className="ms-auto lh-1">
                      <Globe size={20} className="text-warning" />
                    </div>
                  </div>
                  <div className="h1 mb-0">{systemStats.networkTraffic}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Métricas de performance */}
          <div className="row mb-4">
            <div className="col-md-4">
              <Card title="Carga do Servidor" subtitle="Utilização atual">
                <div className="d-flex align-items-center mb-2">
                  <Cpu size={20} className="me-2 text-primary" />
                  <span>CPU: {systemStats.serverLoad}%</span>
                </div>
                <div className="progress mb-3">
                  <div 
                    className={`progress-bar bg-${getUsageColor(systemStats.serverLoad)}`}
                    style={{ width: `${systemStats.serverLoad}%` }}
                  ></div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <MemoryStick size={20} className="me-2 text-info" />
                  <span>Memória: {systemStats.memoryUsage}%</span>
                </div>
                <div className="progress mb-3">
                  <div 
                    className={`progress-bar bg-${getUsageColor(systemStats.memoryUsage)}`}
                    style={{ width: `${systemStats.memoryUsage}%` }}
                  ></div>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <HardDrive size={20} className="me-2 text-success" />
                  <span>Disco: {systemStats.diskUsage}%</span>
                </div>
                <div className="progress">
                  <div 
                    className={`progress-bar bg-${getUsageColor(systemStats.diskUsage)}`}
                    style={{ width: `${systemStats.diskUsage}%` }}
                  ></div>
                </div>
              </Card>
            </div>
            <div className="col-md-8">
              <Card title="Status dos Serviços" subtitle="Monitoramento em tempo real">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                      <div className="d-flex align-items-center">
                        <Globe size={20} className="me-2 text-primary" />
                        <span>Servidor Web</span>
                      </div>
                      <span className="badge bg-success">Online</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                      <div className="d-flex align-items-center">
                        <Database size={20} className="me-2 text-info" />
                        <span>Banco de Dados</span>
                      </div>
                      <span className="badge bg-success">Online</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                      <div className="d-flex align-items-center">
                        <Zap size={20} className="me-2 text-warning" />
                        <span>API Gateway</span>
                      </div>
                      <span className="badge bg-success">Online</span>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                      <div className="d-flex align-items-center">
                        <Shield size={20} className="me-2 text-success" />
                        <span>Firewall</span>
                      </div>
                      <span className="badge bg-success">Ativo</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </>
      )}

      {activeTab === 'servers' && (
        <div className="row">
          {servers.map(server => (
            <div key={server.id} className="col-md-6 col-lg-6 mb-4">
              <Card>
                <div className="card-header d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center">
                    <Server size={20} className="me-2" />
                    <h5 className="mb-0">{server.name}</h5>
                  </div>
                  {getStatusBadge(server.status)}
                </div>
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-6">
                      <small className="text-muted">Localização</small>
                      <div>{server.location}</div>
                    </div>
                    <div className="col-6">
                      <small className="text-muted">Uptime</small>
                      <div>{server.uptime}</div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>CPU</span>
                      <span>{server.cpu}%</span>
                    </div>
                    <div className="progress progress-sm">
                      <div 
                        className={`progress-bar bg-${getUsageColor(server.cpu)}`}
                        style={{ width: `${server.cpu}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <div className="d-flex justify-content-between">
                      <span>Memória</span>
                      <span>{server.memory}%</span>
                    </div>
                    <div className="progress progress-sm">
                      <div 
                        className={`progress-bar bg-${getUsageColor(server.memory)}`}
                        style={{ width: `${server.memory}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <div className="d-flex justify-content-between">
                      <span>Disco</span>
                      <span>{server.disk}%</span>
                    </div>
                    <div className="progress progress-sm">
                      <div 
                        className={`progress-bar bg-${getUsageColor(server.disk)}`}
                        style={{ width: `${server.disk}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="d-flex gap-2">
                    <button className="btn btn-outline-primary btn-sm">
                      <BarChart3 size={14} className="me-1" />
                      Detalhes
                    </button>
                    <button className="btn btn-outline-secondary btn-sm">
                      <Settings size={14} className="me-1" />
                      Config
                    </button>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'database' && (
        <div className="row">
          <div className="col-md-8">
            <Card title="Status do Banco de Dados" subtitle="Monitoramento em tempo real">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Conexões Ativas</span>
                    <span className="badge bg-info">247</span>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Queries por Segundo</span>
                    <span className="badge bg-success">1,234</span>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Tamanho do Banco</span>
                    <span className="badge bg-warning">2.4 GB</span>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="d-flex align-items-center justify-content-between">
                    <span>Último Backup</span>
                    <span className="badge bg-primary">2h atrás</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-md-4">
            <Card title="Ações Rápidas">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <Database size={16} className="me-2" />
                  Fazer Backup
                </button>
                <button className="btn btn-outline-info">
                  <BarChart3 size={16} className="me-2" />
                  Ver Relatórios
                </button>
                <button className="btn btn-outline-warning">
                  <Settings size={16} className="me-2" />
                  Configurações
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="row">
          <div className="col-md-6">
            <Card title="Status de Segurança" subtitle="Proteção ativa">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex align-items-center">
                  <CheckCircle size={16} className="text-success me-2" />
                  <span>Firewall Ativo</span>
                </div>
                <div className="list-group-item d-flex align-items-center">
                  <CheckCircle size={16} className="text-success me-2" />
                  <span>SSL/TLS Configurado</span>
                </div>
                <div className="list-group-item d-flex align-items-center">
                  <CheckCircle size={16} className="text-success me-2" />
                  <span>Autenticação 2FA</span>
                </div>
                <div className="list-group-item d-flex align-items-center">
                  <AlertTriangle size={16} className="text-warning me-2" />
                  <span>Logs de Auditoria</span>
                </div>
              </div>
            </Card>
          </div>
          <div className="col-md-6">
            <Card title="Configurações de Segurança">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <Lock size={16} className="me-2" />
                  Gerenciar Certificados
                </button>
                <button className="btn btn-outline-info">
                  <Shield size={16} className="me-2" />
                  Configurar Firewall
                </button>
                <button className="btn btn-outline-warning">
                  <Users size={16} className="me-2" />
                  Gerenciar Usuários
                </button>
                <button className="btn btn-outline-danger">
                  <AlertTriangle size={16} className="me-2" />
                  Logs de Segurança
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="row">
          <div className="col-12">
            <Card title="Configurações da Plataforma" subtitle="Ajustes gerais do sistema">
              <div className="row">
                <div className="col-md-6">
                  <h5>Configurações Gerais</h5>
                  <div className="mb-3">
                    <label className="form-label">Nome da Plataforma</label>
                    <input type="text" className="form-control" defaultValue="GameNet Platform" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Timezone</label>
                    <select className="form-select">
                      <option>America/Sao_Paulo</option>
                      <option>America/New_York</option>
                      <option>Europe/London</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Idioma Padrão</label>
                    <select className="form-select">
                      <option>Português (BR)</option>
                      <option>English (US)</option>
                      <option>Español</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <h5>Configurações de Performance</h5>
                  <div className="mb-3">
                    <label className="form-label">Cache TTL (segundos)</label>
                    <input type="number" className="form-control" defaultValue="3600" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Max Conexões Simultâneas</label>
                    <input type="number" className="form-control" defaultValue="1000" />
                  </div>
                  <div className="mb-3">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                      <label className="form-check-label">
                        Habilitar Compressão GZIP
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <button className="btn btn-primary me-2">Salvar Configurações</button>
                <button className="btn btn-outline-secondary">Cancelar</button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default PlataformaPage;

