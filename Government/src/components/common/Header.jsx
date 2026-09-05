import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Bell, 
  ChevronDown, 
  Globe, 
  Clock, 
  Activity, 
  UserCheck, 
  Menu, 
  X,
  AlertTriangle,
  FileText,
  MapPin
} from 'lucide-react';
import { Badge } from './Badge';

export function Header({ 
  jurisdiction, 
  onJurisdictionChange, 
  jurisdictionData, 
  onToggleSidebar, 
  isMobileSidebarOpen,
  onNavigate 
}) {
  const [currentTime, setCurrentTime] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: false
      };
      setCurrentTime(now.toLocaleString('en-IN', options).toUpperCase() + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const notifications = [
    {
      id: 1,
      type: 'critical',
      title: 'Confirmed FMD Positive (Serotype O)',
      location: 'Perundurai East (Herd #418)',
      time: '12m ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'Anthrax Suspect Sample Dispatched to Ranipet',
      location: 'Sathyamangalam Forest Fringe',
      time: '1h ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'Cold-Chain Vaccine Batch TN-908 Arrived at Erode Poly Clinic',
      location: '5,000 FMD doses verified',
      time: '2h ago'
    }
  ];

  return (
    <header className="gov-header">
      {/* Top Utility Bar */}
      <div className="gov-topbar">
        <div className="gov-topbar-left">
          <div className="national-emblem-text">
            <span className="gov-seal">GOVERNMENT OF TAMIL NADU</span>
            <span className="gov-dept">Department of Animal Husbandry, Dairying, Fisheries and Fishermen Welfare</span>
          </div>
        </div>

        <div className="gov-topbar-right">
          <div className="telemetry-pill">
            <span className="status-dot normal" />
            <span className="telemetry-text">SURVEILLANCE GRID: LIVE</span>
            <span className="telemetry-separator">|</span>
            <Clock size={12} />
            <span className="telemetry-time tabular-nums">{currentTime}</span>
          </div>

          <div className="telemetry-badge">
            <span className="flag-dot" />
            <span>NADSS T-1 NODE</span>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="gov-main-header">
        <div className="gov-brand">
          <button 
            className="mobile-menu-btn" 
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
          >
            {isMobileSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div className="brand-logo-cluster">
            <div className="brand-shield">
              <ShieldAlert size={22} className="shield-icon" />
            </div>
            <div className="brand-titles">
              <h1 className="brand-app-name">Animal Health Command Center</h1>
              <p className="brand-app-subtitle">
                Real-Time Livestock Disease Surveillance & Coordinated Response System
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Jurisdiction Selector Breadcrumb */}
        <div className="gov-jurisdiction-bar">
          <div className="jurisdiction-label">
            <MapPin size={14} className="pin-icon" />
            <span>JURISDICTION:</span>
          </div>

          <div className="jurisdiction-selectors">
            {/* State */}
            <div className="selector-group">
              <span className="crumb-tag">STATE</span>
              <span className="crumb-val">{jurisdictionData.state}</span>
            </div>

            <span className="crumb-divider">/</span>

            {/* District */}
            <div className="selector-group">
              <span className="crumb-tag">DISTRICT</span>
              <select 
                value={jurisdiction.districtId} 
                onChange={(e) => onJurisdictionChange('districtId', e.target.value)}
                className="header-select"
              >
                {jurisdictionData.districts.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <span className="crumb-divider">/</span>

            {/* Block */}
            <div className="selector-group">
              <span className="crumb-tag">BLOCK</span>
              <select 
                value={jurisdiction.blockId} 
                onChange={(e) => onJurisdictionChange('blockId', e.target.value)}
                className="header-select"
              >
                <option value="all">All Blocks</option>
                {jurisdictionData.districts
                  .find(d => d.id === jurisdiction.districtId)?.blocks?.map(b => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
              </select>
            </div>

            <span className="crumb-divider">/</span>

            {/* Village */}
            <div className="selector-group">
              <span className="crumb-tag">VILLAGE</span>
              <select 
                value={jurisdiction.villageId} 
                onChange={(e) => onJurisdictionChange('villageId', e.target.value)}
                className="header-select"
              >
                <option value="all">All Villages / Panchayats</option>
                {jurisdictionData.districts
                  .find(d => d.id === jurisdiction.districtId)
                  ?.blocks?.find(b => b.id === jurisdiction.blockId)
                  ?.villages?.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
              </select>
            </div>
          </div>
        </div>

        {/* Top Actions: Alerts & Profile */}
        <div className="gov-header-actions">
          {/* Notifications Trigger */}
          <div className="action-popover-wrapper">
            <button 
              className={`icon-action-btn ${showNotifications ? 'active' : ''}`}
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfile(false);
              }}
              title="Official Surveillance Alerts"
            >
              <Bell size={18} />
              <span className="notification-indicator">3</span>
            </button>

            {showNotifications && (
              <div className="dropdown-panel notifications-dropdown">
                <div className="dropdown-head">
                  <div className="dropdown-title">
                    <AlertTriangle size={15} color="var(--status-critical)" />
                    <span>EMERGENCY NOTIFICATIONS (3)</span>
                  </div>
                  <span className="tag-mono">LIVE FEED</span>
                </div>
                <div className="dropdown-list">
                  {notifications.map(n => (
                    <div 
                      key={n.id} 
                      className={`notification-item ${n.type}`}
                      onClick={() => {
                        setShowNotifications(false);
                        onNavigate('outbreaks');
                      }}
                    >
                      <div className="item-meta">
                        <span className={`status-dot ${n.type}`} />
                        <span className="item-time">{n.time}</span>
                      </div>
                      <h4 className="item-title">{n.title}</h4>
                      <p className="item-loc">{n.location}</p>
                    </div>
                  ))}
                </div>
                <div className="dropdown-foot">
                  <button 
                    className="dropdown-foot-btn"
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('alerts');
                    }}
                  >
                    View All Advisories & Broadcasts →
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Official Officer Profile */}
          <div className="action-popover-wrapper">
            <button 
              className="officer-profile-btn"
              onClick={() => {
                setShowProfile(!showProfile);
                setShowNotifications(false);
              }}
            >
              <div className="officer-avatar">
                SR
              </div>
              <div className="officer-meta">
                <span className="officer-name">Dr. S. Ramakrishnan</span>
                <span className="officer-role">Joint Director (Epizootiology)</span>
              </div>
              <ChevronDown size={14} className="meta-arrow" />
            </button>

            {showProfile && (
              <div className="dropdown-panel profile-dropdown">
                <div className="profile-card-head">
                  <div className="large-avatar">SR</div>
                  <div>
                    <h3 className="profile-name">Dr. S. Ramakrishnan, M.V.Sc.</h3>
                    <p className="profile-desig">Joint Director of Animal Husbandry</p>
                    <p className="profile-dept">Erode Epizootic Surveillance Command</p>
                  </div>
                </div>
                <div className="profile-details">
                  <div className="detail-row">
                    <span className="detail-key">GOVT ID:</span>
                    <span className="detail-val font-mono">TN-AH-09418</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-key">CLEARANCE:</span>
                    <span className="detail-val badge-normal badge">Level 4 (State Authority)</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-key">DISPATCH ACCESS:</span>
                    <span className="detail-val">Rapid Response & Quarantine</span>
                  </div>
                </div>
                <div className="profile-actions">
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => {
                      setShowProfile(false);
                      onNavigate('settings');
                    }}
                  >
                    Operational Settings
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        .gov-header {
          background-color: var(--bg-surface);
          border-bottom: 1px solid var(--border-subtle);
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: var(--shadow-sm);
        }

        /* Topbar */
        .gov-topbar {
          background-color: var(--govt-navy-dark);
          color: #E2E8F0;
          padding: 4px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 11px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .gov-seal {
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #F8FAFC;
          margin-right: 8px;
        }

        .gov-dept {
          color: #94A3B8;
        }

        .gov-topbar-right {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .telemetry-pill {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 10.5px;
          color: #CBD5E1;
        }

        .telemetry-separator {
          color: rgba(255, 255, 255, 0.2);
        }

        .telemetry-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 7px;
          border-radius: 2px;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .flag-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #38BDF8;
        }

        /* Main Header */
        .gov-main-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 24px;
          gap: 16px;
          min-height: 64px;
        }

        .gov-brand {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .mobile-menu-btn {
          display: none;
          padding: 6px;
          color: var(--text-primary);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
        }

        .brand-logo-cluster {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-shield {
          width: 38px;
          height: 38px;
          background-color: var(--govt-forest);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          box-shadow: 0 2px 4px rgba(27, 67, 50, 0.2);
        }

        .brand-app-name {
          font-family: var(--font-heading);
          font-size: 17px;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1.2;
          letter-spacing: -0.01em;
        }

        .brand-app-subtitle {
          font-size: 11.5px;
          color: var(--text-secondary);
          line-height: 1.2;
        }

        /* Jurisdiction Bar */
        .gov-jurisdiction-bar {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: var(--bg-surface-elevated);
          padding: 6px 14px;
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
        }

        .jurisdiction-label {
          display: flex;
          align-items: center;
          gap: 5px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          color: var(--govt-forest);
          letter-spacing: 0.04em;
        }

        .pin-icon {
          color: var(--govt-forest);
        }

        .jurisdiction-selectors {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .selector-group {
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .crumb-tag {
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          color: var(--text-muted);
        }

        .crumb-val {
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
        }

        .crumb-divider {
          color: var(--border-strong);
          font-size: 12px;
        }

        .header-select {
          background-color: var(--bg-surface);
          border: 1px solid var(--border-strong);
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
          padding: 3px 6px;
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }
        .header-select:focus {
          border-color: var(--govt-forest);
        }

        /* Actions & Profile */
        .gov-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .action-popover-wrapper {
          position: relative;
        }

        .icon-action-btn {
          width: 36px;
          height: 36px;
          border-radius: 4px;
          border: 1px solid var(--border-subtle);
          background-color: var(--bg-surface);
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          transition: all 0.15s;
        }
        .icon-action-btn:hover, .icon-action-btn.active {
          background-color: var(--bg-surface-subtle);
          border-color: var(--border-strong);
          color: var(--text-primary);
        }

        .notification-indicator {
          position: absolute;
          top: -4px;
          right: -4px;
          background-color: var(--status-critical);
          color: #FFFFFF;
          font-family: var(--font-mono);
          font-size: 10px;
          font-weight: 700;
          padding: 1px 5px;
          border-radius: 10px;
          border: 2px solid var(--bg-surface);
        }

        .officer-profile-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 4px 10px 4px 5px;
          background-color: var(--bg-surface-elevated);
          border: 1px solid var(--border-subtle);
          border-radius: 4px;
          transition: all 0.15s;
        }
        .officer-profile-btn:hover {
          border-color: var(--border-strong);
          background-color: var(--bg-surface-subtle);
        }

        .officer-avatar {
          width: 30px;
          height: 30px;
          background-color: var(--govt-navy);
          color: #FFFFFF;
          border-radius: 3px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 11.5px;
          font-family: var(--font-mono);
        }

        .officer-meta {
          text-align: left;
        }

        .officer-name {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.2;
        }

        .officer-role {
          display: block;
          font-size: 10.5px;
          color: var(--text-muted);
          line-height: 1.2;
        }

        .meta-arrow {
          color: var(--text-muted);
        }

        /* Dropdown panels */
        .dropdown-panel {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 350px;
          background-color: var(--bg-surface);
          border: 1px solid var(--border-strong);
          border-radius: 4px;
          box-shadow: var(--shadow-lg);
          z-index: 1100;
          animation: drop-fade 0.15s ease-out;
        }

        @keyframes drop-fade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-head {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border-subtle);
          background-color: var(--bg-surface-elevated);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .dropdown-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--text-primary);
        }

        .tag-mono {
          font-family: var(--font-mono);
          font-size: 9.5px;
          background: var(--govt-forest-tint);
          color: var(--govt-forest);
          padding: 2px 6px;
          border-radius: 2px;
          font-weight: 700;
        }

        .dropdown-list {
          max-height: 280px;
          overflow-y: auto;
        }

        .notification-item {
          padding: 12px 14px;
          border-bottom: 1px solid var(--border-subtle);
          cursor: pointer;
          transition: background 0.15s;
        }
        .notification-item:hover {
          background-color: #FAF9F5;
        }

        .item-meta {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 4px;
        }

        .item-time {
          font-family: var(--font-mono);
          font-size: 10px;
          color: var(--text-muted);
        }

        .item-title {
          font-size: 12px;
          font-weight: 600;
          color: var(--text-primary);
          line-height: 1.3;
        }

        .item-loc {
          font-size: 11.5px;
          color: var(--text-secondary);
          margin-top: 2px;
        }

        .dropdown-foot {
          padding: 8px 14px;
          border-top: 1px solid var(--border-subtle);
          background-color: var(--bg-surface-elevated);
          text-align: center;
        }

        .dropdown-foot-btn {
          font-size: 11.5px;
          font-weight: 600;
          color: var(--govt-forest);
        }
        .dropdown-foot-btn:hover {
          text-decoration: underline;
        }

        /* Profile Dropdown */
        .profile-dropdown {
          width: 320px;
          padding: 16px;
        }

        .profile-card-head {
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--border-subtle);
        }

        .large-avatar {
          width: 44px;
          height: 44px;
          background-color: var(--govt-navy);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 700;
          font-family: var(--font-mono);
          border-radius: 4px;
        }

        .profile-name {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--text-primary);
        }

        .profile-desig {
          font-size: 11.5px;
          color: var(--text-secondary);
        }

        .profile-dept {
          font-size: 10.5px;
          color: var(--text-muted);
        }

        .profile-details {
          padding: 12px 0;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .detail-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 11.5px;
        }

        .detail-key {
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 10px;
        }

        .detail-val {
          font-weight: 600;
          color: var(--text-primary);
        }

        .profile-actions {
          padding-top: 10px;
          border-top: 1px solid var(--border-subtle);
          display: flex;
          justify-content: flex-end;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1180px) {
          .gov-jurisdiction-bar {
            display: none;
          }
        }

        @media (max-width: 860px) {
          .gov-topbar-right {
            display: none;
          }
          .mobile-menu-btn {
            display: flex;
          }
          .officer-meta {
            display: none;
          }
          .brand-app-subtitle {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
