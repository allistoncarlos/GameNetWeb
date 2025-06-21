import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/Card';
import { 
  Gamepad2, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Download, 
  Users, 
  Calendar,
  Trophy,
  Zap,
  Heart,
  Share2
} from 'lucide-react';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Dados mock para demonstração
  const mockGames = [
    {
      id: 1,
      title: "Cyber Warriors 2077",
      category: "action",
      rating: 4.8,
      downloads: 125000,
      players: 45000,
      releaseDate: "2024-01-15",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=200&fit=crop",
      description: "Um jogo de ação futurista com gráficos impressionantes.",
      status: "active",
      featured: true
    },
    {
      id: 2,
      title: "Fantasy Quest Online",
      category: "rpg",
      rating: 4.6,
      downloads: 89000,
      players: 32000,
      releaseDate: "2024-02-20",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=300&h=200&fit=crop",
      description: "MMORPG épico com mundo aberto e aventuras infinitas.",
      status: "active",
      featured: false
    },
    {
      id: 3,
      title: "Speed Racing Pro",
      category: "racing",
      rating: 4.4,
      downloads: 67000,
      players: 28000,
      releaseDate: "2024-03-10",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=300&h=200&fit=crop",
      description: "Corridas emocionantes com carros realistas.",
      status: "active",
      featured: true
    },
    {
      id: 4,
      title: "Puzzle Master",
      category: "puzzle",
      rating: 4.2,
      downloads: 156000,
      players: 78000,
      releaseDate: "2024-01-05",
      image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=300&h=200&fit=crop",
      description: "Desafios mentais que vão testar sua inteligência.",
      status: "active",
      featured: false
    },
    {
      id: 5,
      title: "Battle Royale Arena",
      category: "action",
      rating: 4.7,
      downloads: 234000,
      players: 95000,
      releaseDate: "2023-12-15",
      image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=300&h=200&fit=crop",
      description: "100 jogadores, 1 vencedor. Sobreviva na arena!",
      status: "active",
      featured: true
    },
    {
      id: 6,
      title: "Mystic Adventures",
      category: "adventure",
      rating: 4.3,
      downloads: 43000,
      players: 18000,
      releaseDate: "2024-04-01",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=200&fit=crop",
      description: "Explore mundos místicos cheios de segredos.",
      status: "beta",
      featured: false
    }
  ];

  const categories = [
    { value: 'all', label: 'Todos os Jogos' },
    { value: 'action', label: 'Ação' },
    { value: 'rpg', label: 'RPG' },
    { value: 'racing', label: 'Corrida' },
    { value: 'puzzle', label: 'Puzzle' },
    { value: 'adventure', label: 'Aventura' }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setGames(mockGames);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredGames = games.filter(game => game.featured);

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <span className="badge bg-success">Ativo</span>;
      case 'beta':
        return <span className="badge bg-warning">Beta</span>;
      case 'maintenance':
        return <span className="badge bg-danger">Manutenção</span>;
      default:
        return <span className="badge bg-secondary">Desconhecido</span>;
    }
  };

  if (loading) {
    return (
      <Layout title="Games" subtitle="Gerenciamento de Jogos">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Games" subtitle="Gerenciamento de Jogos">
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
                placeholder="Buscar jogos..."
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
          <button className="btn btn-primary">
            <Plus size={16} className="me-2" />
            Adicionar Jogo
          </button>
        </div>
      </div>

      {/* Estatísticas rápidas */}
      <div className="row mb-4">
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Total de Jogos</div>
                <div className="ms-auto lh-1">
                  <Gamepad2 size={20} className="text-primary" />
                </div>
              </div>
              <div className="h1 mb-0">{games.length}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Jogadores Ativos</div>
                <div className="ms-auto lh-1">
                  <Users size={20} className="text-success" />
                </div>
              </div>
              <div className="h1 mb-0">{formatNumber(games.reduce((sum, game) => sum + game.players, 0))}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Downloads Totais</div>
                <div className="ms-auto lh-1">
                  <Download size={20} className="text-info" />
                </div>
              </div>
              <div className="h1 mb-0">{formatNumber(games.reduce((sum, game) => sum + game.downloads, 0))}</div>
            </div>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3">
          <div className="card">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className="subheader">Jogos em Destaque</div>
                <div className="ms-auto lh-1">
                  <Star size={20} className="text-warning" />
                </div>
              </div>
              <div className="h1 mb-0">{featuredGames.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de jogos */}
      <div className="row">
        {filteredGames.map(game => (
          <div key={game.id} className="col-md-6 col-lg-4 mb-4">
            <Card>
              <div className="position-relative">
                <img 
                  src={game.image} 
                  alt={game.title}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                {game.featured && (
                  <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-warning">
                      <Star size={12} className="me-1" />
                      Destaque
                    </span>
                  </div>
                )}
                <div className="position-absolute top-0 start-0 m-2">
                  {getStatusBadge(game.status)}
                </div>
              </div>
              
              <div className="card-body">
                <h5 className="card-title">{game.title}</h5>
                <p className="card-text text-muted small">{game.description}</p>
                
                <div className="row text-center mb-3">
                  <div className="col-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <Star size={14} className="text-warning me-1" />
                      <small>{game.rating}</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <Download size={14} className="text-info me-1" />
                      <small>{formatNumber(game.downloads)}</small>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex align-items-center justify-content-center">
                      <Users size={14} className="text-success me-1" />
                      <small>{formatNumber(game.players)}</small>
                    </div>
                  </div>
                </div>
                
                <div className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm flex-fill">
                    <Zap size={14} className="me-1" />
                    Jogar
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <Heart size={14} />
                  </button>
                  <button className="btn btn-outline-secondary btn-sm">
                    <Share2 size={14} />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-5">
          <Gamepad2 size={48} className="text-muted mb-3" />
          <h4 className="text-muted">Nenhum jogo encontrado</h4>
          <p className="text-muted">Tente ajustar os filtros de busca.</p>
        </div>
      )}
    </Layout>
  );
};

export default GamesPage;

