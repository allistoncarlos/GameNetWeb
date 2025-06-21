import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { 
  List, 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  Users,
  Calendar,
  Tag,
  MoreVertical,
  Download,
  Share2,
  Copy,
  Archive
} from 'lucide-react';

const ListsPage = () => {
  const [listas, setListas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Dados mock para demonstração
  const mockListas = [
    {
      id: 1,
      title: "Top 10 Jogos de Ação",
      description: "Os melhores jogos de ação disponíveis na plataforma",
      category: "games",
      items: 10,
      views: 1250,
      likes: 89,
      author: "Admin",
      createdAt: "2024-06-15",
      updatedAt: "2024-06-20",
      status: "published",
      featured: true,
      tags: ["ação", "top10", "popular"]
    },
    {
      id: 2,
      title: "Jogos Indie Recomendados",
      description: "Descoberta de jogos independentes únicos e criativos",
      category: "games",
      items: 15,
      views: 890,
      likes: 67,
      author: "Curador",
      createdAt: "2024-06-10",
      updatedAt: "2024-06-18",
      status: "published",
      featured: false,
      tags: ["indie", "criativo", "descoberta"]
    },
    {
      id: 3,
      title: "Usuários Mais Ativos",
      description: "Lista dos usuários com maior engajamento na plataforma",
      category: "users",
      items: 25,
      views: 456,
      likes: 34,
      author: "Sistema",
      createdAt: "2024-06-12",
      updatedAt: "2024-06-21",
      status: "published",
      featured: true,
      tags: ["usuários", "engajamento", "ranking"]
    },
    {
      id: 4,
      title: "Eventos da Semana",
      description: "Próximos eventos e torneios programados",
      category: "events",
      items: 8,
      views: 723,
      likes: 45,
      author: "Eventos",
      createdAt: "2024-06-18",
      updatedAt: "2024-06-21",
      status: "published",
      featured: false,
      tags: ["eventos", "torneios", "agenda"]
    },
    {
      id: 5,
      title: "Wishlist Coletiva",
      description: "Jogos mais desejados pela comunidade",
      category: "wishlist",
      items: 32,
      views: 1890,
      likes: 156,
      author: "Comunidade",
      createdAt: "2024-06-05",
      updatedAt: "2024-06-20",
      status: "published",
      featured: true,
      tags: ["wishlist", "comunidade", "desejados"]
    },
    {
      id: 6,
      title: "Configurações Recomendadas",
      description: "Melhores configurações para diferentes tipos de hardware",
      category: "settings",
      items: 12,
      views: 567,
      likes: 78,
      author: "Suporte",
      createdAt: "2024-06-14",
      updatedAt: "2024-06-19",
      status: "draft",
      featured: false,
      tags: ["configurações", "hardware", "otimização"]
    }
  ];

  const categories = [
    { value: 'all', label: 'Todas as Categorias' },
    { value: 'games', label: 'Jogos' },
    { value: 'users', label: 'Usuários' },
    { value: 'events', label: 'Eventos' },
    { value: 'wishlist', label: 'Wishlist' },
    { value: 'settings', label: 'Configurações' }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setListas(mockListas);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredListas = listas.filter(lista => {
    const matchesSearch = lista.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lista.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || lista.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'published':
        return <span className="badge bg-success">Publicada</span>;
      case 'draft':
        return <span className="badge bg-warning">Rascunho</span>;
      case 'archived':
        return <span className="badge bg-secondary">Arquivada</span>;
      default:
        return <span className="badge bg-secondary">Desconhecido</span>;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'games':
        return '🎮';
      case 'users':
        return '👥';
      case 'events':
        return '📅';
      case 'wishlist':
        return '⭐';
      case 'settings':
        return '⚙️';
      default:
        return '📋';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <Layout title="Lists" subtitle="List Management">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Lists" subtitle="List Management">
      {/* Header com ações */}
      <div className="row mb-4">
        <div className="col-md-8">
          <div className="d-flex gap-3">
            <div className="input-group">
              <span className="input-group-text">
                <Search size={16} />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Buscar listas..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="form-select"
              style={{ maxWidth: '200px' }}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="col-md-4 text-end">
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} className="me-2" />
            Nova Lista
          </button>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="row mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Total de Listas</div>
                <div className="ms-auto lh-1">
                  <List size={20} className="text-primary" />
                </div>
              </div>
              <div className="h1 mb-0">{listas.length}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Listas Publicadas</div>
                <div className="ms-auto lh-1">
                  <Eye size={20} className="text-success" />
                </div>
              </div>
              <div className="h1 mb-0">{listas.filter(l => l.status === 'published').length}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Total de Visualizações</div>
                <div className="ms-auto lh-1">
                  <Users size={20} className="text-info" />
                </div>
              </div>
              <div className="h1 mb-0">{listas.reduce((sum, lista) => sum + lista.views, 0).toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Listas em Destaque</div>
                <div className="ms-auto lh-1">
                  <Star size={20} className="text-warning" />
                </div>
              </div>
              <div className="h1 mb-0">{listas.filter(l => l.featured).length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de listas */}
      <div className="row">
        {filteredListas.map(lista => (
          <div key={lista.id} className="col-md-6 col-lg-4 mb-4">
            <Card>
              <div className="card-header d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <span className="me-2" style={{ fontSize: '1.2em' }}>
                    {getCategoryIcon(lista.category)}
                  </span>
                  <h6 className="mb-0">{lista.title}</h6>
                  {lista.featured && (
                    <Star size={14} className="ms-2 text-warning" />
                  )}
                </div>
                <div className="dropdown">
                  <button 
                    className="btn btn-ghost-secondary btn-sm"
                    data-bs-toggle="dropdown"
                  >
                    <MoreVertical size={16} />
                  </button>
                  <div className="dropdown-menu">
                    <a className="dropdown-item" href="#">
                      <Eye size={14} className="me-2" />
                      Visualizar
                    </a>
                    <a className="dropdown-item" href="#">
                      <Edit size={14} className="me-2" />
                      Editar
                    </a>
                    <a className="dropdown-item" href="#">
                      <Copy size={14} className="me-2" />
                      Duplicar
                    </a>
                    <a className="dropdown-item" href="#">
                      <Share2 size={14} className="me-2" />
                      Compartilhar
                    </a>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item text-danger" href="#">
                      <Trash2 size={14} className="me-2" />
                      Excluir
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="card-body">
                <p className="card-text text-muted small mb-3">{lista.description}</p>
                
                <div className="row text-center mb-3">
                  <div className="col-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <List size={14} className="text-primary me-1" />
                      <small>{lista.items} itens</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <Eye size={14} className="text-info me-1" />
                      <small>{lista.views}</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <Star size={14} className="text-warning me-1" />
                      <small>{lista.likes}</small>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  {lista.tags.map(tag => (
                    <span key={tag} className="badge bg-light text-dark me-1 mb-1">
                      <Tag size={10} className="me-1" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="d-flex justify-content-between align-items-center mb-3">
                  <small className="text-muted">
                    Por {lista.author}
                  </small>
                  {getStatusBadge(lista.status)}
                </div>

                <div className="d-flex justify-content-between align-items-center text-muted small">
                  <span>Criada: {formatDate(lista.createdAt)}</span>
                  <span>Atualizada: {formatDate(lista.updatedAt)}</span>
                </div>
              </div>

              <div className="card-footer">
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm flex-fill">
                    <Eye size={14} className="me-1" />
                    Ver Lista
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <Edit size={14} />
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <Download size={14} />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {filteredListas.length === 0 && (
        <div className="text-center py-5">
          <List size={48} className="text-muted mb-3" />
          <h4 className="text-muted">Nenhuma lista encontrada</h4>
          <p className="text-muted">Tente ajustar os filtros de busca ou crie uma nova lista.</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <Plus size={16} className="me-2" />
            Criar Nova Lista
          </button>
        </div>
      )}

      {/* Modal de criação (placeholder) */}
      {showCreateModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nova Lista</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowCreateModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Título da Lista</label>
                  <input type="text" className="form-control" placeholder="Digite o título..." />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <textarea className="form-control" rows="3" placeholder="Descreva sua lista..."></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoria</label>
                  <select className="form-select">
                    <option value="">Selecione uma categoria</option>
                    {categories.slice(1).map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input className="form-check-input" type="checkbox" />
                    <label className="form-check-label">
                      Marcar como destaque
                    </label>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancelar
                </button>
                <button type="button" className="btn btn-primary">
                  Criar Lista
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ListsPage;

