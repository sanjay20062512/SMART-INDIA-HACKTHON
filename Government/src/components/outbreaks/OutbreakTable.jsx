import React, { useState } from 'react';
import { 
  Search, 
  ArrowUpDown, 
  ShieldAlert, 
  Users, 
  Radio, 
  MapPin, 
  Filter,
  Eye
} from 'lucide-react';
import { Badge } from '../common/Badge';

export function OutbreakTable({ outbreaks, onAction }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortField, setSortField] = useState('riskScore');
  const [sortAsc, setSortAsc] = useState(false);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const filtered = outbreaks.filter(ob => {
    const matchesSearch = 
      ob.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ob.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ob.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ob.species.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || ob.status.toLowerCase().replace(' ', '_') === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  }).sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];
    if (typeof valA === 'string') valA = valA.toLowerCase();
    if (typeof valB === 'string') valB = valB.toLowerCase();
    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="panel outbreak-registry-panel">
      <div className="panel-header">
        <div className="registry-title-wrap">
          <span className="system-label">ACTIVE SURVEILLANCE DIRECTORY</span>
          <h3 className="section-title">
            <span>LIVE OUTBREAK INCIDENT REGISTRY</span>
          </h3>
        </div>

        <div className="registry-controls">
          <div className="search-box">
            <Search size={14} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by ID, village, or disease..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-pill-wrap">
            {['ALL', 'Under Investigation', 'Sample Testing', 'Quarantine Active'].map(st => (
              <button
                key={st}
                className={`filter-btn ${statusFilter === st ? 'active' : ''}`}
                onClick={() => setStatusFilter(st)}
              >
                {st === 'ALL' ? 'All Incidents' : st}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="cursor-pointer">
                <div className="th-wrap">
                  <span>ID</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th onClick={() => handleSort('location')} className="cursor-pointer">
                <div className="th-wrap">
                  <span>LOCATION / BLOCK</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th onClick={() => handleSort('disease')} className="cursor-pointer">
                <div className="th-wrap">
                  <span>DISEASE PATHOGEN</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th onClick={() => handleSort('animalsAffected')} className="cursor-pointer">
                <div className="th-wrap">
                  <span>AFFECTED</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th onClick={() => handleSort('mortality')} className="cursor-pointer">
                <div className="th-wrap">
                  <span>MORTALITY</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th onClick={() => handleSort('riskScore')} className="cursor-pointer">
                <div className="th-wrap">
                  <span>RISK THREAT</span>
                  <ArrowUpDown size={11} />
                </div>
              </th>
              <th>STATUS</th>
              <th>ASSIGNED VET TEAM</th>
              <th>LAST TELEMETRY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(ob => (
              <tr key={ob.id} className={ob.riskLevel === 'CRITICAL' ? 'row-critical' : ''}>
                <td className="font-mono font-bold">{ob.id}</td>
                <td>
                  <div className="loc-cell">
                    <span className="loc-name">{ob.location}</span>
                    <span className="loc-sub">{ob.block} Block</span>
                  </div>
                </td>
                <td>
                  <div className="disease-cell">
                    <span className="disease-name">{ob.disease}</span>
                    <span className="species-tag">{ob.species}</span>
                  </div>
                </td>
                <td className="font-mono font-bold tabular-nums">{ob.animalsAffected}</td>
                <td className="font-mono font-bold tabular-nums text-critical">{ob.mortality}</td>
                <td>
                  <div className="risk-cell">
                    <Badge variant={ob.riskLevel}>{ob.riskLevel}</Badge>
                    <span className="risk-num font-mono">{ob.riskScore}/100</span>
                  </div>
                </td>
                <td>
                  <span className="status-cell font-mono">{ob.status}</span>
                </td>
                <td>
                  <span className="team-cell">{ob.assignedTeam}</span>
                </td>
                <td className="font-mono text-muted">{ob.lastUpdate}</td>
                <td>
                  <div className="row-actions">
                    <button 
                      className="btn btn-secondary btn-sm"
                      onClick={() => onAction('view_case', ob)}
                      title="Inspect Case"
                    >
                      <Eye size={12} />
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => onAction('assign_team', ob)}
                      title="Assign Veterinary Unit"
                    >
                      <Users size={12} />
                    </button>
                    <button 
                      className="btn btn-critical btn-sm"
                      onClick={() => onAction('containment', ob)}
                      title="Enforce Containment Zone"
                    >
                      <ShieldAlert size={12} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style>{`
        .outbreak-registry-panel {
          margin-bottom: 24px;
        }

        .registry-controls {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .search-box {
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          padding: 4px 10px;
          gap: 6px;
        }

        .search-icon {
          color: var(--text-muted);
        }

        .search-input {
          border: none;
          outline: none;
          font-size: 12px;
          width: 220px;
          background: transparent;
        }

        .filter-pill-wrap {
          display: flex;
          gap: 4px;
        }

        .filter-btn {
          font-family: var(--font-mono);
          font-size: 10.5px;
          font-weight: 600;
          padding: 4px 8px;
          border-radius: 3px;
          border: 1px solid var(--border-subtle);
          background: var(--bg-surface);
          color: var(--text-secondary);
        }
        .filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--border-strong);
        }
        .filter-btn.active {
          background: var(--govt-forest);
          color: #FFFFFF;
          border-color: var(--govt-forest-dark);
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .th-wrap {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .loc-cell, .disease-cell {
          display: flex;
          flex-direction: column;
        }

        .loc-name, .disease-name {
          font-weight: 600;
          color: var(--text-primary);
        }

        .loc-sub, .species-tag {
          font-size: 11px;
          color: var(--text-muted);
        }

        .risk-cell {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .risk-num {
          font-size: 10.5px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .status-cell {
          font-size: 11.5px;
        }

        .team-cell {
          font-size: 12px;
          color: var(--text-secondary);
        }

        .row-critical {
          background-color: rgba(254, 242, 242, 0.4);
        }

        .row-actions {
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </div>
  );
}
