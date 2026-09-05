/**
 * Mock Data Repository for Veterinary Clinical Workstation
 */

export const MOCK_CASES = [
  {
    id: 'CASE-8921',
    farmerId: 'FARM-104',
    farmerName: 'Ramesh Patel',
    farmerPhone: '+91 98250 12345',
    animalId: 'COW-A102',
    tagId: 'IN-GJ-481920',
    species: 'Cattle',
    breed: 'Holstein Friesian Cross',
    age: '4 years',
    sex: 'Female',
    photo: 'https://images.unsplash.com/photo-1570042707222-790196232770?auto=format&fit=crop&w=600&q=80',
    location: { village: 'Rampur', taluka: 'Anand', district: 'Anand', state: 'Gujarat', gps: '22.5645° N, 72.9289° E' },
    symptoms: ['Fever (40.2°C)', 'Respiratory Distress', 'Excessive Salivation (Ropy)', 'Lame in left hind leg'],
    symptomDuration: '2 hours',
    photos: [
      'https://images.unsplash.com/photo-1570042707222-790196232770?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=600&q=80'
    ],
    reportedAt: new Date(Date.now() - 120000).toISOString(), // 2 min ago
    status: 'Pending Review',
    timelineStageIndex: 3, // Clinical Examination stage
    aiRiskLevel: 'Critical',
    aiRiskScore: 94,
    aiConfidence: 86,
    aiContributingFactors: [
      'Elevated temperature (40.2°C)',
      'Severe respiratory symptoms & hypersalivation',
      'Similar nearby cases reported in Rampur cluster'
    ],
    aiSuggestedAction: 'Veterinary examination and immediate laboratory testing.',
    vitals: {
      temperature: 40.2,
      heartRate: 82,
      respirationRate: 38,
      severity: 'Critical',
      observations: 'High fever, tachypnea, copious frothy salivation, oral vesicles present on dental pad.'
    },
    scheduledVisit: { date: new Date().toISOString().split('T')[0], time: '09:30', notes: 'Cow A102 examination' },
    isEscalated: false
  },
  {
    id: 'CASE-8922',
    farmerId: 'FARM-208',
    farmerName: 'Sita Devi',
    farmerPhone: '+91 94123 98765',
    animalId: 'GOAT-G201',
    tagId: 'IN-GJ-882143',
    species: 'Goat',
    breed: 'Black Bengal',
    age: '2 years',
    sex: 'Female',
    photo: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80',
    location: { village: 'Vadtal', taluka: 'Nadiad', district: 'Kheda', state: 'Gujarat', gps: '22.5833° N, 72.8833° E' },
    symptoms: ['Loss of appetite', 'High Fever (40.5°C)', 'Nasal Discharge'],
    symptomDuration: '1 day',
    photos: ['https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80'],
    reportedAt: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: 'Accepted',
    timelineStageIndex: 4, // Lab Testing stage
    aiRiskLevel: 'High',
    aiRiskScore: 82,
    aiConfidence: 82,
    aiContributingFactors: [
      'Elevated temperature (40.5°C)',
      'Oculonasal discharge & anorexia',
      'Cluster alert in Nadiad small ruminant population'
    ],
    aiSuggestedAction: 'Veterinary examination and possible laboratory testing.',
    vitals: {
      temperature: 40.5,
      heartRate: 94,
      respirationRate: 42,
      severity: 'Severe',
      observations: 'Dehydrated, mucopurulent nasal discharge, gum mucosal hyperemia.'
    },
    scheduledVisit: { date: new Date().toISOString().split('T')[0], time: '11:00', notes: 'Follow-up: Goat G201' },
    isEscalated: true
  },
  {
    id: 'CASE-8923',
    farmerId: 'FARM-311',
    farmerName: 'Vikram Singh',
    farmerPhone: '+91 97112 34567',
    animalId: 'BUF-B301',
    tagId: 'IN-GJ-991204',
    species: 'Buffalo',
    breed: 'Murrah',
    age: '5 years',
    sex: 'Female',
    photo: 'https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=600&q=80',
    location: { village: 'Chikhodra', taluka: 'Anand', district: 'Anand', state: 'Gujarat', gps: '22.5400° N, 72.9800° E' },
    symptoms: ['Swollen Udder (Left Quarter)', 'Clotted Milk', 'Mild Fever (39.2°C)'],
    symptomDuration: '1 day',
    photos: ['https://images.unsplash.com/photo-1546445317-29f4545f9d52?auto=format&fit=crop&w=600&q=80'],
    reportedAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    status: 'Scheduled',
    timelineStageIndex: 5, // Treatment stage
    aiRiskLevel: 'Medium',
    aiRiskScore: 56,
    aiConfidence: 78,
    aiContributingFactors: [
      'Localized mammary inflammation',
      'Clotted yellowish milk secretion'
    ],
    aiSuggestedAction: 'Perform CMT test and prescribe targeted antibiotic intramammary therapy.',
    vitals: {
      temperature: 39.2,
      heartRate: 68,
      respirationRate: 24,
      severity: 'Moderate',
      observations: 'Left front quarter swollen, warm, painful on palpation.'
    },
    scheduledVisit: { date: new Date().toISOString().split('T')[0], time: '14:30', notes: 'Farm visit & CMT test' },
    isEscalated: false
  },
  {
    id: 'CASE-8924',
    farmerId: 'FARM-402',
    farmerName: 'Mahesh Bhai',
    farmerPhone: '+91 99090 11223',
    animalId: 'COW-C402',
    tagId: 'IN-GJ-334455',
    species: 'Cattle',
    breed: 'Kankrej',
    age: '6 years',
    sex: 'Female',
    photo: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80',
    location: { village: 'Bakrol', taluka: 'Anand', district: 'Anand', state: 'Gujarat', gps: '22.5510° N, 72.9340° E' },
    symptoms: ['Nodular Skin Lesions', 'Mild Coughing'],
    symptomDuration: '3 days',
    photos: ['https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=600&q=80'],
    reportedAt: new Date(Date.now() - 3600000 * 36).toISOString(),
    status: 'In Treatment',
    timelineStageIndex: 6, // Follow-up stage
    aiRiskLevel: 'Low',
    aiRiskScore: 32,
    aiConfidence: 90,
    aiContributingFactors: ['Localized mild cutaneous nodules'],
    aiSuggestedAction: 'Supportive topical care and daily temperature monitoring.',
    vitals: {
      temperature: 38.6,
      heartRate: 60,
      respirationRate: 20,
      severity: 'Mild',
      observations: 'Animal active, appetite normal, skin nodules drying up.'
    },
    scheduledVisit: { date: new Date().toISOString().split('T')[0], time: '16:00', notes: 'Lab review & recovery check' },
    isEscalated: false
  }
];

