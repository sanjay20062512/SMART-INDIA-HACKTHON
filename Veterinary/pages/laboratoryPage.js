/**
 * Visual Laboratory Tracker & Diagnostic Workspace
 */
import { labService } from '../services/labService.js';
import { caseService } from '../services/caseService.js';
import { renderStatusBadge } from '../components/statusBadge.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export function renderLaboratoryPage() {
  const labRequests = labService.getLabRequests();

  return `
    <div class="page-content">
      <div class="section-card">
        <div class="section-header">
          <div class="section-title-group">
            <h3><i class="fa-solid fa-flask-vial text-primary me-2"></i> Diagnostic Laboratory Workflow</h3>
            <p class="text-muted text-sm">Sample submission pipeline, viral panel culture & PCR diagnostic reports</p>
          </div>
          <button class="btn btn-primary btn-sm" id="btnNewLabSampleModal"><i class="fa-solid fa-plus me-1"></i> Request Lab Sample</button>
        </div>

        <div class="lab-requests-list mt-3">
          ${labRequests.map(r => renderLabCard(r)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderLabCard(r) {
  const stages = ['Created', 'Collected', 'Sent', 'Testing', 'Result Available'];
  const currentStageIndex = stages.indexOf(r.status);
  const outcome = r.resultOutcome || (r.results ? 'POSITIVE' : null);

  return `
    <div class="lab-card">
      <div class="d-flex align-items-center justify-content-between mb-2">
        <div>
          <span class="badge badge-primary">${r.id}</span>
          <h4 class="m-0 mt-1">${r.sampleType} &bull; <span class="text-primary">${r.suspectedCondition}</span></h4>
          <span class="text-xs text-muted">Animal: <strong>${r.animalId}</strong> (Case ${r.caseId})</span>
        </div>
        ${renderStatusBadge(r.status)}
      </div>

      <!-- 5-Stage Visual Pipeline Tracker -->
      <div class="timeline-stages-wrapper my-3" style="position: relative;">
        <div class="timeline-line-track"></div>
        ${stages.map((stage, idx) => {
          let stepClass = '';
          if (idx < currentStageIndex) stepClass = 'completed';
          else if (idx === currentStageIndex) stepClass = 'active';
          return `
            <div class="stage-step ${stepClass}">
              <div class="step-node">${idx + 1}</div>
              <span class="step-text">${stage}</span>
            </div>
          `;
        }).join('')}
      </div>

      <!-- Result Outcome Display -->
      <div class="lab-card-body mt-3">
        ${r.results ? `
          <div class="results-report-box" style="background: var(--bg-input); border: 1px solid var(--border-color); border-left: 4px solid var(--primary); border-radius: var(--radius-md); padding: 1rem;">
            <div class="d-flex align-items-center justify-content-between mb-2">
              <strong class="text-primary"><i class="fa-solid fa-microscope me-1"></i> RESULT AVAILABLE</strong>
              <span class="result-outcome-badge ${outcome === 'POSITIVE' ? 'outcome-positive' : 'outcome-negative'}">${outcome || 'POSITIVE'}</span>
            </div>
            
            <div class="results-grid text-sm">
              <div><strong>Pathogen Isolated:</strong> <span class="text-danger fw-bold">${r.results.pathogen}</span></div>
              <div><strong>Diagnostic Finding:</strong> ${r.results.finding}</div>
              <div><strong>Lab Sensitivity:</strong> ${r.results.sensitivity}</div>
              <div><strong>Comments:</strong> ${r.results.comments}</div>
            </div>
          </div>
        ` : `
          <div class="text-sm text-muted p-2" style="background: var(--bg-input); border-radius: var(--radius-md);">
            <i class="fa-solid fa-clock-rotate-left me-1"></i> Current sample status: <strong>${r.status}</strong>. Testing in progress at Regional Virology Lab.
          </div>
        `}
      </div>

      <!-- Veterinarian Action Buttons -->
      <div class="d-flex align-items-center gap-2 mt-3 pt-2" style="border-top: 1px solid var(--border-color);">
        ${r.status !== 'Result Available' ? `
          <button class="btn btn-primary btn-xs btn-advance-lab" data-id="${r.id}"><i class="fa-solid fa-forward me-1"></i> Advance Pipeline Status</button>
        ` : `
          <button class="btn btn-outline btn-xs" id="btnReviewResult" data-id="${r.id}">[ Review Result ]</button>
          <button class="btn btn-primary btn-xs btn-open-case" data-id="${r.caseId}">[ Update Case ]</button>
          <button class="btn btn-danger btn-xs" id="btnLabEscalate" data-id="${r.caseId}">[ Escalate ]</button>
        `}
      </div>
    </div>
  `;
}

export function renderNewLabRequestForm(caseId = 'CASE-8921') {
  const cases = caseService.getCases();

  return `
    <form id="formCreateLabRequest">
      <div class="form-group mb-3">
        <label class="form-label">Select Case</label>
        <select name="caseId" class="form-control" required>
          ${cases.map(c => `<option value="${c.id}" ${c.id === caseId ? 'selected' : ''}>${c.animalId} (${c.species}) - ${c.id}</option>`).join('')}
        </select>
      </div>

      <div class="form-group mb-3">
        <label class="form-label">Sample Type</label>
        <select name="sampleType" class="form-control" required>
          <option value="Vesicular Fluid & Oral Swab">Vesicular Fluid & Oral Swab</option>
          <option value="Blood Sample">Blood Sample</option>
          <option value="Nasal / Ocular Swab">Nasal / Ocular Swab</option>
          <option value="Milk Sample">Milk Sample</option>
          <option value="Fecal Sample">Fecal Sample</option>
        </select>
      </div>

      <div class="form-group mb-3">
        <label class="form-label">Suspected Condition / Diagnostic Target</label>
        <input type="text" name="suspectedCondition" class="form-control" value="Foot and Mouth Disease (FMD)" required />
      </div>

      <div class="form-group mb-3">
        <label class="form-label">Collection Date</label>
        <input type="date" name="collectionDate" class="form-control" value="${new Date().toISOString().split('T')[0]}" required />
      </div>

      <div class="form-actions text-end">
        <button type="submit" class="btn btn-primary">[ Initiate Sample Request ]</button>
      </div>
    </form>
  `;
}
