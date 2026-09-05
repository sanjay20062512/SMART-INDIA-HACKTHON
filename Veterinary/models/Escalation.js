/**
 * Escalation Model
 * Official outbreak/serious disease notification sent to Government surveillance body.
 */
export class EscalationModel {
  constructor(data = {}) {
    this.id = data.id || `GOV-ESC-${Math.floor(1000 + Math.random() * 9000)}`;
    this.caseId = data.caseId || '';
    this.animalId = data.animalId || '';
    this.district = data.district || 'Anand';
    this.state = data.state || 'Gujarat';
    this.suspectedOutbreakDisease = data.suspectedOutbreakDisease || 'Foot and Mouth Disease Virus (FMDV)';
    this.urgency = data.urgency || 'High'; // 'Medium', 'High', 'Critical'
    this.escalatedBy = data.escalatedBy || 'Dr. Anita Sharma (Senior Vet Specialist)';
    this.clinicalSummary = data.clinicalSummary || '';
    this.labResultSummary = data.labResultSummary || '';
    this.affectedLocation = data.affectedLocation || '';
    this.escalatedAt = data.escalatedAt || new Date().toISOString();
    this.governmentResponseStatus = data.governmentResponseStatus || 'Received by District Epidemic Officer';
    this.quarantineAdvised = data.quarantineAdvised || true;
  }
}
