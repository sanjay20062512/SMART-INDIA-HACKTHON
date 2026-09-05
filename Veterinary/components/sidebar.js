/**
 * Sidebar Component - Dark Green Visual Identity with Collapsible Support
 */

export function renderSidebar(currentTab = 'dashboard', newCasesCount = 0) {
  const isCollapsed = localStorage.getItem('VET_SIDEBAR_COLLAPSED') === 'true';

  const navItems = [
    { id: 'dashboard', label: 'Clinical Workspace', icon: 'fa-chart-pie' },
    { id: 'cases', label: 'Case Management', icon: 'fa-stethoscope', badge: newCasesCount ? `${newCasesCount} New` : null },
    { id: 'animals', label: 'Animal Profile', icon: 'fa-paw' },
    { id: 'treatments', label: 'Treatment Plan', icon: 'fa-prescription' },
    { id: 'laboratory', label: 'Lab Workflow', icon: 'fa-vial-virus' },
    { id: 'field-visits', label: 'Field Route', icon: 'fa-route' },
    { id: 'alerts', label: 'Government Escalation', icon: 'fa-shield-halved' },
    { id: 'profile', label: 'Vet Credentials', icon: 'fa-id-card' },
    { id: 'settings', label: 'Settings', icon: 'fa-sliders' }
  ];

  return `
    <aside class="sidebar ${isCollapsed ? 'collapsed' : ''}" id="sidebar">
      <div class="sidebar-brand">
        <div class="brand-icon" title="Veterinarian Workstation">
          <i class="fa-solid fa-notes-medical"></i>
        </div>
        <div class="brand-text">
          <span class="brand-title">VET WORKSTATION</span>
          <span class="brand-subtitle">Clinical & Field Response</span>
        </div>
      </div>

      <nav class="sidebar-nav">
        <ul>
          ${navItems.map(item => `
            <li>
              <button class="nav-item ${currentTab === item.id ? 'active' : ''}" data-page="${item.id}" title="${item.label}">
                <i class="fa-solid ${item.icon} nav-icon"></i>
                <span class="nav-label">${item.label}</span>
                ${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}
              </button>
            </li>
          `).join('')}
        </ul>
      </nav>

      <div class="sidebar-footer">
        <div class="user-chip" title="Dr. Anita Sharma — Senior Vet Officer">
          <div class="avatar">DA</div>
          <div class="user-info">
            <span class="user-name">Dr. Anita Sharma</span>
            <span class="user-role">Senior Vet Officer</span>
          </div>
        </div>
        <button class="btn-logout" id="btnLogout" title="Logout">
          <i class="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </div>
    </aside>
    <div class="sidebar-backdrop" id="sidebarBackdrop"></div>
  `;
}

