import React, { useState } from 'react';
import { 
  Radar, 
  Smartphone, 
  Building2, 
  ShieldCheck, 
  CloudRain, 
  Clock, 
  Filter, 
  AlertTriangle,
  ArrowRight,
  Radio
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function SurveillanceView({ feed, onAction }) {
  const [filterType, setFilterType] = useState('ALL');

  const filteredFeed = feed.filter(item => {
    if (filterType === 'ALL') return true;
    return item.type === filterType;
  });

  return (
    <div className="surveillance-view">
      {/* Top Header */}
      <div className="surveillance-top-bar">
        <div>
          <span className="system-label">CONTINUOUS FIELD TELEMETRY</span>
          <h2 className="page-title">Syndromic Field Surveillance & Early Detection Feed</h2>
          <p className="page-subtitle">
            Ingesting citizen farmer reports, veterinary clinic admissions, transit checkpost logs, and IMD meteorology.
          </p>
        </div>

        <div className="surveillance-filter-strip">
          {['ALL', 'FARMER_REPORT', 'VET_CLINIC', 'SHANDY_CHECKPOST', 'LAB_UPDATE', 'WEATHER_WARNING'].map(ft => (
            <button
              key={ft}
              className={`feed-filter-btn ${filterType === ft ? 'active' : ''}`}
              onClick={() => setFilterType(ft)}
            >
              {ft === 'ALL' ? 'All Telemetry' : ft.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Telemetry Stream Panel */}
      <div className="panel stream-panel">
        <div className="panel-header">
          <div>
            <span className="system-label">INGESTION PIPELINE</span>
            <h3 className="section-title">REAL-TIME SURVEILLANCE TELEMETRY FEED</h3>
          </div>
          <span className="live-tag font-mono">
            <span className="status-dot critical" />
            <span>SOCKET LIVE: 100Hz</span>
          </span>
        </div>

        <div className="feed-list">
          {filteredFeed.map(item => (
            <div key={item.id} className={`feed-item ${item.status.toLowerCase()}`}>
              <div className="feed-icon-box">
                {item.type === 'FARMER_REPORT' && <Smartphone size={16} color="var(--status-info)" />}
                {item.type === 'VET_CLINIC' && <Building2 size={16} color="var(--govt-forest)" />}
                {item.type === 'SHANDY_CHECKPOST' && <ShieldCheck size={16} color="var(--status-warning)" />}
                {item.type === 'LAB_UPDATE' && <AlertTriangle size={16} color="var(--status-critical)" />}
                {item.type === 'WEATHER_WARNING' && <CloudRain size={16} color="#D97706" />}
              </div>

              <div className="feed-content">
                <div className="feed-meta-row">
                  <span className="feed-id font-mono">{item.id}</span>
                  <span className="feed-loc font-bold">{item.village}</span>
                  <span className="feed-type font-mono">{item.type.replace('_', ' ')}</span>
                  <span className="feed-time font-mono">{item.time}</span>
                  <div className="feed-badge-wrap">
                    <Badge 
                      variant={
                        item.status === 'ESCALATED' || item.status === 'CONFIRMED' ? 'critical' :
                        item.status === 'TEAM_ASSIGNED' ? 'warning' : 'normal'
                      }
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>

                <p className="feed-text">{item.text}</p>
              </div>

              <div className="feed-actions">
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onAction('triage_feed', item)}
                >
                  Triage Incident
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .surveillance-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .surveillance-top-bar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .surveillance-filter-strip {
          display: flex;
          gap: 4px;
          flex-wrap: wrap;
        }

        .feed-filter-btn {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 3px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-secondary);
        }
        .feed-filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-strong);
        }
        .feed-filter-btn.active {
          background: var(--govt-forest);
          color: #FFFFFF;
          border-color: var(--govt-forest-dark);
        }

        .live-tag {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .feed-list {
          display: flex;
          flex-direction: column;
        }

        .feed-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 18px;
          border-bottom: 1px solid var(--border-subtle);
          transition: background 0.15s;
        }
        .feed-item:hover {
          background-color: #FAF9F5;
        }

        .feed-item.escalated, .feed-item.confirmed {
          border-left: 3px solid var(--status-critical);
          background-color: rgba(254, 242, 242, 0.25);
        }

        .feed-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .feed-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .feed-meta-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11.5px;
          flex-wrap: wrap;
        }

        .feed-id {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .feed-loc {
          color: var(--text-primary);
        }

        .feed-type {
          font-size: 10px;
          color: var(--govt-forest);
          background: var(--govt-forest-tint);
          padding: 1px 5px;
          border-radius: 2px;
          font-weight: 700;
        }

        .feed-time {
          color: var(--text-muted);
          font-size: 10.5px;
        }

        .feed-badge-wrap {
          margin-left: auto;
        }

        .feed-text {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .feed-actions {
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .feed-item {
            flex-direction: column;
          }
          .feed-badge-wrap {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
}
