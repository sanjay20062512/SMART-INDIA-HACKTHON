/**
 * Animal Model
 * Electronic Health Record for animals.
 */
export class AnimalModel {
  constructor(data = {}) {
    this.id = data.id || `ANIM-${Math.floor(1000 + Math.random() * 9000)}`;
    this.tagId = data.tagId || `IN-TAG-${Math.floor(100000 + Math.random() * 900000)}`;
    this.ownerName = data.ownerName || 'Ramesh Kumar';
    this.ownerPhone = data.ownerPhone || '+91 98765 43210';
    this.village = data.village || 'Rampur, Gujarat';
    this.species = data.species || 'Cattle';
    this.breed = data.breed || 'Gir';
    this.gender = data.gender || 'Female';
    this.age = data.age || '4 years';
    this.weightKg = data.weightKg || 380;
    this.lactationStage = data.lactationStage || '2nd Lactation';
    this.vaccinations = data.vaccinations || [];
    this.previousIllnesses = data.previousIllnesses || [];
    this.previousTreatments = data.previousTreatments || [];
    this.caseHistory = data.caseHistory || [];
  }
}
