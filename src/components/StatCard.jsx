import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const StatCard = ({ 
  title, 
  value, 
  change, 
  changeType = 'positive', 
  icon: Icon,
  color = 'primary',
  subtitle 
}) => {
  const changeIcon = changeType === 'positive' ? TrendingUp : TrendingDown;
  const changeColor = changeType === 'positive' ? 'text-green' : 'text-red';
  const ChangeIcon = changeIcon;

  return (
    <div className="card">
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-auto">
            {Icon && (
              <span className={`bg-${color} text-white avatar`}>
                <Icon size={24} />
              </span>
            )}
          </div>
          <div className="col">
            <div className="font-weight-medium">
              {title}
            </div>
            <div className="text-muted">
              {subtitle}
            </div>
          </div>
        </div>
        <div className="d-flex align-items-baseline">
          <div className="h1 mb-0 me-2">{value}</div>
          {change && (
            <div className={`me-auto ${changeColor}`}>
              <span className="d-inline-flex align-items-center lh-1">
                {change}
                <ChangeIcon size={16} className="ms-1" />
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;

