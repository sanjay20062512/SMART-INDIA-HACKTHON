/**
 * Login Page JS — handles form interaction, validation,
 * auth service call, theme toggle, and navigation to dashboard.
 */
import { authService } from '../services/authService.js';

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('VET_THEME', theme);
  const btn = document.getElementById('loginThemeBtn');
  if (btn) {
    btn.innerHTML = theme === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  }
}

function showError(msg) {
  const banner = document.getElementById('loginErrorBanner');
  const msgEl  = document.getElementById('loginErrorMsg');
  if (!banner || !msgEl) return;
  msgEl.textContent = msg;
  banner.classList.add('visible');
}

function clearError() {
  document.getElementById('loginErrorBanner')?.classList.remove('visible');
  document.getElementById('loginIdentifier')?.classList.remove('has-error');
  document.getElementById('loginPassword')?.classList.remove('has-error');
}

function setLoading(loading) {
  const btn = document.getElementById('loginSubmitBtn');
  if (!btn) return;
  btn.disabled = loading;
  btn.classList.toggle('loading', loading);
}

export function initLoginPage() {
  // Theme from storage or default dark
  const savedTheme = localStorage.getItem('VET_THEME') || 'dark';
  applyTheme(savedTheme);

  // If already authenticated, go straight to dashboard
  if (authService.isAuthenticated()) {
    window.location.hash = '#dashboard';
    return;
  }

  renderLoginPage();
}

function renderLoginPage() {
  document.getElementById('app').innerHTML = `
    <div class="login-page">
      <!-- LEFT: Dark Green Branding Panel -->
      <div class="login-left-panel">
        <div class="login-panel-pattern"></div>
        <div class="login-circle-1"></div>
        <div class="login-circle-2"></div>
        <div class="login-circle-3"></div>

        <!-- Brand Mark -->
        <div class="login-brand">
          <div class="login-brand-icon">
            <i class="fa-solid fa-notes-medical"></i>
          </div>
          <div>
            <span class="login-brand-name">VET WORKSTATION</span>
            <span class="login-brand-sub">Animal Health Surveillance System</span>
          </div>
        </div>

        <!-- Hero Content -->
        <div class="login-hero-content">
          <div class="login-illustration">
            <div class="illus-icon-box">
              <i class="fa-solid fa-stethoscope"></i>
            </div>
            <div class="illus-icon-box">
              <i class="fa-solid fa-vial-virus"></i>
            </div>
            <div class="illus-icon-box">
              <i class="fa-solid fa-heart-pulse"></i>
            </div>
          </div>

          <h1 class="login-tagline">
            Smarter Care.<br>
            <span>Healthier Livestock.</span>
          </h1>

          <p class="login-desc">
            Empowering veterinarians with intelligent clinical decision support,
            real-time epidemic surveillance, and streamlined field operations.
          </p>
        </div>

        <!-- Stats Row -->
        <div class="login-stats-row">
          <div class="login-stat">
            <span class="login-stat-num">2,400+</span>
            <span class="login-stat-lbl">Cases Managed</span>
          </div>
          <div class="login-stat">
            <span class="login-stat-num">18</span>
            <span class="login-stat-lbl">Districts Covered</span>
          </div>
          <div class="login-stat">
            <span class="login-stat-num">94%</span>
            <span class="login-stat-lbl">Early Detection Rate</span>
          </div>
        </div>
      </div>

      <!-- RIGHT: Login Form -->
      <div class="login-right-panel">
        <!-- Theme Toggle Icon — top-right corner only -->
        <button class="login-theme-btn" id="loginThemeBtn" title="Toggle Theme">
          <i class="fa-solid fa-sun"></i>
        </button>

        <div class="login-card">
          <!-- Header -->
          <div class="login-card-header">
            <div class="login-portal-badge">
              <i class="fa-solid fa-user-doctor"></i>
              Veterinarian Portal
            </div>
            <h2 class="login-welcome-title">Welcome back, Doctor</h2>
            <p class="login-welcome-sub">Sign in to continue to your clinical workspace.</p>
          </div>

          <!-- Error Banner -->
          <div class="login-error-banner" id="loginErrorBanner" role="alert">
            <i class="fa-solid fa-circle-exclamation"></i>
            <span id="loginErrorMsg"></span>
          </div>

          <!-- Login Form -->
          <form class="login-form" id="loginForm" novalidate>
            <!-- Email / Mobile -->
            <div class="login-input-group">
              <label class="login-input-label" for="loginIdentifier">Email or Mobile Number</label>
              <input
                type="text"
                id="loginIdentifier"
                class="login-input"
                placeholder="dr.name@vetportal.in or 98XXXXXXXX"
                autocomplete="username"
                required
              />
            </div>

            <!-- Password -->
            <div class="login-input-group">
              <label class="login-input-label" for="loginPassword">Password</label>
              <div class="login-pw-wrapper">
                <input
                  type="password"
                  id="loginPassword"
                  class="login-input"
                  placeholder="Enter your password"
                  autocomplete="current-password"
                  required
                />
                <button type="button" class="login-pw-toggle" id="pwToggleBtn" aria-label="Show password">
                  <i class="fa-regular fa-eye" id="pwToggleIcon"></i>
                </button>
              </div>
            </div>

            <!-- Remember + Forgot -->
            <div class="login-options-row">
              <label class="login-remember">
                <input type="checkbox" id="rememberMe" />
                <span>Remember me</span>
              </label>
              <button type="button" class="login-forgot-link" id="forgotPwBtn">Forgot Password?</button>
            </div>

            <!-- Submit -->
            <button type="submit" class="login-submit-btn" id="loginSubmitBtn">
              <div class="login-spinner"></div>
              <span class="btn-text">Sign In</span>
              <i class="fa-solid fa-arrow-right btn-text"></i>
            </button>
          </form>

          <!-- Footer -->
          <div class="login-footer-note">
            <i class="fa-solid fa-lock" style="color: var(--primary);"></i>
            Authorized veterinarian access only
          </div>
        </div>
      </div>
    </div>
  `;

  // Set correct icon for current theme
  const currentTheme = localStorage.getItem('VET_THEME') || 'dark';
  const themeBtn = document.getElementById('loginThemeBtn');
  if (themeBtn) {
    themeBtn.innerHTML = currentTheme === 'dark'
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
  }

  bindLoginEvents();
}

