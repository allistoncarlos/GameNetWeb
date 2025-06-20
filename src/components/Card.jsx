import React from 'react';

const Card = ({ 
  children, 
  title, 
  subtitle, 
  className = '', 
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
  status,
  statusPosition = 'top',
  ribbon,
  ribbonColor = 'red',
  active = false,
  inactive = false,
  borderless = false,
  ...props 
}) => {
  const cardClasses = [
    'card',
    active && 'card-active',
    inactive && 'card-inactive',
    borderless && 'card-borderless',
    className
  ].filter(Boolean).join(' ');

  const statusClasses = `card-status-${statusPosition} bg-${status}`;

  return (
    <div className={cardClasses} {...props}>
      {status && <div className={statusClasses}></div>}
      
      {ribbon && (
        <div className={`ribbon bg-${ribbonColor}`}>
          {ribbon}
        </div>
      )}
      
      {(title || subtitle) && (
        <div className={`card-header ${headerClassName}`}>
          <h3 className="card-title">
            {title}
            {subtitle && <span className="card-subtitle">{subtitle}</span>}
          </h3>
        </div>
      )}
      
      <div className={`card-body ${bodyClassName}`}>
        {children}
      </div>
      
      {footer && (
        <div className={`card-footer ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;

