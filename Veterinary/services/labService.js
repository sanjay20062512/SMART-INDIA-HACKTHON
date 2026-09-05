/**
 * Lab Service
 * Manages laboratory sample requests, diagnostic results, and pipeline progress:
 * Created -> Collected -> Sent -> Testing -> Result Available
 */
import { apiService } from './apiService.js';
import { MOCK_LAB_REQUESTS } from '../mock/mockData.js';
import { LabRequestModel } from '../models/LabRequest.js';

const STORAGE_KEY = 'VET_LAB_REQUESTS_DATA';

class LabService {
  getLabRequests() {
    return apiService.getFromStorage(STORAGE_KEY, MOCK_LAB_REQUESTS);
  }

  saveLabRequests(requests) {
    apiService.saveToStorage(STORAGE_KEY, requests);
  }

  createSampleRequest(data) {
    const requests = this.getLabRequests();
    const newRequest = new LabRequestModel(data);
    requests.unshift(newRequest);
    this.saveLabRequests(requests);
    return newRequest;
  }

  advanceStatus(id, note = '') {
    const requests = this.getLabRequests();
    const req = requests.find(r => r.id === id);
    if (!req) return null;

    const stages = LabRequestModel.PIPELINE_STAGES;
    const currentIndex = stages.indexOf(req.status);
    if (currentIndex !== -1 && currentIndex < stages.length - 1) {
      req.status = stages[currentIndex + 1];
      req.timeline.push({
        status: req.status,
        timestamp: new Date().toISOString(),
        note: note || `Status updated to ${req.status}`
      });
      
      // If advanced to Result Available, mock sample results if none exist
      if (req.status === 'Result Available' && !req.results) {
        req.results = {
          testName: `${req.sampleType} Diagnostic PCR & Culture`,
          finding: `Positive match for ${req.suspectedCondition}`,
          pathogen: req.suspectedCondition,
          sensitivity: 'Broad-spectrum fluoroquinolones sensitive',
          comments: 'High pathogen load detected. Quarantine recommended.',
          labTechName: 'Dr. V. M. Solanki (Senior Microbiologist)',
          resultDate: new Date().toISOString().split('T')[0]
        };
      }

      this.saveLabRequests(requests);
      return req;
    }
    return null;
  }
}

export const labService = new LabService();
