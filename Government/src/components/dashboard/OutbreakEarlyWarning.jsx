import React from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  Users, 
  Radio, 
  FileText, 
  MapPin, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function OutbreakEarlyWarning({ outbreak, onAction }) {
  if (!outbreak) return null;

  return (
    <div className="early-warning-card">
      <div className="warning-banner-top">
        <div className="warning-title-group">
          <div className="warning-icon-box">
            <AlertTriangle size={18} />
          </div>
          <div>
            <span className="warning-sub font-mono">HIGH-PRIORITY INTERVENTION REQUIRED</span>
            <h3 className="warning-headline">EARLY WARNING & OUTBREAK INTELLIGENCE</h3>
          </div>
        </div>
        <div className="warning-status-pill">
          <span className="status-dot critical" />
          <span className="font-mono">{outbreak.status.toUpperCase()}</span>
        </div>
      </div>

      <div className="warning-content-grid">
        {/* Left: Key Epizootic Details */}
        <div className="warning-data-block">
          <div className="loc-badge-row">
            <span className="loc-label">
              <MapPin size={13} />
              <span>VILLAGE: <strong>{outbreak.location}</strong></span>
            </span>
            <span className="bullet-sep">•</span>
            <span>Block: <strong>{outbreak.block}</strong></span>
            <span className="bullet-sep">•</span>
            <span>District: <strong>{outbreak.district}</strong></span>
          </div>

          <div className="epizootic-stats">
            <div className="stat-cell">
              <span className="stat-label font-mono">SUSPECTED PATHOGEN</span>
              <span className="stat-value text-critical">{outbreak.disease}</span>
            </div>
            <div className="stat-cell">
              <span className="stat-label font-mono">SPECIES</span>
              <span className="stat-value">{outbreak.species}</span>
            </div>
            <div className="stat-cell">
              <span className="stat-label font-mono">AFFECTED HEAD</span>
              <span className="stat-value font-mono tabular-nums">{outbreak.animalsAffected} Cattle</span>
            </div>
            <div className="stat-cell">
              <span className="stat-label font-mono">CONFIRMED MORTALITY</span>
              <span className="stat-value font-mono tabular-nums text-critical">{outbreak.mortality} Deaths</span>
            </div>
          </div>

          <div className="symptoms-bar">
            <span className="symptom-tag font-mono">OBSERVED SYMPTOMS:</span>
            <span className="symptom-text">{outbreak.symptoms}</span>
          </div>
        </div>

        {/* Right: Risk Score & Action Matrix */}
        <div className="warning-action-block">
          <div className="risk-score-box">
            <div className="risk-score-num-wrap">
              <span className="risk-score-big font-mono">{outbreak.riskScore}</span>
              <span className="risk-score-sub font-mono">/ 100</span>
            </div>
            <div className="risk-score-text">
              <span className="risk-label-crit">CRITICAL THREAT</span>
              <span className="risk-rec">Ring vaccination & 5km movement freeze recommended</span>
            </div>
          </div>

          <div className="early-warning-actions">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onAction('view_case', outbreak)}
            >
              <FileText size={13} />
              <span>VIEW CASE</span>
            </button>
            <button 
              className="btn btn-primary btn-sm"
              onClick={() => onAction('assign_team', outbreak)}
            >
              <Users size={13} />
              <span>ASSIGN TEAM</span>
            </button>
            <button 
              className="btn btn-critical btn-sm"
              onClick={() => onAction('containment', outbreak)}
            >
              <ShieldAlert size={13} />
              <span>START INVESTIGATION</span>
            </button>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => onAction('send_alert', outbreak)}
            >
              <Radio size={13} />
              <span>SEND ALERT</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .early-warning-card {
          background-color: var(--bg-surface);
          border: 1px solid var(--status-critical-border);
          border-left: 4px solid var(--status-critical);
          border-radius: 4px;
          box-shadow: var(--shadow-sm);
          margin-bottom: 24px;
          overflow: hidden;
        }

        .warning-banner-top {
          background-color: var(--status-critical-bg);
          padding: 10px 18px;
          border-bottom: 1px solid var(--status-critical-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .warning-title-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .warning-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 4px;
          background-color: var(--status-critical);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .warning-sub {
          font-size: 10px;
          font-weight: 700;
          color: var(--status-critical);
          letter-spacing: 0.06em;
          display: block;
        }

        .warning-headline {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 700;
          color: var(--status-critical-text);
          line-height: 1.2;
        }

        .warning-status-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          padding: 3px 10px;
          border-radius: 3px;
          border: 1px solid var(--status-critical-border);
          font-size: 11px;
          font-weight: 700;
          color: var(--status-critical);
        }

        .warning-content-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          padding: 16px 20px;
          gap: 24px;
        }

        .loc-badge-row {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12.5px;
          color: var(--text-secondary);
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .loc-label {
          display: flex;
          align-items: center;
          gap: 5px;
          color: var(--text-primary);
        }

        .bullet-sep {
          color: var(--border-strong);
        }

        .epizootic-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          margin-bottom: 12px;
        }

        .stat-cell {
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 8px 10px;
          border-radius: 3px;
        }

        .stat-label {
          display: block;
          font-size: 9.5px;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 3px;
        }

        .stat-value {
          font-size: 13px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .symptoms-bar {
          background-color: var(--bg-surface-subtle);
          padding: 7px 12px;
          border-radius: 3px;
          font-size: 11.5px;
          display: flex;
          align-items: baseline;
          gap: 8px;
        }

        .symptom-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          flex-shrink: 0;
        }

        .symptom-text {
          color: var(--text-secondary);
          line-height: 1.3;
        }

        /* Right block */
        .warning-action-block {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border-left: 1px solid var(--border-subtle);
          padding-left: 20px;
          gap: 12px;
        }

        .risk-score-box {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #FAF9F5;
          border: 1px solid var(--border-subtle);
          padding: 10px 14px;
          border-radius: 4px;
        }

        .risk-score-num-wrap {
          display: flex;
          align-items: baseline;
          gap: 3px;
        }

        .risk-score-big {
          font-size: 32px;
          font-weight: 700;
          color: var(--status-critical);
          line-height: 1;
        }

        .risk-score-sub {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .risk-score-text {
          display: flex;
          flex-direction: column;
        }

        .risk-label-crit {
          font-family: var(--font-mono);
          font-size: 11.5px;
          font-weight: 700;
          color: var(--status-critical);
        }

        .risk-rec {
          font-size: 11px;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .early-warning-actions {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 8px;
        }

        @media (max-width: 1024px) {
          .warning-content-grid {
            grid-template-columns: 1fr;
          }
          .warning-action-block {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid var(--border-subtle);
            padding-top: 14px;
          }
          .epizootic-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}
