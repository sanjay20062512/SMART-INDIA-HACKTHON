/**
 * Header Component — Clean, professional header layout with collapsible menu toggle,
 * workspace title, compact theme toggle button with icon + text, and profile chip.
 */

export function renderHeader(title = 'Clinical Workspace Overview', subtitle = 'Veterinary Command Center & Triage Queue') {
  const currentTheme = localStorage.getItem('VET_THEME') || 'dark';

  return `
    <header class="top-header">
      <div class="header-left">
        <button class="btn-menu-toggle" id="btnToggleSidebar" aria-label="Toggle menu" title="Toggle sidebar menu">
          <i class="fa-solid fa-bars"></i>
          <span class="menu-btn-text">Menu</span>
        </button>
        <div class="header-title-box">
          <span class="header-workspace-label">
            <i class="fa-solid fa-notes-medical"></i>
            Veterinarian Clinical Workstation
          </span>
          <h1 class="page-title">${title}</h1>
          ${subtitle ? `<p class="page-subtitle">${subtitle}</p>` : ''}
        </div>
      </div>

      <div class="header-right">
        <div class="location-chip">
          <i class="fa-solid fa-location-dot"></i>
          <span>Anand District, GJ</span>
        </div>

        <!-- Compact Theme Toggle Button: ☀ Light Mode / ☾ Dark Mode -->
        <button
          class="theme-toggle-btn"
          id="btnThemeToggle"
          title="${currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}"
        >
          ${currentTheme === 'dark'
            ? '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>'
            : '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>'}
        </button>

        <!-- Profile button -->
        <button class="header-profile-btn" id="btnHeaderProfile" data-page="profile" title="View Vet Credentials">
          <div class="avatar-sm">DA</div>
          <span class="header-profile-name">Dr. Anita</span>
        </button>
      </div>
    </header>
  `;
}

