import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Badge } from './Badge';

export function MetricCard({ 
  label, 
  value, 
  trend, 
  trendPositive, 
  comparison, 
  status = 'NORMAL',
  isProminent = false,
  variant = 'default' 
}) {
  return (
    <div className={`situation-card ${isProminent ? 'prominent' : ''} status-${status.toLowerCase()}`}>
      <div className="card-top">
        <span className="card-system-label">{label}</span>
        <Badge variant={status} showDot={true}>
          {status}
        </Badge>
      </div>

      <div className="card-mid">
        <div className="card-metric-value tabular-nums">{value}</div>
        {trend && (
          <div className={`card-trend ${trendPositive ? 'trend-good' : 'trend-warn'}`}>
            {trend.includes('↑') ? (
              <TrendingUp size={13} />
            ) : trend.includes('↓') || trend.includes('-') ? (
              <TrendingDown size={13} />
            ) : (
              <Minus size={13} />
            )}
            <span className="trend-text">{trend}</span>
          </div>
        )}
      </div>

      {comparison && (
        <div className="card-bottom">
          <span className="comparison-text">{comparison}</span>
        </div>
      )}

      <style>{`
        .situation-card {
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          position: relative;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }

        .situation-card:hover {
          border-color: var(--border-strong);
          box-shadow: var(--shadow-sm);
        }

        .situation-card.prominent {
          background-color: #FAF9F5;
          border-left: 3px solid var(--status-critical);
        }

        .situation-card.status-critical {
          border-top: 2px solid var(--status-critical);
        }

        .situation-card.status-warning {
          border-top: 2px solid var(--status-warning);
        }

        .situation-card.status-normal {
          border-top: 2px solid var(--govt-forest);
        }

        .card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .card-system-label {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .card-mid {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 8px;
        }

        .card-metric-value {
          font-family: var(--font-heading);
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
        }

        .situation-card.prominent .card-metric-value {
          font-size: 28px;
          color: var(--status-critical);
        }

        .card-trend {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11.5px;
          font-weight: 600;
          font-family: var(--font-mono);
        }

        .trend-good {
          color: var(--status-normal);
        }

        .trend-warn {
          color: var(--status-critical);
        }

        .card-bottom {
          padding-top: 6px;
          border-top: 1px dashed var(--border-subtle);
        }

        .comparison-text {
          font-size: 11px;
          color: var(--text-muted);
          line-height: 1.3;
        }
      `}</style>
    </div>
  );
}
