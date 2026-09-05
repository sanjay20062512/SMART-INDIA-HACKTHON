import React from 'react';
import { 
  Activity, 
  CloudRain, 
  TrendingUp, 
  AlertTriangle, 
  MapPin, 
  ShieldCheck, 
  Info,
  CheckCircle,
  FileText
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function RiskIntelligenceView({ riskData, onAction }) {
  return (
    <div className="risk-intel-view">
      {/* Statutory Decision-Support Notice Banner */}
      <div className="decision-support-banner">
        <div className="ds-icon-box">
          <Info size={16} />
        </div>
        <div className="ds-text">
          <strong>STATUTORY DECISION-SUPPORT NOTICE:</strong> Algorithmic risk scores and predictive modeling are advisory analytics designed to aid veterinary epidemiologists. Final containment decrees and quarantine declarations require authorized signature of the Competent Veterinary Officer / District Magistrate under the Prevention and Control of Infectious and Contagious Diseases in Animals Act, 2009.
        </div>
      </div>

      <div className="risk-intel-grid">
        {/* Left Column: Composite Scorecard & Rule Engine Assessment */}
        <div className="scorecard-column">
          <div className="panel scorecard-panel">
            <div className="panel-header">
              <div>
                <span className="system-label">EPIZOOTIC THREAT EVALUATION</span>
                <h3 className="section-title">COMPOSITE RISK SCORECARD</h3>
              </div>
              <Badge variant="critical">CRITICAL THREAT</Badge>
            </div>

            <div className="panel-body">
              <div className="score-hero">
                <div className="score-radial-visual">
                  <span className="score-huge tabular-nums font-mono">{riskData.currentScore}</span>
                  <span className="score-denom font-mono">/ {riskData.maxScore}</span>
                </div>
                <div className="score-status-group">
                  <h4 className="threat-headline">{riskData.threatLevel}</h4>
                  <p className="threat-recommendation">{riskData.recommendation}</p>
                </div>
              </div>

              <div className="risk-velocity-strip">
                <div className="velocity-metric">
                  <span className="v-label font-mono">CASE VELOCITY</span>
                  <span className="v-val text-critical font-mono">+28% 7-Day Surge</span>
                </div>
                <div className="velocity-metric">
                  <span className="v-label font-mono">EST. REPRODUCTION (R₀)</span>
                  <span className="v-val font-mono">1.84 (High Spread)</span>
                </div>
                <div className="velocity-metric">
                  <span className="v-label font-mono">CLUSTER CONCENTRATION</span>
                  <span className="v-val font-mono">0.78 Moran's I</span>
                </div>
              </div>

              <div className="rule-engine-box">
                <div className="rule-box-head">
                  <Activity size={14} color="var(--govt-forest)" />
                  <span className="rule-title font-mono">AI / DETERMINISTIC EPIDEMIOLOGICAL RULES TRIGGERED</span>
                </div>
                <ul className="rule-triggers-list">
                  <li>
                    <CheckCircle size={13} className="rule-check" />
                    <span><strong>Rule FMD-101:</strong> 3+ linked syndromic clusters detected within 8km radius within 72h window.</span>
                  </li>
                  <li>
                    <CheckCircle size={13} className="rule-check" />
                    <span><strong>Rule WX-204:</strong> Post-monsoon surface pooling exceeds vector breeding threshold.</span>
                  </li>
                  <li>
                    <CheckCircle size={13} className="rule-check" />
                    <span><strong>Rule MKT-309:</strong> Weekly Cattle Shandy located inside 5km transmission arc.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Decomposed Risk Drivers */}
        <div className="drivers-column">
          <div className="panel drivers-panel">
            <div className="panel-header">
              <div>
                <span className="system-label">FACTOR DECOMPOSITION</span>
                <h3 className="section-title">PRIMARY RISK DRIVERS & WEIGHTS</h3>
              </div>
              <span className="total-weight-tag font-mono">5 ACTIVE FACTORS</span>
            </div>

            <div className="panel-body">
              <div className="drivers-list">
                {riskData.drivers.map((driver, idx) => (
                  <div key={idx} className="driver-card">
                    <div className="driver-card-top">
                      <div className="driver-title-group">
                        <span className="driver-num font-mono">0{idx + 1}</span>
                        <h4 className="driver-name">{driver.title}</h4>
                      </div>
                      <div className="driver-impact-group">
                        <span className="driver-weight font-mono">{driver.impact}</span>
                        <Badge variant={driver.severity}>{driver.severity}</Badge>
                      </div>
                    </div>

                    <div className="driver-metric-row font-mono">
                      <span className="metric-tag">{driver.metric}</span>
                    </div>

                    <p className="driver-desc">{driver.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .risk-intel-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .decision-support-banner {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background-color: var(--govt-navy-tint);
          border: 1px solid var(--status-info-border);
          border-left: 3px solid var(--govt-navy);
          padding: 12px 16px;
          border-radius: 4px;
        }

        .ds-icon-box {
          color: var(--govt-navy);
          flex-shrink: 0;
          margin-top: 1px;
        }

        .ds-text {
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .risk-intel-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 20px;
        }

        .score-hero {
          display: flex;
          align-items: center;
          gap: 24px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--border-subtle);
          margin-bottom: 16px;
        }

        .score-radial-visual {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          background: var(--status-critical-bg);
          border: 4px solid var(--status-critical);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 0 15px rgba(185, 28, 28, 0.15);
        }

        .score-huge {
          font-size: 38px;
          font-weight: 700;
          color: var(--status-critical);
          line-height: 1;
        }

        .score-denom {
          font-size: 13px;
          color: var(--text-muted);
          font-weight: 700;
        }

        .threat-headline {
          font-family: var(--font-heading);
          font-size: 18px;
          font-weight: 700;
          color: var(--status-critical);
          margin-bottom: 4px;
        }

        .threat-recommendation {
          font-size: 12.5px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        .risk-velocity-strip {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
          margin-bottom: 18px;
        }

        .velocity-metric {
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 8px 10px;
          border-radius: 3px;
        }

        .v-label {
          display: block;
          font-size: 9px;
          font-weight: 700;
          color: var(--text-muted);
          margin-bottom: 2px;
        }

        .v-val {
          font-size: 12px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .rule-engine-box {
          background-color: #FAF9F5;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 14px;
        }

        .rule-box-head {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 10px;
        }

        .rule-title {
          font-size: 10px;
          font-weight: 700;
          color: var(--govt-forest);
          letter-spacing: 0.05em;
        }

        .rule-triggers-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .rule-triggers-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.35;
        }

        .rule-check {
          color: var(--govt-forest);
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Drivers list */
        .total-weight-tag {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          background: var(--bg-surface-subtle);
          padding: 2px 6px;
          border-radius: 2px;
        }

        .drivers-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .driver-card {
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 12px 14px;
          transition: border-color 0.15s;
        }
        .driver-card:hover {
          border-color: var(--border-strong);
        }

        .driver-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .driver-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .driver-num {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .driver-name {
          font-family: var(--font-heading);
          font-size: 14px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .driver-impact-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .driver-weight {
          font-size: 11px;
          font-weight: 700;
          color: var(--status-critical);
        }

        .driver-metric-row {
          margin-bottom: 6px;
        }

        .metric-tag {
          display: inline-block;
          font-size: 10.5px;
          font-weight: 600;
          background: #FFFFFF;
          border: 1px solid var(--border-subtle);
          padding: 2px 8px;
          border-radius: 3px;
          color: var(--text-primary);
        }

        .driver-desc {
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .risk-intel-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
