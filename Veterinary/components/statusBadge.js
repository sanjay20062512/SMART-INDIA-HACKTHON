/**
 * Status Badge Component Helper
 * Generates badge HTML for Low, Medium, High, Critical and pipeline stages.
 */

export function renderStatusBadge(status) {
  const normalized = (status || '').toLowerCase();
  let badgeClass = 'badge-secondary';

  if (normalized.includes('critical')) badgeClass = 'badge-critical';
  else if (normalized.includes('high')) badgeClass = 'badge-high';
  else if (normalized.includes('medium')) badgeClass = 'badge-medium';
  else if (normalized.includes('low')) badgeClass = 'badge-low';
  else if (normalized.includes('accepted') || normalized.includes('result available') || normalized.includes('completed')) badgeClass = 'badge-success';
  else if (normalized.includes('pending') || normalized.includes('created') || normalized.includes('sent')) badgeClass = 'badge-warning';
  else if (normalized.includes('testing') || normalized.includes('in treatment')) badgeClass = 'badge-info';

  return `<span class="badge ${badgeClass}">${status}</span>`;
}
