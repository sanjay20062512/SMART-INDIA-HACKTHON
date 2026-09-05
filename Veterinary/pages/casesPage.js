/**
 * Case Management - Three-Column Clinical Workstation
 */
import { caseService } from '../services/caseService.js';
import { renderStatusBadge } from '../components/statusBadge.js';
import { renderAiSupportView } from './aiSupportView.js';
import { CaseModel } from '../models/Case.js';

export function renderCasesPage(selectedFilter = 'All') {
  const cases = caseService.getCases();
  let filtered = cases;
  if (selectedFilter !== 'All') {
    filtered = cases.filter(c => c.aiRiskLevel === selectedFilter || c.status === selectedFilter);
  }

  const activeCase = filtered[0] || cases[0];

  return `
    <div class="page-content">
      <!-- Top Filter Bar -->
      <div class="filter-bar">
        <div class="filter-group">
          <span class="filter-label">Filter Risk:</span>
          <button class="filter-btn ${selectedFilter === 'All' ? 'active' : ''}" data-filter="All">All (${cases.length})</button>
          <button class="filter-btn ${selectedFilter === 'Critical' ? 'active' : ''}" data-filter="Critical">Critical</button>
          <button class="filter-btn ${selectedFilter === 'High' ? 'active' : ''}" data-filter="High">High</button>
          <button class="filter-btn ${selectedFilter === 'Medium' ? 'active' : ''}" data-filter="Medium">Medium</button>
          <button class="filter-btn ${selectedFilter === 'Low' ? 'active' : ''}" data-filter="Low">Low</button>
        </div>

        <div class="filter-group">
          <span class="filter-label">Select Case:</span>
          <select id="caseWorkspaceSelector" class="form-control sm" style="width: 220px;">
            ${cases.map(c => `<option value="${c.id}" ${c.id === activeCase.id ? 'selected' : ''}>${c.id} - ${c.animalId} (${c.species})</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- THREE-COLUMN CLINICAL WORKSPACE -->
      ${activeCase ? renderThreeColumnWorkspace(activeCase) : '<div class="empty-state">No cases available</div>'}
    </div>
  `;
}

export function renderThreeColumnWorkspace(c) {
  const vitals = c.vitals || {
    temperature: 40.2,
    heartRate: 82,
    respirationRate: 38,
    severity: 'Critical',
    observations: 'Fever, tachypnea, frothy salivation, oral vesicular mucosal lesions on dental pad.'
  };

  const stages = CaseModel.TIMELINE_STAGES;
  const currentStageIdx = c.timelineStageIndex || 3;

  return `
    <div class="clinical-workspace-grid" data-case-id="${c.id}">
      <!-- LEFT COLUMN: Animal Snapshot -->
      <div class="animal-snapshot-card">
        <div class="animal-photo-box">
          <img src="${c.photo}" alt="${c.species}" />
          <div class="photo-badge">${renderStatusBadge(c.aiRiskLevel)}</div>
        </div>

        <div class="snapshot-body">
          <h3 class="snapshot-title">${c.animalId}</h3>
          <span class="snapshot-tag">Tag: ${c.tagId}</span>

          <ul class="snapshot-meta-list">
            <li><span>Species:</span> <span>${c.species}</span></li>
            <li><span>Breed:</span> <span>${c.breed}</span></li>
            <li><span>Age:</span> <span>${c.age}</span></li>
            <li><span>Sex:</span> <span>${c.sex}</span></li>
            <li><span>Farmer:</span> <span>${c.farmerName}</span></li>
            <li><span>Contact:</span> <span>${c.farmerPhone}</span></li>
            <li><span>Location:</span> <span>${c.location.village}, ${c.location.district}</span></li>
            <li><span>Current Status:</span> <span>${renderStatusBadge(c.status)}</span></li>
          </ul>
        </div>
      </div>

      <!-- CENTER COLUMN: Clinical Assessment & Timeline & AI Panel -->
      <div class="clinical-assessment-main">
        <!-- 8-Stage Case Timeline Bar -->
        <div class="case-timeline-bar">
          <div class="timeline-bar-title"><i class="fa-solid fa-timeline text-primary me-1"></i> Clinical Case Progression Pipeline</div>
          <div class="timeline-stages-wrapper">
            <div class="timeline-line-track"></div>
            ${stages.map((stage, idx) => {
              let stepClass = '';
              if (idx < currentStageIdx) stepClass = 'completed';
              else if (idx === currentStageIdx) stepClass = 'active';
              return `
                <div class="stage-step ${stepClass}">
                  <div class="step-node">${idx + 1}</div>
                  <span class="step-text">${stage}</span>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <!-- Vitals Visual Display Gauge Grid -->
        <div class="vitals-gauge-grid">
          <div class="vital-gauge-card">
            <div class="vital-label"><i class="fa-solid fa-temperature-high me-1"></i> Temperature</div>
            <div class="vital-value ${vitals.temperature > 39.5 ? 'abnormal' : ''}">${vitals.temperature}°C</div>
            <div class="vital-status-text">${vitals.temperature > 39.5 ? 'High Fever' : 'Normal'}</div>
          </div>

          <div class="vital-gauge-card">
            <div class="vital-label"><i class="fa-solid fa-heart-pulse me-1"></i> Heart Rate</div>
            <div class="vital-value">${vitals.heartRate} bpm</div>
            <div class="vital-status-text">Elevated Tachycardia</div>
          </div>

          <div class="vital-gauge-card">
            <div class="vital-label"><i class="fa-solid fa-lungs me-1"></i> Respiratory Rate</div>
            <div class="vital-value">${vitals.respirationRate}/min</div>
            <div class="vital-status-text">Tachypneic</div>
          </div>
        </div>

        <!-- Clinical Findings & Vet Notes -->
        <div class="clinical-panel">
          <div class="panel-header">
            <h4 class="panel-title"><i class="fa-solid fa-notes-medical text-primary"></i> Reported Symptoms & Clinical Findings</h4>
          </div>
          <div class="tags-container mb-3">
            ${c.symptoms.map(s => `<span class="tag-chip">${s}</span>`).join('')}
          </div>
          <div class="form-group m-0">
            <label class="form-label">Veterinarian Examination Notes:</label>
            <p class="text-sm p-2" style="background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-color);">
              ${vitals.observations}
            </p>
          </div>
        </div>

        <!-- AI Clinical Support Panel -->
        ${renderAiSupportView(c)}
      </div>

      <!-- RIGHT COLUMN: Large Clinical Actions -->
      <div class="clinical-actions-column">
        <h4 class="actions-title">Clinical Actions</h4>

        <button class="btn-action-large primary-action" id="btnWsAccept" data-id="${c.id}">
          <i class="fa-solid fa-circle-check"></i>
          <span>Accept Case</span>
        </button>

        <button class="btn-action-large" id="btnWsExam" data-id="${c.id}">
          <i class="fa-solid fa-stethoscope"></i>
          <span>Start Examination</span>
        </button>

        <button class="btn-action-large" id="btnWsLab" data-id="${c.id}">
          <i class="fa-solid fa-vial-circle-check"></i>
          <span>Request Lab Test</span>
        </button>

        <button class="btn-action-large" id="btnWsRx" data-id="${c.id}">
          <i class="fa-solid fa-prescription"></i>
          <span>Prescribe Treatment</span>
        </button>

        <button class="btn-action-large" id="btnWsVisit" data-id="${c.id}">
          <i class="fa-regular fa-calendar-plus"></i>
          <span>Schedule Follow-up</span>
        </button>

        <button class="btn-action-large danger-action" id="btnWsEscalate" data-id="${c.id}">
          <i class="fa-solid fa-triangle-exclamation"></i>
          <span>Escalate to Government</span>
        </button>
      </div>
    </div>
  `;
}
