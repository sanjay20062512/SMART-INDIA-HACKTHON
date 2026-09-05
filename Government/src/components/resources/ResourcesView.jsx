import React, { useState } from 'react';
import { 
  Boxes, 
  Users, 
  Truck, 
  Syringe, 
  TestTube2, 
  ShieldAlert, 
  Phone, 
  MapPin, 
  Send, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export function ResourcesView({ resources, teams }) {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [deployModal, setDeployModal] = useState(false);
  const [deployLocation, setDeployLocation] = useState('Perundurai East');
  const [deployDuty, setDeployDuty] = useState('Outbreak Ring Vaccination');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleDeploySubmit = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setDeployModal(false);
    }, 1200);
  };

  return (
    <div className="resources-view">
      {/* Top Title Bar */}
      <div className="resources-top-bar">
        <div>
          <span className="system-label">LOGISTICAL READINESS & FIELD DEPLOYMENT</span>
          <h2 className="page-title">Veterinary Emergency Response Resources & Mobile Fleet</h2>
          <p className="page-subtitle">
            Real-time requisition, personnel dispatch, diagnostic inventory, and cold-chain monitoring.
          </p>
        </div>

        <div className="resources-actions">
          <button 
            className="btn btn-primary"
            onClick={() => setDeployModal(true)}
          >
            <Send size={13} />
            <span>DEPLOY RAPID RESPONSE UNIT</span>
          </button>
        </div>
      </div>

      {/* Resource Inventory Grid */}
      <div className="resource-inventory-grid">
        {/* Veterinarians */}
        <div className="panel res-card">
          <div className="res-card-head">
            <Users size={18} color="var(--govt-forest)" />
            <span className="res-title font-mono">VETERINARIANS</span>
          </div>
          <div className="res-metric-row">
            <span className="res-main font-mono tabular-nums">{resources.veterinarians.deployed}</span>
            <span className="res-total font-mono">/ {resources.veterinarians.total} ACTIVE</span>
          </div>
          <div className="res-sub-detail font-mono">
            <span className="text-healthy">{resources.veterinarians.available} Available on Standby</span>
          </div>
        </div>

        {/* Field Livestock Inspectors */}
        <div className="panel res-card">
          <div className="res-card-head">
            <Users size={18} color="var(--govt-navy)" />
            <span className="res-title font-mono">FIELD INSPECTORS</span>
          </div>
          <div className="res-metric-row">
            <span className="res-main font-mono tabular-nums">{resources.fieldWorkers.deployed}</span>
            <span className="res-total font-mono">/ {resources.fieldWorkers.total} DEPLOYED</span>
          </div>
          <div className="res-sub-detail font-mono">
            <span>{resources.fieldWorkers.available} In Regional Dispensaries</span>
          </div>
        </div>

        {/* Vaccine Stock */}
        <div className="panel res-card">
          <div className="res-card-head">
            <Syringe size={18} color="var(--status-normal)" />
            <span className="res-title font-mono">VACCINE STOCK (DOSES)</span>
          </div>
          <div className="res-metric-row">
            <span className="res-main font-mono tabular-nums">{resources.vaccineDoses.stock.toLocaleString('en-IN')}</span>
            <span className="res-total font-mono">DOSES</span>
          </div>
          <div className="res-sub-detail font-mono">
            <span>{resources.vaccineDoses.reserved} Reserved • {resources.vaccineDoses.inTransit} In-Transit</span>
          </div>
        </div>

        {/* Sample Collection Kits */}
        <div className="panel res-card">
          <div className="res-card-head">
            <TestTube2 size={18} color="var(--status-warning)" />
            <span className="res-title font-mono">DIAGNOSTIC TEST KITS</span>
          </div>
          <div className="res-metric-row">
            <span className="res-main font-mono tabular-nums">{resources.sampleKits.inStock}</span>
            <span className="res-total font-mono">/ {resources.sampleKits.total} KITS</span>
          </div>
          <div className="res-sub-detail font-mono">
            <span>Vacutainers & Viral Transport Medium</span>
          </div>
        </div>

        {/* Mobile Ambulance Units */}
        <div className="panel res-card">
          <div className="res-card-head">
            <Truck size={18} color="var(--govt-forest)" />
            <span className="res-title font-mono">MOBILE UNITS</span>
          </div>
          <div className="res-metric-row">
            <span className="res-main font-mono tabular-nums">{resources.transportUnits.active}</span>
            <span className="res-total font-mono">/ {resources.transportUnits.total} FLEET</span>
          </div>
          <div className="res-sub-detail font-mono">
            <span className="text-healthy">{resources.transportUnits.standby} 24x7 Ambulances Ready</span>
          </div>
        </div>

        {/* Emergency Response Teams */}
        <div className="panel res-card prominent">
          <div className="res-card-head">
            <ShieldAlert size={18} color="var(--status-critical)" />
            <span className="res-title font-mono">RAPID RESPONSE TEAMS</span>
          </div>
          <div className="res-metric-row">
            <span className="res-main font-mono tabular-nums text-critical">{resources.emergencyTeams.active}</span>
            <span className="res-total font-mono">/ {resources.emergencyTeams.total} DEPLOYED</span>
          </div>
          <div className="res-sub-detail font-mono">
            <span>Level 3 Epizootic Quorum</span>
          </div>
        </div>
      </div>

      {/* Veterinary Teams Monitoring Board */}
      <div className="panel teams-board-panel">
        <div className="panel-header">
          <div>
            <span className="system-label">FIELD EPIDEMIOLOGY CORPS</span>
            <h3 className="section-title">LIVE VETERINARY TEAMS DEPLOYMENT BOARD</h3>
          </div>
          <span className="team-count-tag font-mono">5 REGISTERED TEAMS</span>
        </div>

        <div className="teams-grid">
          {teams.map(team => (
            <div key={team.id} className="team-status-card">
              <div className="team-head">
                <div className="team-name-group">
                  <span className="team-id font-mono">{team.id}</span>
                  <h4 className="team-title">{team.name}</h4>
                </div>
                <Badge 
                  variant={
                    team.status === 'INVESTIGATING' ? 'critical' :
                    team.status === 'VACCINATION' ? 'warning' :
                    team.status === 'QUARANTINE' ? 'critical' :
                    team.status === 'AVAILABLE' ? 'normal' : 'info'
                  }
                >
                  {team.status}
                </Badge>
              </div>

              <div className="team-lead-row">
                <span className="lead-name font-bold">{team.lead}</span>
                <span className="lead-phone font-mono">
                  <Phone size={11} />
                  <span>{team.contact}</span>
                </span>
              </div>

              <div className="team-loc-strip">
                <MapPin size={12} className="loc-pin" />
                <span>Location: <strong>{team.location}</strong></span>
              </div>

              <div className="team-task-box">
                <span className="task-label font-mono">ASSIGNED FIELD ACTIVITY:</span>
                <p className="task-desc">{team.activity}</p>
              </div>

              <div className="team-foot">
                <div className="team-hardware font-mono">
                  <span>VEHICLE: {team.vehicle}</span>
                  <span>STOCK: {team.vaccineStock} Doses</span>
                </div>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => {
                    setSelectedTeam(team);
                    setDeployModal(true);
                  }}
                >
                  Reassign
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reassign / Deploy Unit Modal */}
      <Modal
        isOpen={deployModal}
        onClose={() => setDeployModal(false)}
        title="DEPLOY OR REASSIGN FIELD RESPONSE UNIT"
        systemTag="PERSONNEL REQUISITION"
        maxWidth="560px"
      >
        {isSuccess ? (
          <div className="deploy-success-view">
            <CheckCircle2 size={40} color="var(--govt-forest)" />
            <h4 className="ds-title">TEAM DISPATCH ORDER TRANSMITTED</h4>
            <p className="ds-sub">
              Field unit re-routed to <strong>{deployLocation}</strong> for <strong>{deployDuty}</strong>. 
              SMS dispatch notification pushed to team lead.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDeploySubmit} className="deploy-form">
            <div className="form-group">
              <label className="form-label">SELECT OPERATIONAL TEAM</label>
              <select className="form-select w-full" defaultValue={selectedTeam?.id || 'TM-01'}>
                {teams.map(t => (
                  <option key={t.id} value={t.id}>{t.name} — {t.lead} ({t.status})</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">TARGET INCIDENT LOCATION</label>
              <input 
                type="text" 
                value={deployLocation}
                onChange={(e) => setDeployLocation(e.target.value)}
                className="form-input w-full"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">TASK DIRECTIVE</label>
              <select 
                value={deployDuty}
                onChange={(e) => setDeployDuty(e.target.value)}
                className="form-select w-full"
              >
                <option value="Outbreak Ring Vaccination">Emergency Ring Vaccination (5km radius)</option>
                <option value="Tissue Biopsy & Diagnostic Sampling">Diagnostic Sampling (Vacutainer / Epithelial swab)</option>
                <option value="Carcass Incineration & Biosecurity">Deep Burial & Quicklime Disinfection</option>
                <option value="Syndromic Door-to-Door Census">Syndromic Household Surveillance Census</option>
              </select>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setDeployModal(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                <Send size={13} />
                <span>CONFIRM TEAM MOBILIZATION</span>
              </button>
            </div>
          </form>
        )}
      </Modal>

      <style>{`
        .resources-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .resources-top-bar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .resource-inventory-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
        }

        .res-card {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .res-card.prominent {
          background: #FAF9F5;
          border-left: 3px solid var(--status-critical);
        }

        .res-card-head {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }

        .res-title {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .res-metric-row {
          display: flex;
          align-items: baseline;
          gap: 6px;
          margin-bottom: 6px;
        }

        .res-main {
          font-size: 24px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .res-total {
          font-size: 11px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .res-sub-detail {
          font-size: 10.5px;
          color: var(--text-secondary);
          border-top: 1px dashed var(--border-subtle);
          padding-top: 6px;
        }

        /* Teams Board */
        .team-count-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .teams-grid {
          padding: 16px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .team-status-card {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 14px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.15s;
        }
        .team-status-card:hover {
          border-color: var(--border-strong);
        }

        .team-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .team-name-group {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .team-id {
          font-size: 10px;
          font-weight: 700;
          background: var(--bg-surface);
          border: 1px solid var(--border-subtle);
          padding: 2px 5px;
          border-radius: 2px;
          color: var(--text-muted);
        }

        .team-title {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .team-lead-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 12px;
        }

        .lead-phone {
          display: flex;
          align-items: center;
          gap: 4px;
          color: var(--text-muted);
          font-size: 11px;
        }

        .team-loc-strip {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11.5px;
          color: var(--text-secondary);
        }

        .loc-pin {
          color: var(--govt-forest);
        }

        .team-task-box {
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          padding: 8px 10px;
          border-radius: 3px;
        }

        .task-label {
          display: block;
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .task-desc {
          font-size: 11.5px;
          color: var(--text-primary);
          line-height: 1.35;
        }

        .team-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 8px;
          border-top: 1px solid var(--border-subtle);
          font-size: 10px;
        }

        .team-hardware {
          display: flex;
          flex-direction: column;
          color: var(--text-muted);
          line-height: 1.25;
        }

        .deploy-success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px;
          gap: 12px;
        }

        .ds-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--govt-forest);
        }

        .ds-sub {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 1400px) {
          .resource-inventory-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .teams-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .resource-inventory-grid {
            grid-template-columns: 1fr;
          }
          .teams-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
