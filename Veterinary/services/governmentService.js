/**
 * Government Service Abstraction
 * Facilitates outbreak alert escalation from Veterinarian Portal to the Government section/portal.
 */
import { apiService } from './apiService.js';
import { MOCK_ESCALATIONS } from '../mock/mockData.js';
import { EscalationModel } from '../models/Escalation.js';

const STORAGE_KEY = 'VET_GOVT_ESCALATIONS';

class GovernmentService {
  getEscalations() {
    return apiService.getFromStorage(STORAGE_KEY, MOCK_ESCALATIONS);
  }

  saveEscalations(items) {
    apiService.saveToStorage(STORAGE_KEY, items);
  }

  /**
   * Escalate serious case to Government Surveillance API / Portal Payload
   */
  async escalateCaseToGovernment(caseData, clinicalFindings = null, labResults = null, notes = '') {
    const payload = {
      caseId: caseData.id,
      animalId: caseData.animalId,
      district: caseData.location.district,
      state: caseData.location.state,
      suspectedOutbreakDisease: caseData.symptoms.join(', ') || 'Not specified',
      urgency: caseData.aiRiskLevel === 'Critical' ? 'Critical' : 'High',
      escalatedBy: 'Dr. Anita Sharma (Senior Vet Officer)',
      clinicalSummary: clinicalFindings ? `Temp: ${clinicalFindings.temperature}°F. ${clinicalFindings.observations}` : 'Pending full vitals',
      labResultSummary: labResults ? labResults.finding : 'Lab results pending',
      affectedLocation: `${caseData.location.village}, ${caseData.location.taluka}, ${caseData.location.district}`,
      notes: notes,
      escalatedAt: new Date().toISOString()
    };

    const newEscalation = new EscalationModel(payload);
    const escalations = this.getEscalations();
    escalations.unshift(newEscalation);
    this.saveEscalations(escalations);

    // Broadcast escalation event to localStorage so Government portal can listen seamlessly if opened
    try {
      const govtAlerts = JSON.parse(localStorage.getItem('GOVT_OUTBREAK_ALERTS') || '[]');
      govtAlerts.unshift(newEscalation);
      localStorage.setItem('GOVT_OUTBREAK_ALERTS', JSON.stringify(govtAlerts));
    } catch (e) {
      console.warn('Government cross-portal notification write fallback', e);
    }

    return newEscalation;
  }
}

export const governmentService = new GovernmentService();