function bindLoginEvents() {
  // Theme toggle — icon only, no text
  document.getElementById('loginThemeBtn')?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  // Show / hide password
  const pwToggleBtn  = document.getElementById('pwToggleBtn');
  const pwInput      = document.getElementById('loginPassword');
  const pwToggleIcon = document.getElementById('pwToggleIcon');

  pwToggleBtn?.addEventListener('click', () => {
    const isHidden = pwInput.type === 'password';
    pwInput.type = isHidden ? 'text' : 'password';
    pwToggleIcon.className = isHidden ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye';
    pwToggleBtn.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
  });

  // Clear error on typing
  document.getElementById('loginIdentifier')?.addEventListener('input', clearError);
  document.getElementById('loginPassword')?.addEventListener('input', clearError);

  // Forgot password
  document.getElementById('forgotPwBtn')?.addEventListener('click', () => {
    alert('Password reset: Contact your district AHD administrator or email sih-support@vetportal.in.');
  });

  // Form submission
  document.getElementById('loginForm')?.addEventListener('submit', handleLoginSubmit);
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  clearError();

  const identifier = document.getElementById('loginIdentifier').value.trim();
  const password   = document.getElementById('loginPassword').value;

  // Basic client-side validation
  if (!identifier) {
    document.getElementById('loginIdentifier').classList.add('has-error');
    showError('Please enter your email address or mobile number.');
    return;
  }

  if (!password || password.length < 4) {
    document.getElementById('loginPassword').classList.add('has-error');
    showError('Please enter your password.');
    return;
  }

  setLoading(true);

  try {
    const result = await authService.login(identifier, password);

    if (!result.success) {
      document.getElementById('loginIdentifier').classList.add('has-error');
      document.getElementById('loginPassword').classList.add('has-error');
      showError(result.error);
      return;
    }

    // Navigate to the main app
    window.location.href = 'app.html';
  } catch (err) {
    showError('Connection error. Please try again.');
  } finally {
    setLoading(false);
  }
}
