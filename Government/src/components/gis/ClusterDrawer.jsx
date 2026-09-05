import React from 'react';
import { 
  X, 
  AlertTriangle, 
  Users, 
  Send, 
  ShieldCheck, 
  Radio, 
  MapPin, 
  FileText,
  Activity
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function ClusterDrawer({ point, onClose, onAction }) {
  if (!point) return null;

  return (
    <div className="cluster-drawer">
      <div className="drawer-header">
        <div className="drawer-header-left">
          <span className="drawer-mono-tag">
            {point.type === 'outbreak' ? `INCIDENT ID: ${point.id}` : `FACILITY: ${point.type?.toUpperCase()}`}
          </span>
          <h3 className="drawer-title">{point.location || point.name}</h3>
          <span className="drawer-sub">
            <MapPin size={12} />
            <span>Block: {point.block}, District: {point.district || 'Erode'}</span>
          </span>
        </div>
        <button 
          className="drawer-close-btn" 
          onClick={onClose}
          aria-label="Close cluster detail drawer"
        >
          <X size={16} />
        </button>
      </div>

      <div className="drawer-body">
        {point.type === 'outbreak' ? (
          <>
            {/* Risk Banner */}
            <div className={`risk-banner status-${point.riskLevel?.toLowerCase()}`}>
              <div className="risk-banner-head">
                <span className="risk-title">THREAT LEVEL</span>
                <Badge variant={point.riskLevel}>{point.riskLevel}</Badge>
              </div>
              <div className="risk-score-display">
                <span className="score-num font-mono">{point.riskScore}</span>
                <span className="score-denom">/ 100</span>
                <span className="score-tag font-mono">EPIZOOTIC INDEX</span>
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="drawer-metrics-grid">
              <div className="drawer-metric">
                <span className="m-label">DISEASE</span>
                <span className="m-val text-critical">{point.disease}</span>
              </div>
              <div className="drawer-metric">
                <span className="m-label">SPECIES</span>
                <span className="m-val">{point.species}</span>
              </div>
              <div className="drawer-metric">
                <span className="m-label">AFFECTED HEAD</span>
                <span className="m-val tabular-nums font-mono">{point.animalsAffected} Animals</span>
              </div>
              <div className="drawer-metric">
                <span className="m-label">MORTALITY</span>
                <span className="m-val tabular-nums font-mono">{point.mortality} Deaths</span>
              </div>
              <div className="drawer-metric">
                <span className="m-label">CONTAINMENT BUFFER</span>
                <span className="m-val font-mono">{point.quarantineRadiusKm} KM RADIUS</span>
              </div>
              <div className="drawer-metric">
                <span className="m-label">STATUS</span>
                <span className="m-val font-mono">{point.status}</span>
              </div>
            </div>

            {/* Clinical Symptoms */}
            {point.symptoms && (
              <div className="drawer-section">
                <span className="section-label">CLINICAL SYNDROME:</span>
                <p className="symptoms-desc">{point.symptoms}</p>
              </div>
            )}

            {/* Assigned Veterinary Team */}
            <div className="drawer-section">
              <span className="section-label">ASSIGNED RESPONSE TEAM:</span>
              <div className="team-card">
                <Users size={16} className="team-icon" />
                <div className="team-meta">
                  <span className="team-name">{point.assignedTeam}</span>
                  <span className="team-sub">Dispatched with PPE, cold-chain FMD vaccines & Vacutainers</span>
                </div>
              </div>
            </div>

            {/* Direct Operational Actions */}
            <div className="drawer-actions">
              <span className="actions-header">DIRECT COMMAND ACTIONS</span>
              <div className="actions-grid">
                <button 
                  className="btn btn-primary btn-sm"
                  onClick={() => onAction('assign_team', point)}
                >
                  <Users size={13} />
                  <span>Assign Extra Unit</span>
                </button>
                <button 
                  className="btn btn-critical btn-sm"
                  onClick={() => onAction('containment', point)}
                >
                  <ShieldCheck size={13} />
                  <span>Order Containment</span>
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onAction('send_alert', point)}
                >
                  <Radio size={13} />
                  <span>Dispatch Advisory</span>
                </button>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => onAction('view_case', point)}
                >
                  <FileText size={13} />
                  <span>Full Case Dossier</span>
                </button>
              </div>
            </div>
          </>
        ) : point.type === 'clinic' ? (
          <div className="facility-details">
            <Badge variant="info">VETERINARY MEDICAL FACILITY</Badge>
            <div className="facility-grid">
              <div className="drawer-metric">
                <span className="m-label">STATION DOCTORS</span>
                <span className="m-val">{point.doctors} Veterinary Surgeons</span>
              </div>
              <div className="drawer-metric">
                <span className="m-label">INPATIENT PENS</span>
                <span className="m-val">{point.beds} Isolation Pens</span>
              </div>
              <div className="drawer-metric">
                <span className="m-label">AMBULANCE</span>
                <span className="m-val text-healthy">{point.ambulanceAvailable ? 'Unit Active (24x7)' : 'Depleted'}</span>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-sm mt-4"
              onClick={() => onAction('deploy_resources', point)}
            >
              Request Supply Requisition
            </button>
          </div>
        ) : point.type === 'lab' ? (
          <div className="facility-details">
            <Badge variant="warning">{point.status}</Badge>
            <div className="facility-grid">
              <div className="drawer-metric">
                <span className="m-label">DAILY CAPACITY</span>
                <span className="m-val">{point.capacityDaily} Samples / Day</span>
              </div>
              <div className="drawer-metric">
                <span className="m-label">TURNAROUND</span>
                <span className="m-val">{point.turnaroundHours} Hours avg.</span>
              </div>
            </div>
            <button 
              className="btn btn-primary btn-sm mt-4"
              onClick={() => onAction('view_lab', point)}
            >
              Open Diagnostic Sample Queue
            </button>
          </div>
        ) : (
          <div className="facility-details">
            <Badge variant="warning">METEOROLOGICAL VECTOR ANOMALY</Badge>
            <p className="symptoms-desc mt-2">{point.riskFactor}</p>
            <div className="facility-grid mt-2">
              <div className="drawer-metric">
                <span className="m-label">PRECIPITATION</span>
                <span className="m-val text-warning">{point.rainfallAnomaly}</span>
              </div>
              <div className="drawer-metric">
                <span className="m-label">HUMIDITY</span>
                <span className="m-val">{point.humidity}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .cluster-drawer {
          position: absolute;
          top: 0;
          right: 0;
          bottom: 0;
          width: 360px;
          background: var(--bg-surface);
          border-left: 1px solid var(--border-strong);
          box-shadow: var(--shadow-lg);
          z-index: 600;
          display: flex;
          flex-direction: column;
          animation: slide-drawer 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes slide-drawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .drawer-header {
          padding: 12px 16px;
          background-color: var(--bg-surface-elevated);
          border-bottom: 1px solid var(--border-subtle);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .drawer-mono-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--govt-forest);
          letter-spacing: 0.05em;
          display: block;
        }

        .drawer-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--text-primary);
          margin: 2px 0;
        }

        .drawer-sub {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          color: var(--text-muted);
        }

        .drawer-close-btn {
          color: var(--text-muted);
          padding: 4px;
          border-radius: 3px;
        }
        .drawer-close-btn:hover {
          color: var(--text-primary);
          background-color: var(--bg-surface-subtle);
        }

        .drawer-body {
          padding: 14px 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .risk-banner {
          padding: 10px 12px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
          background-color: #FAF9F5;
        }

        .risk-banner.status-critical {
          border-color: var(--status-critical-border);
          background-color: var(--status-critical-bg);
        }

        .risk-banner.status-high {
          border-color: var(--status-warning-border);
          background-color: var(--status-warning-bg);
        }

        .risk-banner-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .risk-title {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .risk-score-display {
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .score-num {
          font-size: 28px;
          font-weight: 700;
          color: var(--status-critical);
          line-height: 1;
        }

        .score-denom {
          font-size: 14px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .score-tag {
          font-size: 9.5px;
          font-weight: 700;
          color: var(--text-muted);
          margin-left: auto;
        }

        .drawer-metrics-grid, .facility-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8px;
        }

        .drawer-metric {
          padding: 8px 10px;
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 3px;
        }

        .m-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 9.5px;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .m-val {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .text-critical { color: var(--status-critical); }
        .text-warning { color: var(--status-warning); }
        .text-healthy { color: var(--status-normal); }

        .drawer-section {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .section-label {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .symptoms-desc {
          font-size: 11.5px;
          color: var(--text-secondary);
          background-color: var(--bg-surface-elevated);
          padding: 8px 10px;
          border-radius: 3px;
          border: 1px solid var(--border-subtle);
          line-height: 1.4;
        }

        .team-card {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 8px 10px;
          border-radius: 3px;
        }

        .team-icon {
          color: var(--govt-forest);
          flex-shrink: 0;
          margin-top: 2px;
        }

        .team-name {
          display: block;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .team-sub {
          display: block;
          font-size: 10.5px;
          color: var(--text-muted);
          line-height: 1.3;
        }

        .drawer-actions {
          margin-top: auto;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
        }

        .actions-header {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 8px;
        }

        .actions-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
        }

        .mt-2 { margin-top: 8px; }
        .mt-4 { margin-top: 12px; }

        @media (max-width: 640px) {
          .cluster-drawer {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
