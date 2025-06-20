import React from 'react';
import { Menu, Search, Bell, User, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Navbar = ({ onMenuClick }) => {
  return (
    <header className="navbar navbar-expand-md d-print-none">
      <div className="container-xl">
        <button
          className="navbar-toggler"
          type="button"
          onClick={onMenuClick}
          aria-label="Toggle navigation"
        >
          <Menu className="navbar-toggler-icon" size={20} />
        </button>
        
        <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
          <a href="/" className="text-decoration-none">
            <img src="/logo.svg" width="110" height="32" alt="Tabler" className="navbar-brand-image" />
            <span className="text-primary fw-bold">Dashboard</span>
          </a>
        </h1>
        
        <div className="navbar-nav flex-row order-md-last">
          <div className="nav-item d-none d-md-flex me-3">
            <div className="btn-list">
              <a href="#" className="btn btn-outline-primary">
                <Search size={16} className="me-1" />
                Buscar
              </a>
            </div>
          </div>
          
          <div className="nav-item me-3">
            <ThemeToggle />
          </div>
          
          <div className="nav-item dropdown">
            <a href="#" className="nav-link d-flex lh-1 text-reset p-0" data-bs-toggle="dropdown">
              <Bell size={20} />
              <span className="badge bg-red position-absolute top-0 start-100 translate-middle rounded-pill">3</span>
            </a>
          </div>
          
          <div className="nav-item dropdown">
            <a href="#" className="nav-link d-flex lh-1 text-reset p-0 ms-3" data-bs-toggle="dropdown">
              <span className="avatar avatar-sm" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face)'}}>
              </span>
              <div className="d-none d-xl-block ps-2">
                <div>Usuário</div>
                <div className="mt-1 small text-muted">Admin</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

