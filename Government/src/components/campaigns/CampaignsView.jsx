import React, { useState } from 'react';
import { 
  Syringe, 
  Plus, 
  Users, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp, 
  Clock, 
  MapPin, 
  Check,
  Send
} from 'lucide-react';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';

export function CampaignsView({ vaccinationData }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [targetBlock, setTargetBlock] = useState('Perundurai');
  const [targetDosage, setTargetDosage] = useState('3500');
  const [assignedTeam, setAssignedTeam] = useState('Team Alpha');
  const [campaignSuccess, setCampaignSuccess] = useState(false);

  const handleCreateCampaign = (e) => {
    e.preventDefault();
    setCampaignSuccess(true);
    setTimeout(() => {
      setCampaignSuccess(false);
      setShowCreateModal(false);
    }, 1200);
  };

  return (
    <div className="campaigns-view">
      {/* Top Title Bar */}
      <div className="campaigns-header-bar">
        <div>
          <span className="system-label">NATIONAL ANIMAL DISEASE CONTROL PROGRAMME (NADCP)</span>
          <h2 className="page-title">Vaccination Intelligence & Preventive Immunization Campaigns</h2>
          <p className="page-subtitle">
            District-wide FMD & Brucellosis ring vaccination and prophylactic booster administration.
          </p>
        </div>

        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={14} />
          <span>CREATE IMMUNIZATION CAMPAIGN</span>
        </button>
      </div>

      {/* Top Metrics Cards Grid */}
      <div className="campaign-kpis-grid">
        <div className="panel kpi-card">
          <span className="kpi-label font-mono">ELIGIBLE LIVESTOCK POPULATION</span>
          <div className="kpi-val tabular-nums font-mono">{vaccinationData.eligibleAnimals.toLocaleString('en-IN')}</div>
          <span className="kpi-sub">Bovine & small ruminant census baseline</span>
        </div>

        <div className="panel kpi-card">
          <span className="kpi-label font-mono">DOSES ADMINISTERED (VACCINATED)</span>
          <div className="kpi-val tabular-nums font-mono text-healthy">{vaccinationData.vaccinated.toLocaleString('en-IN')}</div>
          <span className="kpi-sub">+1,420 doses in past 48 hours</span>
        </div>

        <div className="panel kpi-card">
          <span className="kpi-label font-mono">PENDING BOOSTER DEFICIT</span>
          <div className="kpi-val tabular-nums font-mono text-warning">{vaccinationData.pending.toLocaleString('en-IN')}</div>
          <span className="kpi-sub">Targeted for completion within 14 days</span>
        </div>

        <div className="panel kpi-card prominent">
          <span className="kpi-label font-mono">DISTRICT IMMUNITY COVERAGE</span>
          <div className="kpi-val tabular-nums font-mono">{vaccinationData.coveragePercent}%</div>
          <div className="kpi-target-bar">
            <span className="target-note">Statutory Herd Immunity Target: {vaccinationData.targetPercent}%</span>
            <div className="target-track">
              <div className="target-fill" style={{ width: `${vaccinationData.coveragePercent}%` }} />
              <div className="target-line" style={{ left: `${vaccinationData.targetPercent}%` }} title="Target 90%" />
            </div>
          </div>
        </div>
      </div>

      {/* Block by Block Comparison Table */}
      <div className="panel block-comparison-panel">
        <div className="panel-header">
          <div>
            <span className="system-label">SUB-DISTRICT JURISDICTION BREAKDOWN</span>
            <h3 className="section-title">BLOCK-LEVEL VACCINATION PROGRESSION & COVERAGE</h3>
          </div>
          <span className="font-mono font-bold text-muted text-xs">6 ADMINISTRATIVE BLOCKS</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>BLOCK NAME</th>
                <th>ELIGIBLE HEAD</th>
                <th>VACCINATED</th>
                <th>COVERAGE STATUS</th>
                <th>PROGRESS VISUALIZATION</th>
                <th>STATUS ACTION</th>
              </tr>
            </thead>
            <tbody>
              {vaccinationData.blocks.map(b => (
                <tr key={b.name}>
                  <td className="font-bold">{b.name}</td>
                  <td className="font-mono tabular-nums">{b.eligible.toLocaleString('en-IN')}</td>
                  <td className="font-mono tabular-nums">{b.vaccinated.toLocaleString('en-IN')}</td>
                  <td>
                    <Badge 
                      variant={b.pct >= 90 ? 'normal' : b.pct >= 80 ? 'info' : b.pct >= 75 ? 'warning' : 'critical'}
                    >
                      {b.status}
                    </Badge>
                  </td>
                  <td style={{ minWidth: '220px' }}>
                    <div className="block-progress-wrap">
                      <div className="block-bar-track">
                        <div 
                          className="block-bar-fill" 
                          style={{ 
                            width: `${b.pct}%`,
                            backgroundColor: b.pct >= 90 ? 'var(--govt-forest)' : b.pct >= 80 ? 'var(--status-info)' : 'var(--status-warning)'
                          }}
                        />
                      </div>
                      <span className="block-pct-val font-mono tabular-nums">{b.pct}%</span>
                    </div>
                  </td>
                  <td>
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => {
                        setTargetBlock(b.name);
                        setShowCreateModal(true);
                      }}
                    >
                      Deploy Drive
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Campaign Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="COMMISSION IMMUNIZATION CAMPAIGN"
        systemTag="STATUTORY HEALTH INTERVENTION"
        maxWidth="580px"
      >
        {campaignSuccess ? (
          <div className="campaign-success-view">
            <CheckCircle2 size={40} color="var(--govt-forest)" />
            <h4 className="cs-title">VACCINATION CAMPAIGN LAUNCHED</h4>
            <p className="cs-sub">
              Campaign ID <strong>CMP-2026-ERD-041</strong> issued to <strong>{targetBlock}</strong>. 
              {targetDosage} trivalent doses mobilized under {assignedTeam}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleCreateCampaign} className="campaign-form">
            <div className="form-group">
              <label className="form-label">TARGET JURISDICTION BLOCK</label>
              <select 
                value={targetBlock}
                onChange={(e) => setTargetBlock(e.target.value)}
                className="form-select w-full"
              >
                {vaccinationData.blocks.map(b => (
                  <option key={b.name} value={b.name}>{b.name} (Current: {b.pct}%)</option>
                ))}
              </select>
            </div>

            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">ALLOCATE DOSES (COLD-CHAIN)</label>
                <input 
                  type="number"
                  value={targetDosage}
                  onChange={(e) => setTargetDosage(e.target.value)}
                  className="form-input w-full"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">ASSIGNED VETERINARY TEAM</label>
                <select 
                  value={assignedTeam}
                  onChange={(e) => setAssignedTeam(e.target.value)}
                  className="form-select w-full"
                >
                  <option value="Team Alpha">Team Alpha (Dr. Jayakumar)</option>
                  <option value="Team Bravo">Team Bravo (Dr. Priya)</option>
                  <option value="Team Charlie">Team Charlie (Dr. Anbarasu)</option>
                  <option value="Team Echo">Team Echo (Dr. Malathi)</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">CAMPAIGN BIOSECURITY FOCUS</label>
              <div className="radio-strip">
                <label className="radio-box">
                  <input type="radio" name="focus" defaultChecked />
                  <span>Emergency Ring Vaccination (5km Outbreak Buffer)</span>
                </label>
                <label className="radio-box">
                  <input type="radio" name="focus" />
                  <span>Routine NADCP Biannual Prophylaxis</span>
                </label>
              </div>
            </div>

            <div className="modal-actions">
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="btn btn-primary"
              >
                <Send size={13} />
                <span>AUTHORIZE & DISPATCH VACCINE BATCH</span>
              </button>
            </div>
          </form>
        )}
      </Modal>

      <style>{`
        .campaigns-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .campaigns-header-bar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .campaign-kpis-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }

        .kpi-card {
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .kpi-card.prominent {
          background-color: #FAF9F5;
          border-left: 3px solid var(--govt-forest);
        }

        .kpi-label {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .kpi-val {
          font-family: var(--font-heading);
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .kpi-sub {
          font-size: 11px;
          color: var(--text-muted);
        }

        .kpi-target-bar {
          margin-top: 6px;
        }

        .target-note {
          font-size: 10px;
          color: var(--text-secondary);
          display: block;
          margin-bottom: 4px;
        }

        .target-track {
          height: 6px;
          background: var(--bg-surface-subtle);
          border-radius: 3px;
          position: relative;
          overflow: hidden;
        }

        .target-fill {
          height: 100%;
          background-color: var(--govt-forest);
          border-radius: 3px;
        }

        .target-line {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 2px;
          background-color: var(--status-critical);
        }

        .block-comparison-panel {
          margin-top: 4px;
        }

        .block-progress-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .block-bar-track {
          flex: 1;
          height: 8px;
          background: var(--bg-surface-subtle);
          border-radius: 4px;
          overflow: hidden;
        }

        .block-bar-fill {
          height: 100%;
          border-radius: 4px;
        }

        .block-pct-val {
          font-size: 11.5px;
          font-weight: 700;
          width: 45px;
          text-align: right;
        }

        /* Modal styling */
        .form-group {
          margin-bottom: 14px;
        }

        .form-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .form-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 5px;
        }

        .w-full {
          width: 100%;
        }

        .radio-strip {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .radio-box {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 12px;
          cursor: pointer;
        }

        .campaign-success-view {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px;
          gap: 12px;
        }

        .cs-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--govt-forest);
        }

        .cs-sub {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .campaign-kpis-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 600px) {
          .campaign-kpis-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
