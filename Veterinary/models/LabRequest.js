/**
 * Lab Request Model
 * Laboratory diagnostic test requests and pipeline tracking.
 */
export class LabRequestModel {
  constructor(data = {}) {
    this.id = data.id || `LAB-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
    this.caseId = data.caseId || '';
    this.animalId = data.animalId || '';
    this.sampleType = data.sampleType || 'Blood Sample'; // 'Blood', 'Serum', 'Nasal Swab', 'Fecal', 'Milk', 'Tissue'
    this.suspectedCondition = data.suspectedCondition || 'Foot and Mouth Disease (FMD)';
    this.collectionDate = data.collectionDate || new Date().toISOString().split('T')[0];
    this.requestedBy = data.requestedBy || 'Dr. Anita Sharma';
    // Status pipeline: 'Created' -> 'Collected' -> 'Sent' -> 'Testing' -> 'Result Available'
    this.status = data.status || 'Created';
    this.timeline = data.timeline || [
      { status: 'Created', timestamp: new Date().toISOString(), note: 'Sample request initiated by veterinarian' }
    ];
    this.results = data.results || null; // { testName, finding, pathogen, sensitivity, comments, labTechName, resultDate }
  }

  static PIPELINE_STAGES = ['Created', 'Collected', 'Sent', 'Testing', 'Result Available'];
}
