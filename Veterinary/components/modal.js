/**
 * Modal Component Engine
 * Displays responsive popups for details, forms, scheduling visits, and government escalation.
 */

export function openModal(title, contentHtml, footerButtons = []) {
  const container = document.getElementById('modalContainer');
  if (!container) return;

  const buttonsHtml = footerButtons.map(btn => `
    <button class="btn ${btn.class || 'btn-secondary'}" id="${btn.id}">${btn.text}</button>
  `).join('');

  container.innerHTML = `
    <div class="modal-backdrop" id="modalBackdrop">
      <div class="modal-card">
        <div class="modal-header">
          <h3 class="modal-title">${title}</h3>
          <button class="modal-close" id="modalCloseBtn">&times;</button>
        </div>
        <div class="modal-body">
          ${contentHtml}
        </div>
        ${footerButtons.length ? `<div class="modal-footer">${buttonsHtml}</div>` : ''}
      </div>
    </div>
  `;

  document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
  document.getElementById('modalBackdrop')?.addEventListener('click', (e) => {
    if (e.target.id === 'modalBackdrop') closeModal();
  });
}

export function closeModal() {
  const container = document.getElementById('modalContainer');
  if (container) container.innerHTML = '';
}
