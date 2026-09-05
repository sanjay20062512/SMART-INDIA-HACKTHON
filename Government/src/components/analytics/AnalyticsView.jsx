import React, { useState } from 'react';
import { 
  LineChart, 
  PieChart, 
  BarChart3, 
  Calendar, 
  Download, 
  Filter, 
  Info,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function AnalyticsView({ trends, species, multiYear }) {
  const [selectedRange, setSelectedRange] = useState('6w');
  const [activeMetric, setActiveMetric] = useState('cases');

  // Max value for disease trend chart
  const maxFmd = Math.max(...trends.map(t => t.fmd));

  return (
    <div className="analytics-view">
      {/* Header Bar */}
      <div className="analytics-top-bar">
        <div>
          <span className="system-label">EPIZOOTIOLOGY & SURVEILLANCE ANALYTICS</span>
          <h2 className="page-title">Disease Trend Analytics & Historical Epidemiological Modelling</h2>
          <p className="page-subtitle">
            Longitudinal telemetry of pathogen trajectory, species vulnerability, and containment efficacy.
          </p>
        </div>

        <div className="analytics-controls">
          <div className="range-selector">
            {['2w', '6w', '3m', '1y'].map(r => (
              <button
                key={r}
                className={`range-pill ${selectedRange === r ? 'active' : ''}`}
                onClick={() => setSelectedRange(r)}
              >
                {r.toUpperCase()}
              </button>
            ))}
          </div>
          <button className="btn btn-secondary btn-sm">
            <Download size={13} />
            <span>EXPORT CSV</span>
          </button>
        </div>
      </div>

      {/* Main Grid: 2-Column Analytical Cards */}
      <div className="analytics-charts-grid">
        {/* Chart 1: Disease Cases Over Time */}
        <div className="panel chart-panel">
          <div className="panel-header">
            <div>
              <span className="system-label">LONGITUDINAL TELEMETRY</span>
              <h3 className="section-title">DISEASE CASES OVER TIME (6 WEEKS)</h3>
            </div>
            <div className="chart-legend-row">
              <span className="legend-dot fmd">FMD</span>
              <span className="legend-dot ppr">PPR</span>
              <span className="legend-dot brucellosis">Brucellosis</span>
            </div>
          </div>

          <div className="panel-body">
            <div className="svg-chart-container">
              <svg viewBox="0 0 500 240" className="analytics-svg">
                {/* Gridlines */}
                {[0, 60, 120, 180].map((y, idx) => (
                  <g key={idx}>
                    <line x1="40" y1={y + 20} x2="480" y2={y + 20} stroke="#E5E7EB" strokeDasharray="3,3" />
                    <text x="32" y={y + 24} fill="#9CA3AF" fontSize="9" textAnchor="end" fontFamily="var(--font-mono)">
                      {Math.round((3 - idx) * 105)}
                    </text>
                  </g>
                ))}

                {/* X Axis Labels */}
                {trends.map((t, idx) => {
                  const x = 50 + idx * 80;
                  return (
                    <text key={t.week} x={x} y="225" fill="#6B7280" fontSize="10" textAnchor="middle" fontFamily="var(--font-mono)">
                      {t.week}
                    </text>
                  );
                })}

                {/* Trend Polyline: FMD (Surging Red) */}
                <polyline
                  fill="none"
                  stroke="var(--status-critical)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  points={trends.map((t, idx) => `${50 + idx * 80},${200 - (t.fmd / 330) * 180}`).join(' ')}
                />

                {/* Trend Polyline: PPR (Amber) */}
                <polyline
                  fill="none"
                  stroke="var(--status-warning)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  points={trends.map((t, idx) => `${50 + idx * 80},${200 - (t.ppr / 330) * 180}`).join(' ')}
                />

                {/* Trend Polyline: Brucellosis (Teal) */}
                <polyline
                  fill="none"
                  stroke="var(--govt-forest)"
                  strokeWidth="1.8"
                  strokeDasharray="4,2"
                  points={trends.map((t, idx) => `${50 + idx * 80},${200 - (t.brucellosis / 330) * 180}`).join(' ')}
                />

                {/* Points on FMD */}
                {trends.map((t, idx) => (
                  <circle
                    key={`pt-${idx}`}
                    cx={50 + idx * 80}
                    cy={200 - (t.fmd / 330) * 180}
                    r="4"
                    fill="#FFFFFF"
                    stroke="var(--status-critical)"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
            <div className="chart-footer-note">
              <span className="note-pill font-mono">CRITICAL SURGE</span>
              <span>Foot & Mouth Disease case velocity accelerated by <strong>+28%</strong> in W-35 to W-36 post heavy precipitation.</span>
            </div>
          </div>
        </div>

        {/* Chart 2: Animal Species Distribution */}
        <div className="panel chart-panel">
          <div className="panel-header">
            <div>
              <span className="system-label">HOST VULNERABILITY</span>
              <h3 className="section-title">AFFECTED ANIMAL SPECIES BREAKDOWN</h3>
            </div>
            <span className="total-affected font-mono">1,284 ACTIVE HEAD</span>
          </div>

          <div className="panel-body">
            <div className="species-bars-container">
              {species.map(sp => (
                <div key={sp.species} className="species-row">
                  <div className="sp-meta">
                    <span className="sp-name">{sp.species}</span>
                    <span className="sp-pct font-mono">{sp.percentage}% ({sp.count} cases)</span>
                  </div>
                  <div className="sp-progress-track">
                    <div 
                      className="sp-progress-fill" 
                      style={{ width: `${sp.percentage}%`, backgroundColor: sp.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="species-insight-box">
              <span className="insight-title font-mono">VULNERABILITY ASSESSMENT:</span>
              <p className="insight-text">
                Bovine population (Cattle & Buffalo combined: <strong>76%</strong>) represents the predominant host reservoir. 
                Immediate ring vaccination prioritizes milking crossbred HF/Jersey cows in dairy cooperatives.
              </p>
            </div>
          </div>
        </div>

        {/* Chart 3: Multi-Year Longitudinal Comparison (2024 vs 2025 vs 2026) */}
        <div className="panel chart-panel full-width">
          <div className="panel-header">
            <div>
              <span className="system-label">HISTORICAL BENCHMARKING</span>
              <h3 className="section-title">LONGITUDINAL PROGRESSION: 2024 VS 2025 VS 2026 (YTD)</h3>
            </div>
            <Badge variant="normal">NADCP IMPACT POSITIVE</Badge>
          </div>

          <div className="panel-body">
            <div className="multi-year-grid">
              {multiYear.map(my => (
                <div key={my.year} className="year-card">
                  <div className="year-head">
                    <span className="year-badge font-mono">{my.year}</span>
                    <span className="year-status font-mono">
                      {my.year.includes('2026') ? 'ACTIVE SURVEILLANCE' : 'CONCLUDED EPISODE'}
                    </span>
                  </div>

                  <div className="year-metrics">
                    <div className="ym-cell">
                      <span className="ym-label font-mono">TOTAL REPORTED CASES</span>
                      <span className="ym-val tabular-nums font-mono">{my.cases.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="ym-cell">
                      <span className="ym-label font-mono">TOTAL MORTALITY</span>
                      <span className="ym-val tabular-nums font-mono text-critical">{my.mortality}</span>
                    </div>
                    <div className="ym-cell">
                      <span className="ym-label font-mono">VACCINATION COVERAGE</span>
                      <span className="ym-val tabular-nums font-mono text-healthy">{my.vaccinationPct}%</span>
                    </div>
                  </div>

                  <div className="year-bar-wrap">
                    <div className="year-bar-track">
                      <div 
                        className="year-bar-fill" 
                        style={{ width: `${my.vaccinationPct}%`, backgroundColor: 'var(--govt-forest)' }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .analytics-view {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .analytics-top-bar {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .analytics-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .range-selector {
          display: flex;
          background: var(--bg-surface);
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          padding: 2px;
        }

        .range-pill {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 3px;
          color: var(--text-secondary);
        }
        .range-pill.active {
          background: var(--govt-forest);
          color: #FFFFFF;
        }

        .analytics-charts-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .chart-panel.full-width {
          grid-column: span 2;
        }

        .chart-legend-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
        }

        .legend-dot {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .legend-dot::before {
          content: '';
          width: 8px;
          height: 8px;
          border-radius: 50%;
          display: inline-block;
        }
        .legend-dot.fmd::before { background-color: var(--status-critical); }
        .legend-dot.ppr::before { background-color: var(--status-warning); }
        .legend-dot.brucellosis::before { background-color: var(--govt-forest); }

        .svg-chart-container {
          width: 100%;
          height: 240px;
        }

        .analytics-svg {
          width: 100%;
          height: 100%;
        }

        .chart-footer-note {
          margin-top: 12px;
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
          font-size: 11.5px;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .note-pill {
          font-size: 9.5px;
          font-weight: 700;
          background: var(--status-critical-bg);
          color: var(--status-critical);
          padding: 2px 6px;
          border-radius: 2px;
          border: 1px solid var(--status-critical-border);
        }

        /* Species Distribution */
        .total-affected {
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .species-bars-container {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-bottom: 20px;
        }

        .sp-meta {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .sp-pct {
          color: var(--text-muted);
        }

        .sp-progress-track {
          height: 8px;
          background: var(--bg-surface-subtle);
          border-radius: 4px;
          overflow: hidden;
        }

        .sp-progress-fill {
          height: 100%;
          border-radius: 4px;
        }

        .species-insight-box {
          background: #FAF9F5;
          border: 1px solid var(--border-subtle);
          padding: 12px 14px;
          border-radius: 4px;
        }

        .insight-title {
          font-size: 10px;
          font-weight: 700;
          color: var(--govt-forest);
          display: block;
          margin-bottom: 4px;
        }

        .insight-text {
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.4;
        }

        /* Multi Year Grid */
        .multi-year-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .year-card {
          background: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .year-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .year-badge {
          font-size: 18px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .year-status {
          font-size: 9.5px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .year-metrics {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ym-cell {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11.5px;
        }

        .ym-label {
          font-size: 10px;
          color: var(--text-muted);
          font-weight: 700;
        }

        .ym-val {
          font-size: 12px;
          font-weight: 700;
        }

        .year-bar-track {
          height: 6px;
          background: var(--bg-surface-subtle);
          border-radius: 3px;
          overflow: hidden;
        }

        .year-bar-fill {
          height: 100%;
          border-radius: 3px;
        }

        @media (max-width: 1024px) {
          .analytics-charts-grid {
            grid-template-columns: 1fr;
          }
          .chart-panel.full-width {
            grid-column: span 1;
          }
          .multi-year-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