export const MOCK_CLINICAL_TIMELINE = [
  { time: '09:30', caseId: 'CASE-8921', animal: 'Cow A102', action: 'Clinical examination & oral swab collection', status: 'Completed' },
  { time: '11:00', caseId: 'CASE-8922', animal: 'Goat G201', action: 'Follow-up: PPR antibiotic & fluid therapy check', status: 'In Progress' },
  { time: '14:30', caseId: 'CASE-8923', animal: 'Buffalo B301', action: 'Farm visit: Udder CMT test & milk sample', status: 'Scheduled' },
  { time: '16:00', caseId: 'CASE-8924', animal: 'Cow C402', action: 'Lab review & treatment evaluation', status: 'Scheduled' }
];

export const MOCK_FIELD_ROUTES = [
  {
    visitNo: 'Visit 1',
    time: '09:30',
    caseId: 'CASE-8921',
    animalId: 'COW-A102',
    village: 'Rampur',
    location: 'Rampur Village, Anand (Farm #12)',
    reason: 'Emergency FMD Suspected Examination',
    priority: 'Critical',
    status: 'Completed'
  },
  {
    visitNo: 'Visit 2',
    time: '12:00',
    caseId: 'CASE-8922',
    animalId: 'GOAT-G201',
    village: 'Vadtal',
    location: 'Vadtal Village, Nadiad (Farm #4)',
    reason: 'PPR Suspect Follow-up & Sampling',
    priority: 'High',
    status: 'In Progress'
  },
  {
    visitNo: 'Visit 3',
    time: '14:30',
    caseId: 'CASE-8923',
    animalId: 'BUF-B301',
    village: 'Chikhodra',
    location: 'Chikhodra Village, Farm C',
    reason: 'Acute Mastitis Examination & CMT',
    priority: 'Medium',
    status: 'Scheduled'
  }
];

export const MOCK_ANIMALS = [
  {
    id: 'COW-A102',
    tagId: 'IN-GJ-481920',
    ownerName: 'Ramesh Patel',
    ownerPhone: '+91 98250 12345',
    village: 'Rampur, Anand',
    species: 'Cattle',
    breed: 'Holstein Friesian Cross',
    gender: 'Female',
    age: '4 years',
    weightKg: 420,
    lactationStage: '3rd Lactation (Day 45)',
    photo: 'https://images.unsplash.com/photo-1570042707222-790196232770?auto=format&fit=crop&w=600&q=80',
    healthStatus: 'Critical - Under Examination',
    timelineEvents: [
      { date: '05 Sep 2026', title: 'Clinical Examination', desc: 'Logged 40.2°C fever, tachypnea, frothy salivation. Lab swab requested.', type: 'exam' },
      { date: '03 Sep 2026', title: 'Vaccination Booster', desc: 'FMD Oil Adjuvant Booster administered.', type: 'vax' },
      { date: '21 Aug 2026', title: 'Previous Treatment', desc: 'Dewormed with Fenbendazole 3g oral bolus.', type: 'treatment' }
    ],
    vaccinations: [
      { name: 'FMD Oil Adjuvant Vaccine', date: '2026-09-03', status: 'Valid', nextDue: '2027-03-03' },
      { name: 'Brucellosis (S19)', date: '2023-04-10', status: 'Completed', nextDue: 'Lifetime' }
    ],
    cases: ['CASE-8921']
  },
  {
    id: 'GOAT-G201',
    tagId: 'IN-GJ-882143',
    ownerName: 'Sita Devi',
    ownerPhone: '+91 94123 98765',
    village: 'Vadtal, Kheda',
    species: 'Goat',
    breed: 'Black Bengal',
    gender: 'Female',
    age: '2 years',
    weightKg: 28,
    lactationStage: 'Non-lactating',
    photo: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&w=600&q=80',
    healthStatus: 'High Risk - Lab Pending',
    timelineEvents: [
      { date: '05 Sep 2026', title: 'Lab Sample Collected', desc: 'Nasal swab dispatched for PPR RT-PCR.', type: 'lab' },
      { date: '05 Sep 2026', title: 'Clinical Examination', desc: 'Recorded 40.5°C fever, mucoid discharge.', type: 'exam' }
    ],
    vaccinations: [
      { name: 'PPR Vaccine (Sungri)', date: '2024-03-10', status: 'Expired', nextDue: '2025-03-10' }
    ],
    cases: ['CASE-8922']
  }
];

