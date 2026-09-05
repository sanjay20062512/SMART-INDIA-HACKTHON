/**
 * Treatment Workspace & Prescription Interface
 */
import { treatmentService } from '../services/treatmentService.js';
import { caseService } from '../services/caseService.js';
import { renderStatusBadge } from '../components/statusBadge.js';
import { openModal, closeModal } from '../components/modal.js';
import { showToast } from '../components/toast.js';

export function renderTreatmentsPage() {
  const treatments = treatmentService.getTreatments();

  return `
    <div class="page-content">
      <div class="section-card mb-4">
        <div class="section-header">
          <div class="section-title-group">
            <h3><i class="fa-solid fa-prescription text-primary me-2"></i> Clinical Prescription Workspace</h3>
            <p class="text-muted text-sm">Issue digital pharmacological treatment plans and follow-up schedules</p>
          </div>
          <button class="btn btn-primary btn-sm" id="btnNewTreatmentModal"><i class="fa-solid fa-plus me-1"></i> New Prescription</button>
        </div>

        <!-- Prescriptions Gallery -->
        <div class="cards-grid cols-2">
          ${treatments.map(t => `
            <div class="prescription-card">
              <div class="rx-header">
                <div>
                  <span class="rx-symbol">℞</span>
                  <span class="treatment-id text-muted text-xs ms-2">${t.id}</span>
                  <h4 class="m-0 mt-1">${t.clinicalDiagnosis}</h4>
                  <span class="text-xs text-muted">Animal: <strong>${t.animalId || 'COW-A102'}</strong> &bull; Case: ${t.caseId}</span>
                </div>
                ${renderStatusBadge(t.status)}
              </div>

              <div class="rx-body">
                <table class="rx-meds-table">
                  <thead>
                    <tr>
                      <th>Medicine</th>
                      <th>Dosage</th>
                      <th>Frequency</th>
                      <th>Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${t.medicines.map(m => `
                      <tr>
                        <td><strong>${m.name}</strong></td>
                        <td>${m.dosage}</td>
                        <td>${m.frequency}</td>
                        <td>${m.duration}</td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>

                <div class="general-inst mt-2">
                  <strong class="text-xs">Nursing & Administration Instructions:</strong>
                  <p class="text-sm m-0 text-muted">${t.generalInstructions}</p>
                </div>
              </div>

              <div class="rx-footer mt-3 pt-2" style="border-top: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between;">
                <div class="followup-info text-xs">
                  <i class="fa-regular fa-calendar-check text-primary me-1"></i> Follow-up: <strong>${t.followUpDate} (${t.followUpTime || '10:00 AM'})</strong> &bull; <em>${t.followUpPurpose || 'Healing review'}</em>
                </div>
                <button class="btn btn-outline btn-xs btn-print-prescription" data-id="${t.id}"><i class="fa-solid fa-print me-1"></i> Print Rx</button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

export function renderNewTreatmentForm(caseId = 'CASE-8921') {
  const cases = caseService.getCases();
  const activeCase = cases.find(c => c.id === caseId) || cases[0];

  return `
    <form id="formCreateTreatment">
      <div class="form-group mb-3">
        <label class="form-label">Animal & Case Reference</label>
        <select name="caseId" class="form-control" required>
          ${cases.map(c => `<option value="${c.id}" ${c.id === caseId ? 'selected' : ''}>${c.animalId} (${c.species}) - ${c.id}</option>`).join('')}
        </select>
      </div>

      <div class="form-group mb-3">
        <label class="form-label">Clinical Diagnosis</label>
        <input type="text" name="clinicalDiagnosis" class="form-control" value="Foot and Mouth Disease (FMD) - Acute Stage" required />
      </div>

      <div class="medications-section mb-3">
        <label class="form-label">Prescription Medications</label>
        <div id="medRowsContainer">
          <div class="med-row mb-2">
            <input type="text" name="medName[]" class="form-control sm" value="Meltra (Meloxicam + Paracetamol)" required />
            <input type="text" name="medDosage[]" class="form-control sm" value="15 ml" required />
            <input type="text" name="medFreq[]" class="form-control sm" value="Once Daily (IM)" required />
            <input type="text" name="medDur[]" class="form-control sm" value="3 days" required />
          </div>
          <div class="med-row mb-2">
            <input type="text" name="medName[]" class="form-control sm" value="Intacef TAZO (Ceftriaxone)" required />
            <input type="text" name="medDosage[]" class="form-control sm" value="3.375 g" required />
            <input type="text" name="medFreq[]" class="form-control sm" value="Once Daily (IV)" required />
            <input type="text" name="medDur[]" class="form-control sm" value="5 days" required />
          </div>
        </div>
        <button type="button" class="btn btn-outline btn-xs mt-1" id="btnAddMedRow">+ Add Medicine</button>
      </div>

      <div class="form-group mb-3">
        <label class="form-label">Nursing Instructions</label>
        <textarea name="generalInstructions" class="form-control" rows="2">Strict soft mash feeding, clean drinking water, isolate cattle in shaded stall.</textarea>
      </div>

      <div class="row form-grid mb-3">
        <div class="form-group">
          <label class="form-label">Follow-up Date</label>
          <input type="date" name="followUpDate" class="form-control" value="${new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]}" />
        </div>
        <div class="form-group">
          <label class="form-label">Follow-up Time</label>
          <input type="time" name="followUpTime" class="form-control" value="10:00" />
        </div>
      </div>

      <div class="form-group mb-3">
        <label class="form-label">Follow-up Purpose</label>
        <input type="text" name="followUpPurpose" class="form-control" value="Lesion healing check & ring vaccination confirmation" />
      </div>

      <div class="form-actions text-end">
        <button type="submit" class="btn btn-primary">[ Save Treatment Plan ]</button>
      </div>
    </form>
  `;
}
