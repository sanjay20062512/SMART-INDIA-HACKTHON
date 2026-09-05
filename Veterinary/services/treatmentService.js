/**
 * Treatment Service
 * Manages clinical diagnoses, medicine prescriptions, and follow-up schedules.
 */
import { apiService } from './apiService.js';
import { MOCK_TREATMENTS } from '../mock/mockData.js';
import { TreatmentModel } from '../models/Treatment.js';

const STORAGE_KEY = 'VET_TREATMENTS_DATA';

class TreatmentService {
  getTreatments() {
    return apiService.getFromStorage(STORAGE_KEY, MOCK_TREATMENTS);
  }

  saveTreatments(treatments) {
    apiService.saveToStorage(STORAGE_KEY, treatments);
  }

  getTreatmentByCaseId(caseId) {
    const treatments = this.getTreatments();
    return treatments.filter(t => t.caseId === caseId);
  }

  addTreatment(treatmentData) {
    const treatments = this.getTreatments();
    const newTreatment = new TreatmentModel(treatmentData);
    treatments.unshift(newTreatment);
    this.saveTreatments(treatments);
    return newTreatment;
  }
}

export const treatmentService = new TreatmentService();
