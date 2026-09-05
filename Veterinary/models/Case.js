/**
 * Case Model
 * Represents a farmer-reported animal case with an 8-step clinical timeline.
 */
export class CaseModel {
  static TIMELINE_STAGES = [
    'Farmer Reported',
    'AI Screening',
    'Veterinarian Assigned',
    'Clinical Examination',
    'Lab Testing',
    'Treatment',
    'Follow-up',
    'Resolved / Escalated'
  ];

  constructor(data = {}) {
    this.id = data.id || `CASE-${Math.floor(1000 + Math.random() * 9000)}`;
    this.farmerId = data.farmerId || 'FARM-001';
    this.farmerName = data.farmerName || 'Unknown Farmer';
    this.farmerPhone = data.farmerPhone || '+91 98765 43210';
    this.animalId = data.animalId || 'ANIM-001';
    this.tagId = data.tagId || 'IN-TAG-000000';
    this.species = data.species || 'Cattle';
    this.breed = data.breed || 'Gir';
    this.age = data.age || '3 years';
    this.sex = data.sex || 'Female';
    this.photo = data.photo || 'https://images.unsplash.com/photo-1570042707222-790196232770?auto=format&fit=crop&w=600&q=80';
    this.location = data.location || { village: 'Rampur', district: 'Anand', state: 'Gujarat', gps: '22.5645° N, 72.9289° E' };
    this.symptoms = data.symptoms || [];
    this.symptomDuration = data.symptomDuration || '2 days';
    this.photos = data.photos || [];
    this.reportedAt = data.reportedAt || new Date().toISOString();
    this.status = data.status || 'Pending Review'; // 'Pending Review', 'Accepted', 'Info Requested', 'Scheduled', 'In Treatment', 'Closed'
    
    // Timeline progress (Index 0 to 7)
    this.timelineStageIndex = data.timelineStageIndex !== undefined ? data.timelineStageIndex : 1;
    
    // AI Preliminary Assessment
    this.aiRiskLevel = data.aiRiskLevel || 'Medium'; // 'Low', 'Medium', 'High', 'Critical'
    this.aiRiskScore = data.aiRiskScore || 65; // 0-100
    this.aiConfidence = data.aiConfidence || 82; // 0-100%
    this.aiContributingFactors = data.aiContributingFactors || [];
    this.aiSuggestedAction = data.aiSuggestedAction || 'Veterinary examination and possible laboratory testing.';
    
    // Clinical Assessment details
    this.vitals = data.vitals || null; // { temperature, heartRate, respirationRate, severity, observations }
    this.scheduledVisit = data.scheduledVisit || null; // { date, time, notes }
    this.isEscalated = data.isEscalated || false;
  }

  static calculateUrgencyPriority(c) {
    const riskMap = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    let score = riskMap[c.aiRiskLevel] || 0;
    if (c.vitals && c.vitals.temperature > 40.0) score += 1;
    return score;
  }
}
