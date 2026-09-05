import React from 'react';
import {
  LayoutDashboard,
  Activity,
  AlertOctagon,
  Radar,
  Syringe,
  Boxes,
  LineChart,
  FileCheck2,
  Radio,
  Microscope,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

export function Sidebar({ 
  activeTab, 
  onNavigate, 
  isMobileOpen, 
  onCloseMobile,
  isCollapsed,
  onToggleCollapse 
}) {
  const primaryNav = [
    { id: 'dashboard', num: '01', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'risk', num: '02', label: 'Risk Intelligence', icon: Activity },
    { id: 'outbreaks', num: '03', label: 'Outbreaks', icon: AlertOctagon, badge: '5 ACTIVE' },
    { id: 'surveillance', num: '04', label: 'Surveillance', icon: Radar },
    { id: 'campaigns', num: '05', label: 'Campaigns', icon: Syringe },
    { id: 'resources', num: '06', label: 'Resources', icon: Boxes },
    { id: 'analytics', num: '07', label: 'Analytics', icon: LineChart },
    { id: 'reports', num: '08', label: 'Reports', icon: FileCheck2 }
  ];

  const secondaryNav = [
    { id: 'alerts', label: 'Alerts & Broadcast', icon: Radio, badge: 'SMS/IVR' },
    { id: 'laboratory', label: 'Laboratory Workload', icon: Microscope },
    { id: 'teams', label: 'Veterinary Teams', icon: Users },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  const handleNavClick = (id) => {
    onNavigate(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div className="sidebar-backdrop" onClick={onCloseMobile} />
      )}

      <aside className={`gov-sidebar ${isMobileOpen ? 'mobile-open' : ''} ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-inner">
          {/* Primary Nav Section */}
          <div className="nav-group">
            <div className="nav-group-header">
              {!isCollapsed && <span className="nav-group-title">COMMAND MODULES</span>}
              <button 
                className="collapse-toggle-btn"
                onClick={onToggleCollapse}
                title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
              </button>
            </div>

            <nav className="nav-list">
              {primaryNav.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-item ${isActive ? 'active' : ''}`}
                    title={item.label}
                  >
                    <span className="nav-number tabular-nums">{item.num}</span>
                    <Icon size={18} className="nav-icon" />
                    {!isCollapsed && (
                      <span className="nav-label">{item.label}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span className="nav-pill-badge">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Secondary Nav Section */}
          <div className="nav-group secondary-group">
            {!isCollapsed && (
              <div className="nav-group-header">
                <span className="nav-group-title">FIELD OPERATIONS</span>
              </div>
            )}

            <nav className="nav-list">
              {secondaryNav.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`nav-item secondary ${isActive ? 'active' : ''}`}
                    title={item.label}
                  >
                    <Icon size={17} className="nav-icon" />
                    {!isCollapsed && (
                      <span className="nav-label">{item.label}</span>
                    )}
                    {!isCollapsed && item.badge && (
                      <span className="nav-sub-pill">{item.badge}</span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Footer Clearance */}
          {!isCollapsed && (
            <div className="sidebar-foot">
              <div className="clearance-banner">
                <div className="clearance-head">
                  <span className="clearance-dot" />
                  <span className="clearance-title">DISASTER PROTOCOL</span>
                </div>
                <p className="clearance-desc">
                  Level 3 Epizootic Watch active in Perundurai / Bhavani corridor.
                </p>
              </div>
            </div>
          )}
        </div>

        <style>{`
          .gov-sidebar {
            width: var(--sidebar-width);
            background-color: var(--bg-surface);
            border-right: 1px solid var(--border-subtle);
            flex-shrink: 0;
            display: flex;
            flex-direction: column;
            transition: width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
            user-select: none;
          }

          .gov-sidebar.collapsed {
            width: var(--sidebar-collapsed-width);
          }

          .sidebar-inner {
            display: flex;
            flex-direction: column;
            height: calc(100vh - var(--header-height));
            position: sticky;
            top: var(--header-height);
            padding: 14px 10px;
            overflow-y: auto;
          }

          .nav-group {
            margin-bottom: 20px;
          }

          .nav-group-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 4px 8px 8px;
          }

          .nav-group-title {
            font-family: var(--font-mono);
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.08em;
            color: var(--text-muted);
          }

          .collapse-toggle-btn {
            color: var(--text-muted);
            padding: 2px 4px;
            border-radius: 3px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.15s;
          }
          .collapse-toggle-btn:hover {
            color: var(--text-primary);
            background-color: var(--bg-surface-subtle);
          }

          .nav-list {
            display: flex;
            flex-direction: column;
            gap: 2px;
          }

          .nav-item {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 10px;
            border-radius: 4px;
            color: var(--text-secondary);
            font-size: 13px;
            font-weight: 500;
            transition: all 0.12s ease;
            position: relative;
            text-align: left;
            width: 100%;
          }

          .nav-item:hover {
            background-color: var(--bg-surface-subtle);
            color: var(--text-primary);
          }

          .nav-item.active {
            background-color: var(--govt-forest-tint);
            color: var(--govt-forest);
            font-weight: 600;
          }

          .nav-item.active::before {
            content: '';
            position: absolute;
            left: 0;
            top: 4px;
            bottom: 4px;
            width: 3px;
            background-color: var(--govt-forest);
            border-radius: 0 2px 2px 0;
          }

          .nav-number {
            font-family: var(--font-mono);
            font-size: 10.5px;
            font-weight: 700;
            color: var(--text-muted);
            width: 18px;
          }
          .nav-item.active .nav-number {
            color: var(--govt-forest);
          }

          .nav-icon {
            flex-shrink: 0;
            color: var(--text-muted);
          }
          .nav-item:hover .nav-icon {
            color: var(--text-primary);
          }
          .nav-item.active .nav-icon {
            color: var(--govt-forest);
          }

          .nav-label {
            flex: 1;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .nav-pill-badge {
            font-family: var(--font-mono);
            font-size: 9px;
            font-weight: 700;
            padding: 2px 5px;
            border-radius: 3px;
            background-color: var(--status-critical-bg);
            color: var(--status-critical);
            border: 1px solid var(--status-critical-border);
          }

          .nav-sub-pill {
            font-family: var(--font-mono);
            font-size: 9px;
            font-weight: 600;
            padding: 1px 4px;
            border-radius: 2px;
            background-color: var(--bg-surface-subtle);
            color: var(--text-muted);
            border: 1px solid var(--border-subtle);
          }

          .secondary-group {
            margin-top: auto;
            border-top: 1px solid var(--border-subtle);
            padding-top: 14px;
          }

          .sidebar-foot {
            margin-top: 10px;
            padding: 6px 2px;
          }

          .clearance-banner {
            background-color: var(--bg-surface-subtle);
            border: 1px solid var(--border-subtle);
            border-left: 3px solid var(--status-warning);
            padding: 8px 10px;
            border-radius: 3px;
          }

          .clearance-head {
            display: flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 3px;
          }

          .clearance-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background-color: var(--status-warning);
          }

          .clearance-title {
            font-family: var(--font-mono);
            font-size: 9.5px;
            font-weight: 700;
            color: var(--text-primary);
            letter-spacing: 0.05em;
          }

          .clearance-desc {
            font-size: 10.5px;
            color: var(--text-secondary);
            line-height: 1.3;
          }

          /* Mobile Sidebar Styles */
          .sidebar-backdrop {
            display: none;
            position: fixed;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(2px);
            z-index: 998;
          }

          @media (max-width: 860px) {
            .gov-sidebar {
              position: fixed;
              top: var(--header-height);
              bottom: 0;
              left: 0;
              z-index: 999;
              transform: translateX(-100%);
              box-shadow: var(--shadow-lg);
            }
            .gov-sidebar.mobile-open {
              transform: translateX(0);
            }
            .sidebar-backdrop {
              display: block;
            }
            .collapse-toggle-btn {
              display: none;
            }
          }
        `}</style>
      </aside>
    </>
  );
}
