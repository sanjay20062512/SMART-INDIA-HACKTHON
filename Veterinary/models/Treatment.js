/**
 * Treatment Model
 * Clinical diagnoses and drug prescriptions.
 */
export class TreatmentModel {
  constructor(data = {}) {
    this.id = data.id || `TRT-${Math.floor(1000 + Math.random() * 9000)}`;
    this.caseId = data.caseId || '';
    this.animalId = data.animalId || '';
    this.veterinarianName = data.veterinarianName || 'Dr. Anita Sharma (BVSc & AH)';
    this.clinicalDiagnosis = data.clinicalDiagnosis || '';
    this.medicines = data.medicines || []; // [{ name, dosage, frequency, duration, instructions }]
    this.generalInstructions = data.generalInstructions || 'Keep animal isolated in dry, shaded shelter. Ensure clean drinking water.';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.followUpDate = data.followUpDate || '';
    this.status = data.status || 'Active'; // 'Active', 'Completed', 'Discontinued'
  }
}
