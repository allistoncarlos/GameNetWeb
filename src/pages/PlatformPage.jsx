import React, { useState, useEffect } from 'react';
import { Search, Server, Globe, Shield, Activity, AlertCircle, CheckCircle } from 'lucide-react';

const PlatformPage = () => {
  const [platforms, setPlatforms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Buscar dados da API
  useEffect(() => {
    const fetchPlatforms = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
        if (!token) {
          setError('Token de autenticação não encontrado');
          setLoading(false);
          return;
        }

        const response = await fetch('https://gamenet.azurewebsites.net/api/platform', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error(`Erro ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        const jsonResponse = data;
        const platformsData = Array.isArray(jsonResponse.data.result) ? jsonResponse.data.result : [];
        
        // Ordenar por nome de plataforma
        const sortedPlatforms = platformsData.sort((a, b) => {
          const nameA = (a.name || '').toLowerCase();
          const nameB = (b.name || '').toLowerCase();
          return nameA.localeCompare(nameB);
        });
        
        setPlatforms(sortedPlatforms);
      } catch (err) {
        setError(err.message);
        console.error('Erro ao buscar plataformas:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlatforms();
  }, []);

  // Filtrar plataformas baseado na busca
  const filteredPlatforms = platforms.filter(platform =>
    platform.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    platform.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    platform.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Função para obter ícone de status
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'online':
        return <CheckCircle className="text-success" size={16} />;
      case 'inactive':
      case 'offline':
        return <AlertCircle className="text-danger" size={16} />;
      default:
        return <Activity className="text-warning" size={16} />;
    }
  };

  // Função para obter badge de status
  const getStatusBadge = (status) => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'online':
        return <span className="badge bg-success">Online</span>;
      case 'inactive':
      case 'offline':
        return <span className="badge bg-danger">Offline</span>;
      default:
        return <span className="badge bg-warning">Unknown</span>;
    }
  };

  if (loading) {
    return (
      <div className="page-body">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="container-xl">
              <div className="row g-2 align-items-center">
                <div className="col">
                  <h2 className="page-title">Platform</h2>
                </div>
              </div>
            </div>
          </div>
          
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-body">
        <div className="container-xl">
          <div className="page-header d-print-none">
            <div className="container-xl">
              <div className="row g-2 align-items-center">
                <div className="col">
                  <h2 className="page-title">Platform</h2>
                </div>
              </div>
            </div>
          </div>
          
          <div className="alert alert-danger" role="alert">
            <div className="d-flex">
              <div>
                <AlertCircle className="me-2" size={20} />
              </div>
              <div>
                <h4 className="alert-title">Erro ao carregar plataformas</h4>
                <div className="text-muted">{error}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-body">
      <div className="container-xl">
        {/* Page header */}
        <div className="page-header d-print-none">
          <div className="container-xl">
            <div className="row g-2 align-items-center">
              <div className="col">
                <h2 className="page-title">Platform</h2>
                <div className="page-subtitle">
                  Manage and monitor platform services
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search bar */}
        <div className="row mb-4">
          <div className="col-12">
            <div className="card card-sm">
              <div className="card-body">
                <div className="row g-2 align-items-center">
                  <div className="col">
                    <div className="input-icon">
                      <span className="input-icon-addon">
                        <Search size={18} />
                      </span>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Search platforms by name, description or status..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-auto">
                    <div className="badge bg-blue-lt text-blue">
                      {filteredPlatforms.length} of {platforms.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Platforms list */}
        {filteredPlatforms.length === 0 ? (
          <div className="empty">
            <div className="empty-img">
              <Server size={48} className="text-muted" />
            </div>
            <p className="empty-title">No platforms found</p>
            <p className="empty-subtitle text-muted">
              {searchTerm ? 'Try adjusting your search terms' : 'No platforms available at the moment'}
            </p>
          </div>
        ) : (
          <div className="row row-cards">
            {filteredPlatforms.map((platform, index) => (
              <div key={platform.id || index} className="col-12 col-md-6 col-lg-4">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex align-items-center mb-3">
                      <div className="me-3">
                        {platform.type === 'web' ? (
                          <Globe className="text-primary" size={24} />
                        ) : platform.type === 'security' ? (
                          <Shield className="text-success" size={24} />
                        ) : (
                          <Server className="text-info" size={24} />
                        )}
                      </div>
                      <div className="flex-fill">
                        <div className="font-weight-medium">
                          {platform.name || `Platform ${index + 1}`}
                        </div>
                        <div className="text-muted small">
                          {platform.type || 'Unknown'}
                        </div>
                      </div>
                      <div>
                        {getStatusIcon(platform.status)}
                      </div>
                    </div>
                    
                    {platform.description && (
                      <p className="text-muted mb-3">
                        {platform.description}
                      </p>
                    )}
                    
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        {getStatusBadge(platform.status)}
                      </div>
                      <div className="text-muted small">
                        {platform.lastUpdate && (
                          <>Updated: {new Date(platform.lastUpdate).toLocaleDateString()}</>
                        )}
                      </div>
                    </div>
                    
                    {platform.url && (
                      <div className="mt-3">
                        <a 
                          href={platform.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm w-100"
                        >
                          Access Platform
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary stats */}
        {platforms.length > 0 && (
          <div className="row mt-4">
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="row">
                    <div className="col-12 col-sm-6 col-lg-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <div className="bg-primary-lt p-2 rounded">
                            <Server className="text-primary" size={20} />
                          </div>
                        </div>
                        <div>
                          <div className="font-weight-medium">{platforms.length}</div>
                          <div className="text-muted small">Total Platforms</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <div className="bg-success-lt p-2 rounded">
                            <CheckCircle className="text-success" size={20} />
                          </div>
                        </div>
                        <div>
                          <div className="font-weight-medium">
                            {platforms.filter(p => ['active', 'online'].includes(p.status?.toLowerCase())).length}
                          </div>
                          <div className="text-muted small">Online</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <div className="bg-danger-lt p-2 rounded">
                            <AlertCircle className="text-danger" size={20} />
                          </div>
                        </div>
                        <div>
                          <div className="font-weight-medium">
                            {platforms.filter(p => ['inactive', 'offline'].includes(p.status?.toLowerCase())).length}
                          </div>
                          <div className="text-muted small">Offline</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-sm-6 col-lg-3">
                      <div className="d-flex align-items-center">
                        <div className="me-3">
                          <div className="bg-info-lt p-2 rounded">
                            <Globe className="text-info" size={20} />
                          </div>
                        </div>
                        <div>
                          <div className="font-weight-medium">
                            {platforms.filter(p => p.type === 'web').length}
                          </div>
                          <div className="text-muted small">Web Services</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlatformPage;

