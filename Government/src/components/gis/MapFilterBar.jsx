import React from 'react';
import { Filter, Calendar, Layers, MapPin } from 'lucide-react';

export function MapFilterBar({ filters, onFilterChange }) {
  const animals = [
    { id: 'all', label: 'All Species' },
    { id: 'Cow', label: 'Cattle / Cow' },
    { id: 'Buffalo', label: 'Buffalo' },
    { id: 'Goat', label: 'Goat' },
    { id: 'Sheep', label: 'Sheep' },
    { id: 'Poultry', label: 'Poultry' }
  ];

  const diseases = [
    { id: 'all', label: 'All Diseases' },
    { id: 'FMD', label: 'Foot & Mouth (FMD)' },
    { id: 'PPR', label: 'PPR (Goat Plague)' },
    { id: 'Anthrax', label: 'Anthrax' },
    { id: 'Brucellosis', label: 'Brucellosis' },
    { id: 'LSD', label: 'Lumpy Skin (LSD)' }
  ];

  const timeRanges = [
    { id: 'today', label: 'Today (24h)' },
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: '3m', label: 'Quarter (3M)' }
  ];

  return (
    <div className="map-filter-bar">
      <div className="filter-group">
        <label className="filter-label">
          <Filter size={12} />
          <span>SPECIES:</span>
        </label>
        <select 
          value={filters.animal} 
          onChange={(e) => onFilterChange('animal', e.target.value)}
          className="filter-select"
        >
          {animals.map(a => (
            <option key={a.id} value={a.id}>{a.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">
          <span>DISEASE:</span>
        </label>
        <select 
          value={filters.disease} 
          onChange={(e) => onFilterChange('disease', e.target.value)}
          className="filter-select"
        >
          {diseases.map(d => (
            <option key={d.id} value={d.id}>{d.label}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label">
          <Calendar size={12} />
          <span>WINDOW:</span>
        </label>
        <div className="time-pill-group">
          {timeRanges.map(t => (
            <button
              key={t.id}
              className={`time-pill ${filters.timeRange === t.id ? 'active' : ''}`}
              onClick={() => onFilterChange('timeRange', t.id)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .map-filter-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 14px;
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-label {
          display: flex;
          align-items: center;
          gap: 4px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-muted);
          letter-spacing: 0.05em;
        }

        .filter-select {
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-strong);
          border-radius: 3px;
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          outline: none;
        }
        .filter-select:focus {
          border-color: var(--govt-forest);
        }

        .time-pill-group {
          display: flex;
          gap: 4px;
        }

        .time-pill {
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 600;
          padding: 3px 8px;
          border-radius: 3px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface-elevated);
          color: var(--text-secondary);
          transition: all 0.12s;
        }
        .time-pill:hover {
          color: var(--text-primary);
          border-color: var(--border-strong);
        }
        .time-pill.active {
          background: var(--govt-forest);
          color: #FFFFFF;
          border-color: var(--govt-forest-dark);
        }
      `}</style>
    </div>
  );
}
