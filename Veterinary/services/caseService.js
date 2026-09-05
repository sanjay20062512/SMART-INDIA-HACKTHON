/**
 * Case Service
 * Manages farmer cases, urgency sorting, visit scheduling, info requests, and clinical updates.
 */
import { apiService } from './apiService.js';
import { MOCK_CASES } from '../mock/mockData.js';
import { CaseModel } from '../models/Case.js';

const STORAGE_KEY = 'VET_CASES_DATA';

class CaseService {
  getCases() {
    return apiService.getFromStorage(STORAGE_KEY, MOCK_CASES);
  }

  saveCases(cases) {
    apiService.saveToStorage(STORAGE_KEY, cases);
  }

  getCaseById(id) {
    const cases = this.getCases();
    return cases.find(c => c.id === id) || null;
  }

  getPriorityCases() {
    const cases = this.getCases();
    return [...cases].sort((a, b) => CaseModel.calculateUrgencyPriority(b) - CaseModel.calculateUrgencyPriority(a));
  }

  getDashboardMetrics() {
    const cases = this.getCases();
    return {
      total: cases.length,
      newCases: cases.filter(c => c.status === 'Pending Review').length,
      highRisk: cases.filter(c => c.aiRiskLevel === 'High').length,
      critical: cases.filter(c => c.aiRiskLevel === 'Critical').length,
      todaysVisits: cases.filter(c => c.scheduledVisit && c.scheduledVisit.date === new Date().toISOString().split('T')[0]).length,
      pendingLab: cases.filter(c => c.status === 'Accepted' || c.status === 'In Treatment').length
    };
  }

  acceptCase(caseId) {
    const cases = this.getCases();
    const caseIndex = cases.findIndex(c => c.id === caseId);
    if (caseIndex !== -1) {
      cases[caseIndex].status = 'Accepted';
      this.saveCases(cases);
      return cases[caseIndex];
    }
    return null;
  }

  requestMoreInfo(caseId, note) {
    const cases = this.getCases();
    const caseIndex = cases.findIndex(c => c.id === caseId);
    if (caseIndex !== -1) {
      cases[caseIndex].status = 'Info Requested';
      cases[caseIndex].infoRequestNote = note;
      this.saveCases(cases);
      return cases[caseIndex];
    }
    return null;
  }

  scheduleVisit(caseId, date, time, notes) {
    const cases = this.getCases();
    const caseIndex = cases.findIndex(c => c.id === caseId);
    if (caseIndex !== -1) {
      cases[caseIndex].status = 'Scheduled';
      cases[caseIndex].scheduledVisit = { date, time, notes };
      this.saveCases(cases);
      return cases[caseIndex];
    }
    return null;
  }

  saveClinicalAssessment(caseId, vitalsData) {
    const cases = this.getCases();
    const caseIndex = cases.findIndex(c => c.id === caseId);
    if (caseIndex !== -1) {
      cases[caseIndex].vitals = vitalsData;
      cases[caseIndex].status = 'In Treatment';
      this.saveCases(cases);
      return cases[caseIndex];
    }
    return null;
  }
}

export const caseService = new CaseService();
