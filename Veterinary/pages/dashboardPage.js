/**
 * Veterinarian Dashboard Page - Clinical Overview Workspace
 */
import { caseService } from '../services/caseService.js';
import { labService } from '../services/labService.js';
import { MOCK_CLINICAL_TIMELINE } from '../mock/mockData.js';
import { renderStatusBadge } from '../components/statusBadge.js';

export function renderDashboardPage() {
  const metrics = caseService.getDashboardMetrics();
  const priorityCases = caseService.getPriorityCases();
  const labRequests = labService.getLabRequests();
  const activeLabCount = labRequests.filter(r => r.status !== 'Result Available').length;

  return `
    <div class="page-content">
      <!-- Greeting & Workload Banner -->
      <div class="workspace-greeting-banner">
        <div class="greeting-text">
          <h2>Good Morning, Dr. Anita Sharma</h2>
          <p><i class="fa-solid fa-notes-medical text-primary me-1"></i> Clinical Command Center & District Epidemic Surveillance Active</p>
        </div>

        <div class="workload-pills">
          <div class="workload-pill">
            <span class="pill-num text-primary">${metrics.total}</span>
            <span class="pill-label">Workload</span>
          </div>
          <div class="workload-pill">
            <span class="pill-num text-danger">${metrics.critical}</span>
            <span class="pill-label">Critical</span>
          </div>
          <div class="workload-pill">
            <span class="pill-num text-warning">09:30 AM</span>
            <span class="pill-label">Next Visit</span>
          </div>
        </div>
      </div>

      <!-- Main Workspace 2-Column Grid -->
      <div class="dashboard-grid">
        <!-- LEFT: Priority Queue -->
        <div class="clinical-panel">
          <div class="panel-header">
            <h3 class="panel-title"><i class="fa-solid fa-list-check text-primary"></i> Priority Triage Queue</h3>
            <span class="badge badge-primary">${priorityCases.length} Cases</span>
          </div>

          <div class="priority-queue-list">
            ${priorityCases.map(c => `
              <div class="priority-queue-item btn-open-case" data-id="${c.id}">
                <div class="queue-left">
                  <span class="risk-dot ${c.aiRiskLevel.toLowerCase()}"></span>
                  <div>
                    <div class="item-animal-id">${c.animalId} (${c.species})</div>
                    <div class="item-symptoms">${c.symptoms.slice(0, 2).join(', ')}</div>
                  </div>
                </div>
                <div class="item-meta">
                  <div><strong>${c.location.village}</strong></div>
                  <span>${new Date(c.reportedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- RIGHT: Today's Clinical Timeline -->
        <div class="clinical-panel">
          <div class="panel-header">
            <h3 class="panel-title"><i class="fa-solid fa-clock text-primary"></i> Today's Clinical Timeline</h3>
            <span class="badge badge-info">4 Time Slots</span>
          </div>

          <div class="timeline-list">
            ${MOCK_CLINICAL_TIMELINE.map(t => `
              <div class="timeline-slot">
                <div class="slot-time">${t.time}</div>
                <div class="slot-content">
                  <h5>${t.animal} &bull; <span class="text-primary">${t.action}</span></h5>
                  <p class="m-0 text-xs">Case Ref: <strong>${t.caseId}</strong> &bull; Status: ${renderStatusBadge(t.status)}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <!-- BOTTOM: Disease Intelligence -->
      <div class="clinical-panel">
        <div class="panel-header">
          <h3 class="panel-title"><i class="fa-solid fa-chart-line text-primary"></i> Disease Intelligence & Regional Surveillance</h3>
        </div>

        <div class="intelligence-grid">
          <div class="intel-card">
            <div class="intel-val">${metrics.total}</div>
            <div class="intel-lbl">Active Cases</div>
          </div>
          <div class="intel-card">
            <div class="intel-val text-warning">+18%</div>
            <div class="intel-lbl">Weekly Case Trend</div>
          </div>
          <div class="intel-card">
            <div class="intel-val text-info">${activeLabCount}</div>
            <div class="intel-lbl">Pending Lab Samples</div>
          </div>
          <div class="intel-card">
            <div class="intel-card-content">
              <div class="intel-val text-danger">Rampur & Vadtal</div>
              <div class="intel-lbl">Suspected Outbreak Clusters</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
