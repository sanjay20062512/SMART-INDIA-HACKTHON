import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

export function CasePipeline({ stages }) {
  const [selectedStage, setSelectedStage] = useState(stages[4]); // Default to Govt Monitoring

  return (
    <div className="case-pipeline-card panel">
      <div className="panel-header">
        <div className="pipeline-title-group">
          <span className="system-label">OPERATIONAL INCIDENT LIFECYCLE</span>
          <h3 className="section-title">
            <span>CASE ESCALATION PIPELINE</span>
          </h3>
        </div>
        <div className="pipeline-legend">
          <span className="legend-item"><span className="status-dot normal" /> Contained / Done</span>
          <span className="legend-item"><span className="status-dot critical" /> High Priority / Field</span>
          <span className="legend-item"><span className="status-dot info" /> Intake / Verification</span>
        </div>
      </div>

      <div className="panel-body">
        {/* Horizontal Timeline Process Flow */}
        <div className="pipeline-timeline-container">
          <div className="pipeline-track">
            {stages.map((stage, idx) => {
              const isSelected = selectedStage?.stage === stage.stage;
              const isLast = idx === stages.length - 1;

              return (
                <React.Fragment key={stage.stage}>
                  <div 
                    className={`pipeline-node ${stage.color} ${isSelected ? 'selected' : ''}`}
                    onClick={() => setSelectedStage(stage)}
                  >
                    <div className="node-badge font-mono">
                      <span className="node-num">{stage.stage}</span>
                      <span className="node-count font-mono tabular-nums">{stage.count}</span>
                    </div>

                    <div className="node-info">
                      <h4 className="node-name">{stage.name}</h4>
                      <span className="node-status font-mono">{stage.status}</span>
                    </div>
                  </div>

                  {!isLast && (
                    <div className="pipeline-connector">
                      <ArrowRight size={14} className="connector-arrow" />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Selected Stage Detail Dossier */}
        {selectedStage && (
          <div className="stage-detail-callout">
            <div className="stage-detail-header">
              <span className="stage-tag font-mono">
                STAGE {selectedStage.stage} OF 9 • {selectedStage.status.toUpperCase()}
              </span>
              <span className="stage-head-count font-mono">{selectedStage.count} CASES CURRENTLY AT THIS STAGE</span>
            </div>
            <p className="stage-explanation">
              <strong>Protocol Definition:</strong> {selectedStage.desc}. Immediate automated alerts generated to District Nodal Officer upon escalation.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .case-pipeline-card {
          margin-bottom: 24px;
        }

        .pipeline-legend {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: var(--text-muted);
        }

        .legend-item {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .pipeline-timeline-container {
          overflow-x: auto;
          padding-bottom: 8px;
          -webkit-overflow-scrolling: touch;
        }

        .pipeline-track {
          display: flex;
          align-items: center;
          min-width: 960px;
          padding: 8px 4px;
        }

        .pipeline-node {
          flex: 1;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 10px;
          cursor: pointer;
          transition: all 0.15s ease;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .pipeline-node:hover {
          border-color: var(--border-strong);
          background: #FAF9F5;
          transform: translateY(-2px);
        }

        .pipeline-node.selected {
          border-color: var(--govt-forest);
          background: var(--govt-forest-tint);
          box-shadow: var(--shadow-sm);
        }

        .pipeline-node.red { border-top: 3px solid var(--status-critical); }
        .pipeline-node.amber { border-top: 3px solid var(--status-warning); }
        .pipeline-node.blue { border-top: 3px solid var(--status-info); }
        .pipeline-node.green { border-top: 3px solid var(--status-normal); }

        .node-badge {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .node-num {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 700;
        }

        .node-count {
          font-size: 13px;
          font-weight: 700;
          color: var(--text-primary);
          background: var(--bg-surface);
          padding: 1px 6px;
          border-radius: 3px;
          border: 1px solid var(--border-subtle);
        }

        .node-name {
          font-family: var(--font-heading);
          font-size: 12.5px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          white-space: nowrap;
        }

        .node-status {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 600;
        }

        .pipeline-connector {
          padding: 0 6px;
          color: var(--border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .stage-detail-callout {
          margin-top: 14px;
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          padding: 12px 16px;
          border-radius: 4px;
        }

        .stage-detail-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 4px;
          flex-wrap: wrap;
          gap: 6px;
        }

        .stage-tag {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--govt-forest);
          letter-spacing: 0.05em;
        }

        .stage-head-count {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .stage-explanation {
          font-size: 12px;
          color: var(--text-secondary);
          line-height: 1.4;
        }
      `}</style>
    </div>
  );
}
