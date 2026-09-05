/**
 * Visually Rich Animal Profile Page
 */
import { animalService } from '../services/animalService.js';
import { renderStatusBadge } from '../components/statusBadge.js';

export function renderAnimalsPage() {
  const animals = animalService.getAnimals();
  const selectedAnimal = animals[0];

  return `
    <div class="page-content">
      <div class="filter-bar mb-3">
        <div class="filter-group">
          <span class="filter-label">Select Livestock Profile:</span>
          <select id="animalProfileSelector" class="form-control sm" style="width: 250px;">
            ${animals.map(a => `<option value="${a.id}">${a.id} - ${a.species} (${a.ownerName})</option>`).join('')}
          </select>
        </div>
      </div>

      ${selectedAnimal ? renderAnimalProfileView(selectedAnimal) : ''}
    </div>
  `;
}

export function renderAnimalProfileView(a) {
  return `
    <div class="animal-profile-wrapper">
      <!-- Profile Header Card -->
      <div class="section-card mb-4" style="background: linear-gradient(135deg, var(--bg-card), var(--bg-input)); border-left: 5px solid var(--primary);">
        <div class="d-flex flex-wrap align-items-center gap-4">
          <img src="${a.photo}" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; border: 3px solid var(--primary);" />
          
          <div class="flex-1">
            <div class="d-flex align-items-center gap-2">
              <h2 class="m-0">${a.id}</h2>
              <span class="badge badge-primary">Tag: ${a.tagId}</span>
            </div>
            <p class="m-0 text-muted mt-1">
              <strong>${a.species}</strong> &bull; ${a.breed} &bull; ${a.gender}, ${a.age} &bull; ${a.weightKg} kg
            </p>
            <p class="m-0 text-sm mt-1">
              <i class="fa-solid fa-user me-1 text-primary"></i> Owner: <strong>${a.ownerName}</strong> (${a.ownerPhone}) &bull; <i class="fa-solid fa-location-dot text-danger me-1"></i> ${a.village}
            </p>
            <div class="mt-2">
              <span class="badge badge-critical"><i class="fa-solid fa-heart-pulse me-1"></i> Status: ${a.healthStatus}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Profile Tabs Bar -->
      <div class="section-card">
        <div class="profile-tabs-header mb-3" style="display: flex; gap: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.5rem;">
          <button class="btn btn-outline btn-sm active-tab" data-tab="timeline">Health History & Timeline</button>
          <button class="btn btn-outline btn-sm" data-tab="vax">Vaccinations</button>
          <button class="btn btn-outline btn-sm" data-tab="treatments">Treatments</button>
          <button class="btn btn-outline btn-sm" data-tab="labs">Lab Results</button>
          <button class="btn btn-outline btn-sm" data-tab="cases">Cases</button>
        </div>

        <!-- Chronological Historical Events Timeline -->
        <div id="tabContentTimeline" class="tab-pane active">
          <h4 class="mb-3"><i class="fa-solid fa-clock-rotate-left text-primary me-2"></i> Chronological Medical History</h4>
          <div class="timeline-list">
            ${(a.timelineEvents || []).map(evt => `
              <div class="timeline-slot">
                <div class="slot-time" style="min-width: 90px; color: var(--primary);">${evt.date}</div>
                <div class="slot-content">
                  <h5>${evt.title}</h5>
                  <p class="m-0 text-sm">${evt.desc}</p>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
