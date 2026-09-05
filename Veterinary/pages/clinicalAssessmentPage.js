/**
 * Clinical Assessment Page / Form Component
 * Form & display for vitals (Temperature, Heart Rate, Respiration Rate), observed signs, severity, and vet notes.
 */
import { caseService } from '../services/caseService.js';
import { showToast } from '../components/toast.js';
import { renderStatusBadge } from '../components/statusBadge.js';

export function renderClinicalAssessmentForm(caseItem) {
  const vitals = caseItem.vitals || {
    temperature: '',
    heartRate: '',
    respirationRate: '',
    severity: 'Moderate',
    observations: ''
  };

  return `
    <form id="formClinicalAssessment" data-case-id="${caseItem.id}">
      <div class="form-grid">
        <div class="form-group">
          <label class="form-label">Body Temperature (°F)</label>
          <input type="number" step="0.1" name="temperature" class="form-control" value="${vitals.temperature}" placeholder="e.g. 104.5" required />
          <span class="form-help">Normal Cattle Range: 101.5°F - 102.5°F</span>
        </div>

        <div class="form-group">
          <label class="form-label">Heart Rate (bpm)</label>
          <input type="number" name="heartRate" class="form-control" value="${vitals.heartRate}" placeholder="e.g. 72" required />
          <span class="form-help">Normal Range: 60 - 80 bpm</span>
        </div>

        <div class="form-group">
          <label class="form-label">Respiration Rate (breaths/min)</label>
          <input type="number" name="respirationRate" class="form-control" value="${vitals.respirationRate}" placeholder="e.g. 35" required />
          <span class="form-help">Normal Range: 10 - 30 /min</span>
        </div>

        <div class="form-group">
          <label class="form-label">Severity Level</label>
          <select name="severity" class="form-control">
            <option value="Mild" ${vitals.severity === 'Mild' ? 'selected' : ''}>Mild</option>
            <option value="Moderate" ${vitals.severity === 'Moderate' ? 'selected' : ''}>Moderate</option>
            <option value="Severe" ${vitals.severity === 'Severe' ? 'selected' : ''}>Severe</option>
            <option value="Critical" ${vitals.severity === 'Critical' ? 'selected' : ''}>Critical / Life Threatening</option>
          </select>
        </div>
      </div>

      <div class="form-group mt-3">
        <label class="form-label">Clinical Observations & Physical Signs</label>
        <textarea name="observations" class="form-control" rows="4" placeholder="Detail mucosal lesions, lymph node enlargement, auscultation findings, udder palpation..." required>${vitals.observations}</textarea>
      </div>

      <div class="form-actions mt-3">
        <button type="submit" class="btn btn-primary"><i class="fa-solid fa-floppy-disk me-1"></i> Save Assessment</button>
      </div>
    </form>
  `;
}

export function renderClinicalAssessmentPage() {
  const cases = caseService.getCases();
  const casesWithVitals = cases.filter(c => c.vitals);

  return `
    <div class="page-content">
      <div class="section-card">
        <div class="section-header">
          <h3><i class="fa-solid fa-stethoscope me-2 text-primary"></i> Recorded Clinical Vitals & Assessments</h3>
        </div>

        ${casesWithVitals.length ? `
          <div class="table-responsive">
            <table class="data-table">
              <thead>
                <tr>
                  <th>Case ID</th>
                  <th>Animal</th>
                  <th>Temperature (°F)</th>
                  <th>Heart Rate</th>
                  <th>Respiration</th>
                  <th>Severity</th>
                  <th>Veterinarian Observations</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                ${casesWithVitals.map(c => `
                  <tr>
                    <td><strong>${c.id}</strong></td>
                    <td>${c.species} (${c.breed})</td>
                    <td><span class="vitals-val ${c.vitals.temperature > 103 ? 'text-danger fw-bold' : ''}">${c.vitals.temperature}°F</span></td>
                    <td>${c.vitals.heartRate} bpm</td>
                    <td>${c.vitals.respirationRate} /min</td>
                    <td>${renderStatusBadge(c.vitals.severity)}</td>
                    <td><p class="table-obs-text">${c.vitals.observations}</p></td>
                    <td>
                      <button class="btn btn-outline btn-xs btn-open-case" data-id="${c.id}">View Full Case</button>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div class="empty-state">
            <i class="fa-solid fa-notes-medical empty-icon"></i>
            <h4>No Clinical Assessments Logged Yet</h4>
            <p>Open a pending case to perform and record physical examination vitals.</p>
          </div>
        `}
      </div>
    </div>
  `;
}
