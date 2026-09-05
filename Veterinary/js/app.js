/**
 * Application Orchestrator & Router
 * Dark Green + White Clinical Workspace Engine
 */

import { renderSidebar } from '../components/sidebar.js';
import { renderHeader } from '../components/header.js';
import { renderDashboardPage } from '../pages/dashboardPage.js';
import { renderCasesPage, renderThreeColumnWorkspace } from '../pages/casesPage.js';
import { renderAnimalsPage, renderAnimalProfileView } from '../pages/animalsPage.js';
import { renderClinicalAssessmentForm } from '../pages/clinicalAssessmentPage.js';
import { renderTreatmentsPage, renderNewTreatmentForm } from '../pages/treatmentsPage.js';
import { renderLaboratoryPage, renderNewLabRequestForm } from '../pages/laboratoryPage.js';
import { renderFieldVisitsPage } from '../pages/fieldVisitsPage.js';
import { renderAlertsPage, renderGovernmentEscalationForm } from '../pages/alertsPage.js';
import { renderProfilePage } from '../pages/profilePage.js';
import { renderSettingsPage } from '../pages/settingsPage.js';
import { caseService } from '../services/caseService.js';
import { animalService } from '../services/animalService.js';
import { treatmentService } from '../services/treatmentService.js';
import { labService } from '../services/labService.js';
import { governmentService } from '../services/governmentService.js';
import { apiService } from '../services/apiService.js';
import { authService } from '../services/authService.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

class App {
  constructor() {
    this.currentTab = 'dashboard';
    this.session = authService.getSession();
    // Auth guard — redirect unauthenticated visitors to login
    if (!this.session) {
      window.location.href = 'index.html';
      return;
    }
    this.initTheme();
    this.init();
  }

