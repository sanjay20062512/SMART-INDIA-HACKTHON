import React, { useState } from 'react';
import { Settings, Save, ShieldCheck, CheckCircle2, BellRing, Database } from 'lucide-react';
import { Badge } from '../common/Badge';

export function SettingsView() {
  const [saved, setSaved] = useState(false);
  const [clusterThreshold, setClusterThreshold] = useState('3');
  const [autoEscalate, setAutoEscalate] = useState(true);
  const [smsGateway, setSmsGateway] = useState('NIC_TAMILNADU_GATEWAY_V2');
  const [gisRefreshRate, setGisRefreshRate] = useState('30');

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="settings-view">
      <div className="settings-top-bar">
        <div>
          <span className="system-label">OPERATIONAL PARAMETERS</span>
          <h2 className="page-title">Command Center Biosecurity Rules & Integration Settings</h2>
          <p className="page-subtitle">
            Configure epizootic risk thresholds, automated district alerts, and national surveillance nodes.
          </p>
        </div>
      </div>

      {saved && (
        <div className="save-banner">
          <CheckCircle2 size={16} color="var(--govt-forest)" />
          <span>Biosecurity configuration updated and synchronized across all field terminals.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="settings-form">
        <div className="panel settings-panel">
          <div className="panel-header">
            <div>
              <span className="system-label">SURVEILLANCE HEURISTICS</span>
              <h3 className="section-title">EPIZOOTIC CLUSTERING & ESCALATION RULES</h3>
            </div>
            <Badge variant="normal">ACTIVE DEPLOYED RULES</Badge>
          </div>

          <div className="panel-body">
            <div className="form-group">
              <label className="form-label">SYNDROMIC CLUSTER TRIGGER THRESHOLD</label>
              <select 
                value={clusterThreshold}
                onChange={(e) => setClusterThreshold(e.target.value)}
                className="form-select w-full"
              >
                <option value="2">2 Linked Cases in 5km Radius (High Sensitivity)</option>
                <option value="3">3 Linked Cases in 8km Radius (Standard Biosecurity Default)</option>
                <option value="5">5 Linked Cases in 10km Radius (Confirmed Outbreak Focus)</option>
              </select>
              <span className="form-help">Triggers immediate automated notification to District Nodal Epidemiologist.</span>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox"
                  checked={autoEscalate}
                  onChange={(e) => setAutoEscalate(e.target.checked)}
                />
                <div>
                  <span className="cb-title">Automated Collectorate & DDMA Escalation</span>
                  <span className="cb-desc">Immediately notify District Collector and SP upon laboratory confirmation of FMD, Anthrax, or Glanders.</span>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="panel settings-panel">
          <div className="panel-header">
            <div>
              <span className="system-label">NATIONAL CONNECTIVITY</span>
              <h3 className="section-title">API GATEWAYS & LIVESTOCK REGISTRY INTEGRATION</h3>
            </div>
            <span className="font-mono text-muted text-xs font-bold">BHARAT PASHUDHAN SYNC</span>
          </div>

          <div className="panel-body">
            <div className="form-grid-2">
              <div className="form-group">
                <label className="form-label">SMS GATEWAY ROUTE</label>
                <input 
                  type="text" 
                  value={smsGateway} 
                  onChange={(e) => setSmsGateway(e.target.value)}
                  className="form-input w-full font-mono"
                />
              </div>

              <div className="form-group">
                <label className="form-label">GIS TELEMETRY REFRESH CADENCE (SECONDS)</label>
                <select 
                  value={gisRefreshRate}
                  onChange={(e) => setGisRefreshRate(e.target.value)}
                  className="form-select w-full font-mono"
                >
                  <option value="15">15 Seconds (Rapid Crisis)</option>
                  <option value="30">30 Seconds (Default Grid)</option>
                  <option value="60">60 Seconds (Low Bandwidth)</option>
                </select>
              </div>
            </div>

            <div className="settings-footer-actions">
              <button type="submit" className="btn btn-primary">
                <Save size={13} />
                <span>SAVE SYSTEM SETTINGS</span>
              </button>
            </div>
          </div>
        </div>
      </form>

      <style>{`
        .settings-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .save-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          background: var(--govt-forest-tint);
          border: 1px solid var(--govt-forest-light);
          padding: 10px 14px;
          border-radius: 4px;
          font-size: 12px;
          color: var(--text-primary);
        }

        .settings-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-help {
          display: block;
          font-size: 11px;
          color: var(--text-muted);
          margin-top: 4px;
        }

        .settings-footer-actions {
          margin-top: 14px;
          padding-top: 12px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: flex-end;
        }
      `}</style>
    </div>
  );
}
