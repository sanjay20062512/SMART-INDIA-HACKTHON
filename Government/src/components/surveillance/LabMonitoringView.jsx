import React from 'react';
import { 
  Microscope, 
  TestTube2, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  AlertOctagon, 
  Building2,
  FileCheck2
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function LabMonitoringView({ labData }) {
  return (
    <div className="lab-monitoring-view">
      {/* Top Title Bar */}
      <div className="lab-top-bar">
        <div>
          <span className="system-label">VIROLOGICAL & SEROLOGICAL DIAGNOSTICS</span>
          <h2 className="page-title">Diagnostic Laboratory Workload & Pathogen Confirmation Pipeline</h2>
          <p className="page-subtitle">
            Tracking sample accession, ELISA/RT-PCR diagnostic assay progress, and statutory laboratory verifications.
          </p>
        </div>
      </div>

      {/* Lab Workload KPIs Grid */}
      <div className="lab-kpis-grid">
        <div className="panel lab-kpi">
          <span className="lk-label font-mono">SAMPLES PENDING INTAKE</span>
          <span className="lk-val font-mono tabular-nums">{labData.summary.pending}</span>
          <span className="lk-sub">In-transit under cold-chain</span>
        </div>

        <div className="panel lab-kpi">
          <span className="lk-label font-mono">COLLECTED BY FIELD UNITS</span>
          <span className="lk-val font-mono tabular-nums">{labData.summary.collected}</span>
          <span className="lk-sub">Epithelial & serum swabs</span>
        </div>

        <div className="panel lab-kpi prominent">
          <span className="lk-label font-mono">UNDER ACTIVE PCR/ELISA TESTING</span>
          <span className="lk-val font-mono tabular-nums text-warning">{labData.summary.underTesting}</span>
          <span className="lk-sub">Turnaround est. 4.2 hours</span>
        </div>

        <div className="panel lab-kpi">
          <span className="lk-label font-mono">CONFIRMED PATHOGEN POSITIVE</span>
          <span className="lk-val font-mono tabular-nums text-critical">{labData.summary.positive}</span>
          <span className="lk-sub">FMD Serotype O & Brucella</span>
        </div>

        <div className="panel lab-kpi">
          <span className="lk-label font-mono">TESTED NEGATIVE</span>
          <span className="lk-val font-mono tabular-nums text-healthy">{labData.summary.negative}</span>
          <span className="lk-sub">Bacillus anthracis ruled out</span>
        </div>
      </div>

      {/* Sample Lifecycle Timeline */}
      <div className="panel lab-lifecycle-panel">
        <div className="panel-header">
          <div>
            <span className="system-label">STATUTORY CHAIN OF CUSTODY</span>
            <h3 className="section-title">DIAGNOSTIC SAMPLE LIFECYCLE (ACCESSION TO SYNC)</h3>
          </div>
          <Badge variant="normal">CHAIN OF CUSTODY VERIFIED</Badge>
        </div>

        <div className="panel-body">
          <div className="lifecycle-track">
            {labData.lifecycle.map((step, idx) => {
              const isDone = step.status === 'COMPLETED';
              const isActive = step.status === 'ACTIVE';
              const isLast = idx === labData.lifecycle.length - 1;

              return (
                <React.Fragment key={idx}>
                  <div className={`lifecycle-step ${step.status.toLowerCase()}`}>
                    <div className="step-num font-mono">0{idx + 1}</div>
                    <div className="step-content">
                      <h4 className="step-title">{step.step}</h4>
                      <span className="step-time font-mono">{step.time}</span>
                    </div>
                    <div className="step-badge-wrap">
                      <Badge 
                        variant={isDone ? 'normal' : isActive ? 'warning' : 'neutral'}
                        showDot={true}
                      >
                        {step.status}
                      </Badge>
                    </div>
                  </div>

                  {!isLast && (
                    <div className="lifecycle-arrow">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Laboratory Assays Table */}
      <div className="panel lab-table-panel">
        <div className="panel-header">
          <div>
            <span className="system-label">DIAGNOSTIC REGISTER</span>
            <h3 className="section-title">RECENT PATHOGEN DIAGNOSTIC ASSAYS</h3>
          </div>
          <span className="font-mono text-muted text-xs font-bold">{labData.recentTests.length} SAMPLES</span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>SAMPLE ACCESSION ID</th>
                <th>ORIGIN VILLAGE</th>
                <th>HOST SPECIES</th>
                <th>DIAGNOSTIC ASSAY TYPE</th>
                <th>VERIFIED RESULT</th>
                <th>TESTING LABORATORY</th>
                <th>TIMESTAMP</th>
              </tr>
            </thead>
            <tbody>
              {labData.recentTests.map(t => (
                <tr key={t.sampleId}>
                  <td className="font-mono font-bold">{t.sampleId}</td>
                  <td>{t.village}</td>
                  <td>{t.species}</td>
                  <td className="font-mono">{t.testType}</td>
                  <td>
                    <span 
                      className={`result-pill font-mono ${
                        t.result.includes('POSITIVE') ? 'pos' : t.result.includes('NEGATIVE') ? 'neg' : 'wait'
                      }`}
                    >
                      {t.result}
                    </span>
                  </td>
                  <td>
                    <div className="lab-cell">
                      <Building2 size={12} />
                      <span>{t.lab}</span>
                    </div>
                  </td>
                  <td className="font-mono text-muted">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <style>{`
        .lab-monitoring-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .lab-top-bar {
          margin-bottom: 4px;
        }

        .lab-kpis-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
        }

        .lab-kpi {
          padding: 14px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .lab-kpi.prominent {
          background: #FAF9F5;
          border-left: 3px solid var(--status-warning);
        }

        .lk-label {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .lk-val {
          font-size: 26px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 6px;
        }

        .lk-sub {
          font-size: 10.5px;
          color: var(--text-muted);
          border-top: 1px dashed var(--border-subtle);
          padding-top: 6px;
        }

        /* Lifecycle */
        .lifecycle-track {
          display: flex;
          align-items: center;
          overflow-x: auto;
          padding: 10px 4px;
          -webkit-overflow-scrolling: touch;
        }

        .lifecycle-step {
          flex: 1;
          min-width: 150px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .lifecycle-step.completed {
          border-top: 2px solid var(--govt-forest);
        }

        .lifecycle-step.active {
          border-top: 2px solid var(--status-warning);
          background: #FAF9F5;
        }

        .step-num {
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .step-title {
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.25;
        }

        .step-time {
          font-size: 10.5px;
          color: var(--text-muted);
        }

        .lifecycle-arrow {
          padding: 0 8px;
          color: var(--border-strong);
        }

        /* Result pill */
        .result-pill {
          display: inline-block;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 3px;
        }

        .result-pill.pos {
          background: var(--status-critical-bg);
          color: var(--status-critical);
          border: 1px solid var(--status-critical-border);
        }

        .result-pill.neg {
          background: var(--status-normal-bg);
          color: var(--status-normal);
          border: 1px solid var(--status-normal-border);
        }

        .lab-cell {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: var(--text-secondary);
        }

        @media (max-width: 1200px) {
          .lab-kpis-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .lab-kpis-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