export const MOCK_LAB_REQUESTS = [
  {
    id: 'LAB-2026-00124',
    caseId: 'CASE-8921',
    animalId: 'COW-A102',
    sampleType: 'Vesicular Fluid & Oral Swab',
    suspectedCondition: 'Foot and Mouth Disease (FMD)',
    collectionDate: new Date().toISOString().split('T')[0],
    requestedBy: 'Dr. Anita Sharma',
    status: 'Result Available', // Stages: Created -> Collected -> Sent -> Testing -> Result Available
    pipelineStageIndex: 4,
    resultOutcome: 'POSITIVE', // 'POSITIVE', 'NEGATIVE', 'INCONCLUSIVE'
    results: {
      testName: 'FMD Virus RT-PCR Diagnostic Panel',
      finding: 'POSITIVE for FMD Virus (Serotype O)',
      pathogen: 'FMDV Serotype O',
      sensitivity: 'High Viral Load Detected',
      comments: 'Ring vaccination advised within 5km radius of Rampur farm.',
      labTechName: 'Dr. K. V. Joshi (Regional Virology Lab)',
      resultDate: new Date().toISOString().split('T')[0]
    }
  },
  {
    id: 'LAB-2026-00125',
    caseId: 'CASE-8922',
    animalId: 'GOAT-G201',
    sampleType: 'Nasal Swab',
    suspectedCondition: 'Pest des Petits Ruminants (PPR)',
    collectionDate: new Date().toISOString().split('T')[0],
    requestedBy: 'Dr. Anita Sharma',
    status: 'Testing',
    pipelineStageIndex: 3,
    resultOutcome: null,
    results: null
  }
];

export const MOCK_TREATMENTS = [
  {
    id: 'TRT-2026-881',
    caseId: 'CASE-8921',
    animalId: 'COW-A102',
    veterinarianName: 'Dr. Anita Sharma (BVSc & AH)',
    clinicalDiagnosis: 'Foot and Mouth Disease (FMD) - Acute Stage',
    medicines: [
      { name: 'Meltra (Meloxicam + Paracetamol)', dosage: '15 ml', frequency: 'Once Daily (IM)', duration: '3 days', instructions: 'Inject IM in neck' },
      { name: 'Intacef TAZO (Ceftriaxone + Tazobactam)', dosage: '3.375 g', frequency: 'Once Daily (IV)', duration: '5 days', instructions: 'Reconstitute with sterile water' },
      { name: 'Bores glycerine wash', dosage: 'Local', frequency: 'TID', duration: '5 days', instructions: 'Apply to tongue & mouth ulcers' }
    ],
    generalInstructions: 'Strict soft mash feeding, clean drinking water, isolate cattle in shaded stall.',
    followUpDate: '2026-09-08',
    followUpTime: '10:00 AM',
    followUpPurpose: 'Lesion healing check & ring vaccination confirmation',
    createdAt: new Date().toISOString(),
    status: 'Active'
  }
];

export const MOCK_ESCALATIONS = [
  {
    id: 'GOV-ESC-901',
    caseId: 'CASE-8921',
    animalId: 'COW-A102',
    district: 'Anand',
    state: 'Gujarat',
    suspectedOutbreakDisease: 'Foot and Mouth Disease Virus (FMDV Serotype O)',
    urgency: 'Critical',
    verifiedByVet: true,
    escalatedBy: 'Dr. Anita Sharma (Senior Vet Officer)',
    clinicalSummary: 'Cow A102 presenting 40.2°C fever, oral vesicles, ropy salivation. FMD PCR Positive.',
    labResultSummary: 'FMDV Serotype O POSITIVE (LAB-2026-00124)',
    affectedLocation: 'Rampur Village, Anand District',
    escalatedAt: new Date().toISOString(),
    governmentResponseStatus: '✓ Government notified • Alert created',
    quarantineAdvised: true
  }
];
