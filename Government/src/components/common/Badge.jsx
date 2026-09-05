import React from 'react';

export function Badge({ variant = 'neutral', children, className = '', showDot = true }) {
  let badgeClass = 'badge-neutral';
  let dotClass = 'info';

  switch (variant?.toLowerCase()) {
    case 'critical':
    case 'danger':
    case 'red':
      badgeClass = 'badge-critical';
      dotClass = 'critical';
      break;
    case 'warning':
    case 'amber':
      badgeClass = 'badge-warning';
      dotClass = 'warning';
      break;
    case 'normal':
    case 'success':
    case 'healthy':
    case 'green':
      badgeClass = 'badge-normal';
      dotClass = 'normal';
      break;
    case 'info':
    case 'blue':
      badgeClass = 'badge-info';
      dotClass = 'info';
      break;
    default:
      badgeClass = 'badge-neutral';
      dotClass = 'info';
  }

  return (
    <span className={`badge ${badgeClass} ${className}`}>
      {showDot && <span className={`status-dot ${dotClass}`} />}
      {children}
    </span>
  );
}
