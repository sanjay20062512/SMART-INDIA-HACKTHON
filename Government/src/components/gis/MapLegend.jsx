import React from 'react';
import { Layers, ShieldAlert, Check } from 'lucide-react';

export function MapLegend({ activeLayers, onToggleLayer }) {
  const layerDefs = [
    { id: 'outbreaks', label: 'Active Outbreak Clusters', color: 'var(--status-critical)', count: 5 },
    { id: 'riskZones', label: '5km / 10km Quarantine Buffers', color: 'rgba(185, 28, 28, 0.25)', border: '1px dashed #B91C1C' },
    { id: 'clinics', label: 'Veterinary Hospitals & Dispensaries', color: 'var(--status-info)', count: 2 },
    { id: 'labs', label: 'Diagnostic Laboratories', color: 'var(--govt-forest)', count: 2 },
    { id: 'weather', label: 'Rainfall / Humidity Vectors', color: '#D97706', count: 1 }
  ];

  return (
    <div className="map-legend-card">
      <div className="legend-head">
        <div className="legend-title">
          <Layers size={13} />
          <span>GIS SURVEILLANCE LAYERS</span>
        </div>
      </div>

      <div className="layer-toggle-list">
        {layerDefs.map(layer => {
          const isActive = activeLayers[layer.id];
          return (
            <button
              key={layer.id}
              className={`layer-toggle-item ${isActive ? 'active' : ''}`}
              onClick={() => onToggleLayer(layer.id)}
            >
              <span className="layer-checkbox">
                {isActive && <Check size={11} strokeWidth={3} />}
              </span>
              <span 
                className="layer-swatch" 
                style={{ 
                  backgroundColor: layer.color, 
                  border: layer.border || '1px solid rgba(0,0,0,0.1)' 
                }} 
              />
              <span className="layer-name">{layer.label}</span>
              {layer.count !== undefined && (
                <span className="layer-count font-mono">{layer.count}</span>
              )}
            </button>
          );
        })}
      </div>

      <div className="risk-scale-row">
        <span className="risk-scale-label">THREAT:</span>
        <div className="scale-steps">
          <span className="scale-step low">LOW</span>
          <span className="scale-step med">MED</span>
          <span className="scale-step high">HIGH</span>
          <span className="scale-step crit">CRITICAL</span>
        </div>
      </div>

      <style>{`
        .map-legend-card {
          position: absolute;
          bottom: 14px;
          left: 14px;
          background-color: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(4px);
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          padding: 10px 12px;
          box-shadow: var(--shadow-md);
          z-index: 500;
          width: 255px;
          pointer-events: auto;
        }

        .legend-head {
          margin-bottom: 8px;
          padding-bottom: 6px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .legend-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .layer-toggle-list {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 8px;
        }

        .layer-toggle-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: var(--text-secondary);
          text-align: left;
          padding: 2px 4px;
          border-radius: 3px;
          transition: background 0.1s;
        }
        .layer-toggle-item:hover {
          background-color: var(--bg-surface-subtle);
          color: var(--text-primary);
        }

        .layer-checkbox {
          width: 14px;
          height: 14px;
          border-radius: 2px;
          border: 1px solid var(--border-strong);
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--govt-forest);
          flex-shrink: 0;
        }
        .layer-toggle-item.active .layer-checkbox {
          background: var(--govt-forest);
          color: #FFFFFF;
          border-color: var(--govt-forest);
        }

        .layer-swatch {
          width: 12px;
          height: 12px;
          border-radius: 2px;
          flex-shrink: 0;
        }

        .layer-name {
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .layer-count {
          font-size: 9.5px;
          font-weight: 700;
          color: var(--text-muted);
          background: var(--bg-surface-subtle);
          padding: 1px 4px;
          border-radius: 2px;
        }

        .risk-scale-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 6px;
          border-top: 1px solid var(--border-subtle);
          font-size: 10px;
        }

        .risk-scale-label {
          font-family: var(--font-mono);
          font-weight: 700;
          color: var(--text-muted);
        }

        .scale-steps {
          display: flex;
          gap: 3px;
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 9px;
        }

        .scale-step {
          padding: 1px 4px;
          border-radius: 2px;
        }
        .scale-step.low { background: #DCFCE7; color: #166534; }
        .scale-step.med { background: #FEF9C3; color: #854D0E; }
        .scale-step.high { background: #FFEDD5; color: #9A3412; }
        .scale-step.crit { background: #FEE2E2; color: #991B1B; }

        @media (max-width: 640px) {
          .map-legend-card {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
