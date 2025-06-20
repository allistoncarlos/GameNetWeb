import React, { useState } from 'react';
import Navbar from './Navbar';

const Layout = ({ children, title, subtitle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="page">
      <Navbar onMenuClick={toggleSidebar} />
      
      <div className="page-wrapper">
        {(title || subtitle) && (
          <div className="page-header d-print-none">
            <div className="container-xl">
              <div className="row g-2 align-items-center">
                <div className="col">
                  <div className="page-pretitle">
                    {subtitle}
                  </div>
                  <h2 className="page-title">
                    {title}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div className="page-body">
          <div className="container-xl">
            {children}
          </div>
        </div>
        
        <footer className="footer footer-transparent d-print-none">
          <div className="container-xl">
            <div className="row text-center align-items-center flex-row-reverse">
              <div className="col-lg-auto ms-lg-auto">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item">
                    <a href="#" className="link-secondary">Documentação</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="link-secondary">Licença</a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="link-secondary">Código Fonte</a>
                  </li>
                </ul>
              </div>
              <div className="col-12 col-lg-auto mt-3 mt-lg-0">
                <ul className="list-inline list-inline-dots mb-0">
                  <li className="list-inline-item">
                    Copyright © 2024
                    <a href="#" className="link-secondary">Dashboard Tabler</a>.
                    Todos os direitos reservados.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Layout;

