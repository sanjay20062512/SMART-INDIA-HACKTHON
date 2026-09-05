import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { 
  ShieldAlert, 
  AlertTriangle, 
  MapPin, 
  Syringe, 
  Users, 
  FileCheck2, 
  CheckCircle2 
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function ContainmentModal({ isOpen, onClose, outbreak, onConfirm }) {
  const [bufferRadius, setBufferRadius] = useState('5');
  const [suspendShandy, setSuspendShandy] = useState(true);
  const [ringVaccination, setRingVaccination] = useState(true);
  const [notifyDistrictMagistrate, setNotifyDistrictMagistrate] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!outbreak) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onConfirm({
        outbreakId: outbreak.id,
        bufferRadius,
        suspendShandy,
        ringVaccination,
        notifyDistrictMagistrate
      });
      setIsSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`CONTAINMENT PROTOCOL: ${outbreak.location.toUpperCase()}`}
      systemTag="EPIZOOTIC BIOSECURITY ENFORCEMENT"
      maxWidth="620px"
    >
      {isSubmitted ? (
        <div className="containment-success">
          <CheckCircle2 size={44} color="var(--govt-forest)" />
          <h4 className="success-title">STATUTORY CONTAINMENT ORDER ENFORCED</h4>
          <p className="success-desc">
            Order Ref: <strong>TN-AH/EPI-2026/094</strong> transmitted to District Collectorate, Revenue Divisional Office (Erode), and Police Superintendent. 
            Buffer quarantine zone set to <strong>{bufferRadius} KM</strong>.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="containment-form">
          <div className="incident-summary-banner">
            <div className="summary-left">
              <span className="mono-sub font-mono">INCIDENT ID: {outbreak.id}</span>
              <h4 className="banner-title">{outbreak.disease}</h4>
              <p className="banner-sub">
                <MapPin size={12} />
                <span>{outbreak.location}, {outbreak.block} Block</span>
              </p>
            </div>
            <div className="summary-right">
              <Badge variant={outbreak.riskLevel}>{outbreak.riskLevel}</Badge>
              <span className="risk-score-pill font-mono">INDEX: {outbreak.riskScore}/100</span>
            </div>
          </div>

          <div className="form-section">
            <label className="section-label">1. BIOSECURITY QUARANTINE BUFFER RADIUS</label>
            <div className="radius-options">
              {['3', '5', '10'].map(r => (
                <label key={r} className={`radius-choice ${bufferRadius === r ? 'active' : ''}`}>
                  <input 
                    type="radio" 
                    name="radius" 
                    value={r} 
                    checked={bufferRadius === r}
                    onChange={(e) => setBufferRadius(e.target.value)}
                  />
                  <div className="radius-text">
                    <span className="r-num font-mono">{r} KM</span>
                    <span className="r-desc">{r === '3' ? 'Immediate Hamlet' : r === '5' ? 'Standard Ring' : 'High Threat Perimeter'}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="form-section">
            <label className="section-label">2. MANDATORY CONTAINMENT MEASURES</label>
            <div className="checkbox-list">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={suspendShandy}
                  onChange={(e) => setSuspendShandy(e.target.checked)}
                />
                <div className="checkbox-text">
                  <span className="cb-title">Suspend Livestock Markets (Shandy) & Cattle Movement</span>
                  <span className="cb-desc">Prohibits trade transit within {bufferRadius}km perimeter to prevent viral droplet shedding.</span>
                </div>
              </label>

              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={ringVaccination}
                  onChange={(e) => setRingVaccination(e.target.checked)}
                />
                <div className="checkbox-text">
                  <span className="cb-title">Mobilize Emergency Ring Vaccination Unit</span>
                  <span className="cb-desc">Deploys 2,500 trivalent vaccine doses to establish circumferential immunological barrier.</span>
                </div>
              </label>

              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  checked={notifyDistrictMagistrate}
                  onChange={(e) => setNotifyDistrictMagistrate(e.target.checked)}
                />
                <div className="checkbox-text">
                  <span className="cb-title">Invoke Section 144 / Epidemic Diseases Act Advisory</span>
                  <span className="cb-desc">Direct transmission to Erode District Disaster Management Authority (DDMA).</span>
                </div>
              </label>
            </div>
          </div>

          <div className="modal-actions">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-critical"
            >
              <ShieldAlert size={14} />
              <span>DISPATCH CONTAINMENT ORDER</span>
            </button>
          </div>
        </form>
      )}

      <style>{`
        .incident-summary-banner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #FAF9F5;
          border: 1px solid var(--border-subtle);
          padding: 12px 16px;
          border-radius: 4px;
          margin-bottom: 16px;
        }

        .mono-sub {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .banner-title {
          font-family: var(--font-heading);
          font-size: 15px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .banner-sub {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 11.5px;
          color: var(--text-secondary);
        }

        .summary-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }

        .risk-score-pill {
          font-size: 11px;
          font-weight: 700;
          color: var(--status-critical);
        }

        .form-section {
          margin-bottom: 18px;
        }

        .section-label {
          display: block;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 8px;
        }

        .radius-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .radius-choice {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface-elevated);
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .radius-choice:hover {
          border-color: var(--border-strong);
        }

        .radius-choice.active {
          border-color: var(--status-critical);
          background: var(--status-critical-bg);
        }

        .radius-text {
          display: flex;
          flex-direction: column;
        }

        .r-num {
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .r-desc {
          font-size: 10.5px;
          color: var(--text-muted);
        }

        .checkbox-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .checkbox-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          padding: 10px 12px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          cursor: pointer;
        }

        .checkbox-label input {
          margin-top: 3px;
        }

        .cb-title {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .cb-desc {
          display: block;
          font-size: 11px;
          color: var(--text-secondary);
          line-height: 1.3;
          margin-top: 2px;
        }

        .modal-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 20px;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }

        .containment-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px 12px;
          gap: 12px;
        }

        .success-title {
          font-family: var(--font-heading);
          font-size: 16px;
          font-weight: 700;
          color: var(--govt-forest);
        }

        .success-desc {
          font-size: 12.5px;
          color: var(--text-secondary);
          max-width: 480px;
          line-height: 1.4;
        }
      `}</style>
    </Modal>
  );
}
