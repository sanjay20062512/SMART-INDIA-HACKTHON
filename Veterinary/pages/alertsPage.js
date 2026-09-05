/**
 * Verified Government Outbreak Escalation Page
 */
import { governmentService } from '../services/governmentService.js';
import { caseService } from '../services/caseService.js';
import { renderStatusBadge } from '../components/statusBadge.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export function renderAlertsPage() {
  const escalations = governmentService.getEscalations();

  return `
    <div class="page-content">
      <!-- High-Risk Warning Callout -->
      <div class="alert alert-danger mb-4 p-3" style="background: rgba(239, 68, 68, 0.1); border: 2px solid #ef4444; border-radius: var(--radius-lg); color: var(--text-main);">
        <div class="d-flex align-items-center justify-content-between">
          <div>
            <h3 class="text-danger m-0"><i class="fa-solid fa-triangle-exclamation me-2"></i> ⚠️ SERIOUS CASE DETECTED</h3>
            <p class="m-0 text-sm mt-1">High-consequence epidemic pathogen verified. Require veterinarian verification before transmitting payload to State Surveillance Department.</p>
          </div>
          <button class="btn btn-danger btn-sm" id="btnTriggerEscalationModal">
            <i class="fa-solid fa-paper-plane me-1"></i> [ Escalate to Government ]
          </button>
        </div>
      </div>

      <!-- Government Escalation Log -->
      <div class="section-card">
        <div class="section-header">
          <div class="section-title-group">
            <h3><i class="fa-solid fa-shield-halved text-primary me-2"></i> Transmitted Outbreak Escalation Log</h3>
            <p class="text-muted text-sm">Official surveillance payloads transmitted to State Animal Husbandry Department</p>
          </div>
        </div>

        <div class="escalation-log-list mt-3">
          ${escalations.map(e => `
            <div class="escalation-card p-3 mb-3" style="background: var(--bg-input); border: 1px solid var(--border-color); border-radius: var(--radius-lg);">
              <div class="d-flex align-items-center justify-content-between">
                <div>
                  <span class="badge badge-primary">${e.id}</span>
                  <h4 class="m-0 mt-1 text-danger"><i class="fa-solid fa-biohazard me-2"></i> ${e.suspectedOutbreakDisease}</h4>
                  <span class="text-xs text-muted">Location: ${e.affectedLocation} &bull; Transmitted on ${new Date(e.escalatedAt).toLocaleString()}</span>
                </div>
                ${renderStatusBadge(e.urgency)}
              </div>

              <div class="esc-meta-grid mt-3 text-sm">
                <div><strong>Clinical Findings:</strong> ${e.clinicalSummary}</div>
                <div><strong>Lab Evidence:</strong> ${e.labResultSummary}</div>
                <div><strong>Transmission Status:</strong> <span class="badge badge-success">${e.governmentResponseStatus}</span></div>
                <div><strong>Quarantine Protocol:</strong> ${e.quarantineAdvised ? '<span class="text-danger fw-bold"><i class="fa-solid fa-lock me-1"></i> Strict Ring Quarantine Advised</span>' : 'Standard Monitoring'}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderGovernmentEscalationForm(caseId = 'CASE-8921') {
  const cases = caseService.getCases();
  const activeCase = cases.find(c => c.id === caseId) || cases[0];

  return `
    <form id="formEscalateToGovernment">
      <div class="form-group mb-3">
        <label class="form-label">Verified Case Evidence Payload</label>
        <select name="caseId" class="form-control" required>
          ${cases.map(c => `<option value="${c.id}" ${c.id === caseId ? 'selected' : ''}>${c.animalId} (${c.species}) - ${c.id} [Risk: ${c.aiRiskLevel}]</option>`).join('')}
        </select>
      </div>

      <div class="case-evidence-box p-3 mb-3" style="background: var(--bg-input); border-radius: var(--radius-md); border: 1px solid var(--border-color); font-size: 0.8rem;">
        <div><strong>Animal ID:</strong> ${activeCase.animalId} (${activeCase.species}, ${activeCase.breed})</div>
        <div><strong>Clinical Findings:</strong> Vitals temp 40.2°C, tachypneic, oral vesicular lesions.</div>
        <div><strong>Lab Diagnostic Result:</strong> LAB-2026-00124 (FMD Virus Serotype O POSITIVE)</div>
        <div><strong>Location GPS:</strong> ${activeCase.location.village}, ${activeCase.location.district} (${activeCase.location.gps})</div>
        <div><strong>Nearby Cases:</strong> 3 adjacent farms in Rampur cluster showing similar vesicular signs</div>
      </div>

      <div class="form-group mb-3">
        <label class="form-label">Confirmed Disease / Pathogen Name</label>
        <input type="text" name="suspectedOutbreakDisease" class="form-control" value="Foot and Mouth Disease Virus (FMDV Serotype O)" required />
      </div>

      <div class="form-group mb-3">
        <label class="form-label">Veterinarian Verification Check</label>
        <div class="form-check">
          <label class="radio-label">
            <input type="checkbox" name="verifiedByVet" checked required />
            <span><strong>I, Dr. Anita Sharma, certify that clinical findings and lab diagnostics have been verified.</strong></span>
          </label>
        </div>
      </div>

      <div class="form-actions text-end">
        <button type="submit" class="btn btn-danger"><i class="fa-solid fa-paper-plane me-1"></i> [ Escalate to Government ]</button>
      </div>
    </form>
  `;
}
