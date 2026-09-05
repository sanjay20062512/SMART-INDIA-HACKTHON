/**
 * Today's Field Route Workspace
 */
import { MOCK_FIELD_ROUTES } from '../mock/mockData.js';
import { renderStatusBadge } from '../components/statusBadge.js';
import { showToast } from '../components/toast.js';

export function renderFieldVisitsPage() {
  return `
    <div class="page-content">
      <div class="section-card">
        <div class="section-header">
          <div class="section-title-group">
            <h3><i class="fa-solid fa-route text-primary me-2"></i> TODAY'S FIELD ROUTE</h3>
            <p class="text-muted text-sm">District cluster patrol schedule, farm visit priority & live route status</p>
          </div>
        </div>

        <div class="route-list mt-3">
          ${MOCK_FIELD_ROUTES.map(r => `
            <div class="route-card">
              <div>
                <div class="d-flex align-items-center gap-2">
                  <span class="badge badge-primary">${r.visitNo}</span>
                  <span class="fw-bold text-primary">${r.time}</span>
                  ${renderStatusBadge(r.priority)}
                </div>
                <h4 class="m-0 mt-2">${r.animalId} &bull; <span class="text-muted">${r.reason}</span></h4>
                <p class="m-0 text-sm text-muted"><i class="fa-solid fa-location-dot text-danger me-1"></i> ${r.location}</p>
              </div>

              <div class="d-flex flex-column align-items-end gap-2">
                <div>Route Status: ${renderStatusBadge(r.status)}</div>
                <div class="d-flex gap-2">
                  <button class="btn btn-outline btn-xs btn-open-case" data-id="${r.caseId}">Examine Animal</button>
                  <a href="https://maps.google.com/?q=${encodeURIComponent(r.location)}" target="_blank" class="btn btn-primary btn-xs">
                    <i class="fa-solid fa-map-location-dot me-1"></i> Navigate
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}