  initTheme() {
    const savedTheme = localStorage.getItem('VET_THEME') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  init() {
    this.renderLayout();
    this.bindGlobalEvents();
    this.navigateTo(this.currentTab);
  }

  renderLayout() {
    const metrics = caseService.getDashboardMetrics();
    const sidebarHtml = renderSidebar(this.currentTab, metrics.newCases);
    const headerHtml = renderHeader(this.getPageTitle(this.currentTab), this.getPageSubtitle(this.currentTab));

    document.getElementById('app').innerHTML = `
      <div class="app-container">
        ${sidebarHtml}
        <div class="main-wrapper">
          ${headerHtml}
          <main class="main-content" id="mainContent"></main>
        </div>
      </div>
      <div id="modalContainer"></div>
    `;
  }

  getPageTitle(tab) {
    const titles = {
      dashboard: 'Clinical Workspace Overview',
      cases: 'Case Management Workspace',
      animals: 'Animal Health Profile',
      treatments: 'Clinical Prescriptions & Treatments',
      laboratory: 'Laboratory Workflow',
      'field-visits': "Today's Field Route",
      alerts: 'Government Outbreak Escalation',
      profile: 'Veterinarian Credentials',
      settings: 'System & API Settings'
    };
    return titles[tab] || 'Veterinary Clinical Workstation';
  }

  getPageSubtitle(tab) {
    const subtitles = {
      dashboard: 'Triage Queue & Daily Clinical Timeline',
      cases: 'Three-column clinical workstation & AI decision support',
      animals: 'Rich animal profile & chronological medical history',
      treatments: 'Pharmacological Rx prescription workspace & follow-up planner',
      laboratory: '5-stage diagnostic sample tracking pipeline',
      'field-visits': "District cluster patrol route & farm visits",
      alerts: 'Verified outbreak escalation to State Surveillance Department',
      profile: 'Licensing, qualifications & surveillance credentials',
      settings: 'FastAPI / PostgreSQL REST backend settings'
    };
    return subtitles[tab] || '';
  }

  navigateTo(tab, filter = 'All') {
    this.currentTab = tab;
    const mainContent = document.getElementById('mainContent');
    if (!mainContent) return;

    document.querySelectorAll('.nav-item').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.page === tab);
    });

    const titleEl = document.querySelector('.page-title');
    const subEl = document.querySelector('.page-subtitle');
    if (titleEl) titleEl.textContent = this.getPageTitle(tab);
    if (subEl) subEl.textContent = this.getPageSubtitle(tab);

    switch (tab) {
      case 'dashboard':
        mainContent.innerHTML = renderDashboardPage();
        break;
      case 'cases':
        mainContent.innerHTML = renderCasesPage(filter);
        break;
      case 'animals':
        mainContent.innerHTML = renderAnimalsPage();
        break;
      case 'treatments':
        mainContent.innerHTML = renderTreatmentsPage();
        break;
      case 'laboratory':
        mainContent.innerHTML = renderLaboratoryPage();
        break;
      case 'field-visits':
        mainContent.innerHTML = renderFieldVisitsPage();
        break;
      case 'alerts':
        mainContent.innerHTML = renderAlertsPage();
        break;
      case 'profile':
        mainContent.innerHTML = renderProfilePage();
        break;
      case 'settings':
        mainContent.innerHTML = renderSettingsPage();
        break;
      default:
        mainContent.innerHTML = renderDashboardPage();
    }
  }

  bindGlobalEvents() {
    document.body.addEventListener('click', (e) => {
      // Sidebar Navigation
      const navBtn = e.target.closest('.nav-item');
      if (navBtn) {
        this.navigateTo(navBtn.dataset.page);
        // On mobile viewports, close drawer after navigating
        document.getElementById('sidebar')?.classList.remove('open');
        document.getElementById('sidebarBackdrop')?.classList.remove('open');
        return;
      }

      // Sidebar Collapse / Menu Toggle ([☰ Menu] button)
      if (e.target.closest('#btnToggleSidebar')) {
        const sidebar = document.getElementById('sidebar');
        const backdrop = document.getElementById('sidebarBackdrop');
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
          sidebar?.classList.toggle('open');
          backdrop?.classList.toggle('open');
        } else {
          sidebar?.classList.toggle('collapsed');
          const isCollapsed = sidebar?.classList.contains('collapsed');
          localStorage.setItem('VET_SIDEBAR_COLLAPSED', isCollapsed ? 'true' : 'false');
        }
        return;
      }

      // Mobile Backdrop click
      if (e.target.closest('#sidebarBackdrop')) {
        document.getElementById('sidebar')?.classList.remove('open');
        document.getElementById('sidebarBackdrop')?.classList.remove('open');
        return;
      }

      // Compact Theme toggle button (☀ Light Mode / ☾ Dark Mode)
      if (e.target.closest('#btnThemeToggle')) {
        const current = document.documentElement.getAttribute('data-theme') || 'dark';
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('VET_THEME', next);
        
        // Update button icon + text in-place
        const btn = document.getElementById('btnThemeToggle');
        if (btn) {
          btn.innerHTML = next === 'dark'
            ? '<i class="fa-solid fa-moon"></i> <span>Dark Mode</span>'
            : '<i class="fa-solid fa-sun"></i> <span>Light Mode</span>';
          btn.title = next === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        }
        showToast(next === 'light' ? 'Light Mode active' : 'Dark Mode active', 'info');
        return;
      }

      // Profile Header button
      if (e.target.closest('#btnHeaderProfile')) {
        this.navigateTo('profile');
        return;
      }

      // Logout
      if (e.target.closest('#btnLogout')) {
        authService.logout();
        showToast('Session ended. Redirecting to login...', 'info');
        setTimeout(() => { window.location.href = 'index.html'; }, 900);
        return;
      }

      // Open Case in Workspace
      const openCaseBtn = e.target.closest('.btn-open-case');
      if (openCaseBtn) {
        const caseId = openCaseBtn.dataset.id;
        this.navigateTo('cases');
        setTimeout(() => {
          const selectEl = document.getElementById('caseWorkspaceSelector');
          if (selectEl) {
            selectEl.value = caseId;
            selectEl.dispatchEvent(new Event('change'));
          }
        }, 50);
        return;
      }

      // Filter Buttons in Cases Page
      const filterBtn = e.target.closest('.filter-btn');
      if (filterBtn) {
        this.navigateTo('cases', filterBtn.dataset.filter);
        return;
      }

      // Clinical Workspace Action Buttons
      if (e.target.closest('#btnWsAccept')) {
        const caseId = e.target.closest('#btnWsAccept').dataset.id;
        caseService.acceptCase(caseId);
        showToast(`Case ${caseId} Accepted! Stage updated to Clinical Examination.`, 'success');
        this.navigateTo('cases');
        return;
      }

      if (e.target.closest('#btnWsExam')) {
        const caseId = e.target.closest('#btnWsExam').dataset.id;
        const c = caseService.getCaseById(caseId);
        openModal(`Log Physical Examination: ${caseId}`, renderClinicalAssessmentForm(c), []);
        return;
      }

      if (e.target.closest('#btnWsLab')) {
        const caseId = e.target.closest('#btnWsLab').dataset.id;
        openModal('Initiate Diagnostic Laboratory Request', renderNewLabRequestForm(caseId), []);
        return;
      }

      if (e.target.closest('#btnWsRx')) {
        const caseId = e.target.closest('#btnWsRx').dataset.id;
        openModal('Prescribe Treatment Plan', renderNewTreatmentForm(caseId), []);
        return;
      }

      if (e.target.closest('#btnWsVisit')) {
        const caseId = e.target.closest('#btnWsVisit').dataset.id;
        const date = prompt('Schedule follow-up date (YYYY-MM-DD):', new Date().toISOString().split('T')[0]);
        const time = prompt('Schedule time:', '10:00 AM');
        if (date && time) {
          caseService.scheduleVisit(caseId, date, time, 'Follow-up clinical examination');
          showToast(`Follow-up scheduled for ${date} at ${time}`, 'success');
          this.navigateTo('cases');
        }
        return;
      }

      if (e.target.closest('#btnWsEscalate') || e.target.closest('#btnTriggerEscalationModal')) {
        const caseId = (e.target.closest('#btnWsEscalate')?.dataset.id) || 'CASE-8921';
        openModal('Escalate Outbreak to State Government', renderGovernmentEscalationForm(caseId), []);
        return;
      }

      // Advance Lab Pipeline Status
      const advanceLabBtn = e.target.closest('.btn-advance-lab');
      if (advanceLabBtn) {
        const labId = advanceLabBtn.dataset.id;
        const updated = labService.advanceStatus(labId);
        if (updated) {
          showToast(`Lab Request ${labId} advanced to ${updated.status}`, 'success');
          this.navigateTo('laboratory');
        }
        return;
      }

      // Modals
      if (e.target.closest('#btnNewTreatmentModal')) {
        openModal('Prescribe Medication / New Treatment Plan', renderNewTreatmentForm(), []);
        return;
      }

      if (e.target.closest('#btnNewLabSampleModal')) {
        openModal('Initiate Diagnostic Laboratory Sample Request', renderNewLabRequestForm(), []);
        return;
      }
    });

    // Case Selector Change Handler in Cases Page Workspace
    document.body.addEventListener('change', (e) => {
      if (e.target.id === 'caseWorkspaceSelector') {
        const caseId = e.target.value;
        const c = caseService.getCaseById(caseId);
        const workspaceContainer = document.querySelector('.clinical-workspace-grid');
        if (workspaceContainer && c) {
          workspaceContainer.outerHTML = renderThreeColumnWorkspace(c);
        }
      }

      if (e.target.id === 'animalProfileSelector') {
        const animalId = e.target.value;
        const a = animalService.getAnimalById(animalId);
        const profileContainer = document.querySelector('.animal-profile-wrapper');
        if (profileContainer && a) {
          profileContainer.outerHTML = renderAnimalProfileView(a);
        }
      }
    });

    // Form Submissions
    document.body.addEventListener('submit', (e) => {
      e.preventDefault();

      if (e.target.id === 'formClinicalAssessment') {
        const caseId = e.target.dataset.caseId;
        const formData = new FormData(e.target);
        caseService.saveClinicalAssessment(caseId, {
          temperature: parseFloat(formData.get('temperature')),
          heartRate: parseInt(formData.get('heartRate')),
          respirationRate: parseInt(formData.get('respirationRate')),
          severity: formData.get('severity'),
          observations: formData.get('observations')
        });
        showToast(`Clinical assessment logged for ${caseId}`, 'success');
        closeModal();
        this.navigateTo('cases');
        return;
      }

      if (e.target.id === 'formCreateTreatment') {
        const formData = new FormData(e.target);
        const medNames = formData.getAll('medName[]');
        const medDosages = formData.getAll('medDosage[]');
        const medFreqs = formData.getAll('medFreq[]');
        const medDurs = formData.getAll('medDur[]');

        const medicines = medNames.map((name, i) => ({
          name,
          dosage: medDosages[i] || '',
          frequency: medFreqs[i] || '',
          duration: medDurs[i] || ''
        })).filter(m => m.name);

        treatmentService.addTreatment({
          caseId: formData.get('caseId'),
          clinicalDiagnosis: formData.get('clinicalDiagnosis'),
          medicines,
          generalInstructions: formData.get('generalInstructions'),
          followUpDate: formData.get('followUpDate'),
          followUpTime: formData.get('followUpTime'),
          followUpPurpose: formData.get('followUpPurpose')
        });

        showToast('Treatment plan saved to animal history!', 'success');
        closeModal();
        this.navigateTo('treatments');
        return;
      }

      if (e.target.id === 'formCreateLabRequest') {
        const formData = new FormData(e.target);
        labService.createSampleRequest({
          caseId: formData.get('caseId'),
          sampleType: formData.get('sampleType'),
          suspectedCondition: formData.get('suspectedCondition'),
          collectionDate: formData.get('collectionDate')
        });

        showToast('Laboratory sample request initiated!', 'success');
        closeModal();
        this.navigateTo('laboratory');
        return;
      }

      if (e.target.id === 'formEscalateToGovernment') {
        const formData = new FormData(e.target);
        const caseId = formData.get('caseId');
        const caseData = caseService.getCaseById(caseId);

        if (caseData) {
          governmentService.escalateCaseToGovernment(
            caseData,
            caseData.vitals,
            null,
            'Verified by Veterinarian'
          );
          showToast('✓ Government notified • Case ID generated • Alert created', 'success');
          closeModal();
          this.navigateTo('alerts');
        }
        return;
      }

      if (e.target.id === 'formSystemSettings') {
        const formData = new FormData(e.target);
        apiService.setUseMock(formData.get('useMock') === 'true');
        if (formData.get('apiUrl')) apiService.setBackendUrl(formData.get('apiUrl'));
        showToast('System configuration saved!', 'success');
        return;
      }
    });

    // Dynamic row addition in prescription form
    document.body.addEventListener('click', (e) => {
      if (e.target.id === 'btnAddMedRow') {
        const container = document.getElementById('medRowsContainer');
        if (container) {
          const row = document.createElement('div');
          row.className = 'med-row mb-2';
          row.innerHTML = `
            <input type="text" name="medName[]" class="form-control sm" placeholder="Drug Name" required />
            <input type="text" name="medDosage[]" class="form-control sm" placeholder="Dosage" required />
            <input type="text" name="medFreq[]" class="form-control sm" placeholder="Frequency" required />
            <input type="text" name="medDur[]" class="form-control sm" placeholder="Duration" required />
          `;
          container.appendChild(row);
        }
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.vetApp = new App();
});
