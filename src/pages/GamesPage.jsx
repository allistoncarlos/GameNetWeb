import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { Search, ChevronLeft, ChevronRight, Gamepad2, Image } from 'lucide-react';

const GamesPage = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalGames, setTotalGames] = useState(0);
  const pageSize = 21;

  const fetchGames = async (search = '', page = 0) => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('Token de autenticação não encontrado');
      }

      const params = new URLSearchParams();
      if (search) params.append('search', search);
      params.append('page', page.toString());
      params.append('pageSize', pageSize.toString());

      const response = await fetch(`https://gamenet.azurewebsites.net/api/userGame?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      const gamesData = Array.isArray(data.data.result) ? data.data.result : [];
      
      setGames(gamesData);
      setTotalGames(data.data.totalCount || 0);
      setTotalPages(Math.ceil((data.data.totalCount || 0) / pageSize));
    } catch (err) {
      setError(err.message);
      console.error('Erro ao buscar jogos:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGames(searchTerm, currentPage);
  }, [currentPage]);

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(0);
    fetchGames(searchTerm, 0);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  if (loading && games.length === 0) {
    return (
      <Layout title="Games" subtitle="Game Library">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout title="Games" subtitle="Game Library">
        <div className="empty">
          <div className="empty-img">
            <Gamepad2 size={48} className="text-muted" />
          </div>
          <p className="empty-title">Error loading games</p>
          <p className="empty-subtitle text-muted">{error}</p>
          <div className="empty-action">
            <button className="btn btn-primary" onClick={() => fetchGames(searchTerm, currentPage)}>
              Try again
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Games" subtitle="Game Library">
      <div className="container-xl">
        {/* Search bar */}
        <div className="row mb-4">
          <div className="col-12">
            <form onSubmit={handleSearch}>
              <div className="input-group input-group-lg">
                <span className="input-group-text">
                  <Search size={20} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search games by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  Search
                </button>
              </div>
            </form>
            {searchTerm && (
              <div className="mt-2">
                <small className="text-muted">
                  {totalGames} games found for "{searchTerm}"
                </small>
              </div>
            )}
          </div>
        </div>

        {/* Games grid */}
        {games.length === 0 ? (
          <div className="empty">
            <div className="empty-img">
              <Gamepad2 size={48} className="text-muted" />
            </div>
            <p className="empty-title">No games found</p>
            <p className="empty-subtitle text-muted">
              {searchTerm ? `No games match "${searchTerm}"` : 'Your game library is empty'}
            </p>
          </div>
        ) : (
          <>
            <div className="row row-cards">
              {games.map((game, index) => (
                <div key={game.id || index} className="col-6 col-sm-4 col-md-3 col-lg-2">
                  <div className="card card-sm">
                    <div className="card-img-top" style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                      <img
                        src={game.gameCoverURL}
                        alt={game.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: '4px 4px 0 0'
                        }}
                        onError={handleImageError}
                      />
                      <div 
                        className="d-none justify-content-center align-items-center bg-light"
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          borderRadius: '4px 4px 0 0'
                        }}
                      >
                        
                      </div>
                    </div>
                    <div className="card-body p-2">
                      <h3 className="card-title mb-0" style={{ fontSize: '0.875rem', lineHeight: '1.2' }}>
                        {game.name}
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="d-flex justify-content-center align-items-center mt-4">
                <nav aria-label="Games pagination">
                  <ul className="pagination pagination-sm">
                    <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 0}
                      >
                        <ChevronLeft size={16} />
                        Previous
                      </button>
                    </li>
                    
                    {/* Page numbers */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i;
                      } else if (currentPage < 3) {
                        pageNum = i;
                      } else if (currentPage > totalPages - 3) {
                        pageNum = totalPages - 5 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }
                      
                      return (
                        <li key={pageNum} className={`page-item ${currentPage === pageNum ? 'active' : ''}`}>
                          <button 
                            className="page-link" 
                            onClick={() => handlePageChange(pageNum)}
                          >
                            {pageNum + 1}
                          </button>
                        </li>
                      );
                    })}
                    
                    <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                      <button 
                        className="page-link" 
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages - 1}
                      >
                        Next
                        <ChevronRight size={16} />
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            )}

            {/* Stats */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <div className="row text-center">
                      <div className="col-6 col-sm-3">
                        <div className="mb-2">
                          <span className="h3 text-primary">{totalGames}</span>
                        </div>
                        <div className="text-muted">Total Games</div>
                      </div>
                      <div className="col-6 col-sm-3">
                        <div className="mb-2">
                          <span className="h3 text-success">{games.length}</span>
                        </div>
                        <div className="text-muted">This Page</div>
                      </div>
                      <div className="col-6 col-sm-3">
                        <div className="mb-2">
                          <span className="h3 text-info">{currentPage + 1}</span>
                        </div>
                        <div className="text-muted">Current Page</div>
                      </div>
                      <div className="col-6 col-sm-3">
                        <div className="mb-2">
                          <span className="h3 text-warning">{totalPages}</span>
                        </div>
                        <div className="text-muted">Total Pages</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default GamesPage;

