/**
 * AI Clinical Support Panel Component
 * Visually distinct panel with risk level, confidence score, contributing factors, suggested action, and MANDATORY NOTICE.
 */
import { MANDATORY_AI_DISCLAIMER } from '../services/aiSupportService.js';
import { renderStatusBadge } from '../components/statusBadge.js';

export function renderAiSupportView(caseItem) {
  if (!caseItem) return '';

  return `
    <div class="ai-clinical-support-panel">
      <div class="ai-panel-header">
        <div class="ai-header-title">
          <i class="fa-solid fa-microchip"></i>
          <span>AI CLINICAL SUPPORT</span>
        </div>
        <div class="d-flex align-items-center gap-2">
          ${renderStatusBadge(caseItem.aiRiskLevel)}
          <span class="ai-confidence-chip">Confidence: ${caseItem.aiConfidence || 82}%</span>
        </div>
      </div>

      <div class="ai-mandatory-disclaimer">
        <i class="fa-solid fa-triangle-exclamation me-1"></i>
        <span><strong>IMPORTANT NOTICE:</strong> ${MANDATORY_AI_DISCLAIMER}</span>
      </div>

      <div class="ai-factors-box">
        <strong>Contributing Risk Factors:</strong>
        <ul>
          ${(caseItem.aiContributingFactors || []).map(f => `<li><i class="fa-solid fa-angle-right me-1 text-primary"></i> ${f}</li>`).join('')}
        </ul>
      </div>

      <div class="ai-suggested-box">
        <strong>Suggested Action:</strong>
        <p class="m-0 mt-1">${caseItem.aiSuggestedAction}</p>
      </div>
    </div>
  `;
}
