import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Gamepad2, 
  Monitor, 
  List,
  ChevronRight,
  LogOut
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const NavigationMenu = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'System overview'
    },
    {
      path: '/games',
      label: 'Games',
      icon: Gamepad2,
      description: 'Manage games'
    },
    {
      path: '/platform',
      label: 'Platform',
      icon: Monitor,
      description: 'Platform settings'
    },
    {
      path: '/lists',
      label: 'Lists',
      icon: List,
      description: 'Manage lists'
    }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    window.location.reload();
  };

  return (
    <>
      {/* Header principal */}
      <header className="navbar navbar-expand-md d-print-none">
        <div className="container-xl">
          <h1 className="navbar-brand navbar-brand-autodark d-none-navbar-horizontal pe-0 pe-md-3">
            <a href="/" className="text-decoration-none">
              <span className="text-primary fw-bold">GameNet Platform</span>
            </a>
          </h1>
          
          <div className="navbar-nav flex-row order-md-last">
            <div className="nav-item me-3">
              <ThemeToggle />
            </div>
            
            <div className="nav-item">
              <button
                onClick={handleLogout}
                className="btn btn-outline-danger btn-sm d-flex align-items-center"
                title="Logout"
              >
                <LogOut size={16} className="me-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menu de navegação */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="container-xl">
          <div className="row">
            <div className="col-12">
              <div className="navbar-nav flex-row">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`nav-link d-flex align-items-center px-3 py-2 me-2 rounded-md transition-colors ${
                        active
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800'
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                      }`}
                      title={item.description}
                    >
                      <Icon size={18} className="me-2" />
                      <span className="fw-medium">{item.label}</span>
                      {active && (
                        <ChevronRight size={14} className="ms-auto opacity-60" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationMenu;

