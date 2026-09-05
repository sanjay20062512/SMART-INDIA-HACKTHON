// Central Mock Data for Government Command Center
// National Animal Disease Surveillance System (NADSS) - Tamil Nadu Region

export const situationOverview = {
  totalMonitored: {
    value: 124580,
    label: "Total Animals Monitored",
    trend: "+1,240 this month",
    trendPositive: true,
    comparison: "8,420 registered farms & homesteads",
    status: "NORMAL"
  },
  activeCases: {
    value: 1284,
    label: "Active Disease Cases",
    trend: "-42 in last 24h",
    trendPositive: true,
    comparison: "94% under active veterinary treatment",
    status: "MONITORING"
  },
  suspectedOutbreaks: {
    value: 5,
    label: "Suspected Outbreaks",
    trend: "↑ 2 from last week",
    trendPositive: false,
    comparison: "3 under active laboratory testing",
    status: "CRITICAL"
  },
  highRiskZones: {
    value: 7,
    label: "High-Risk Buffer Zones",
    trend: "3 contained, 4 quarantined",
    trendPositive: false,
    comparison: "5km radius containment enforced",
    status: "CRITICAL"
  },
  mortality: {
    value: 143,
    label: "Cumulative Mortality",
    trend: "Fatality rate 11.1%",
    trendPositive: false,
    comparison: "Target benchmark < 5.0%",
    status: "WARNING"
  },
  vaccinationCoverage: {
    value: "82.6%",
    label: "Vaccination Coverage",
    trend: "+4.2% since campaign start",
    trendPositive: true,
    comparison: "38,000 / 46,000 eligible animals covered",
    status: "NORMAL"
  }
};

// Outbreak Registry
export const outbreaksData = [
  {
    id: "OB-001",
    location: "Perundurai East",
    block: "Perundurai",
    district: "Erode",
    disease: "Foot & Mouth Disease (FMD)",
    animalsAffected: 25,
    mortality: 5,
    riskScore: 92,
    riskLevel: "CRITICAL",
    status: "Under Investigation",
    assignedTeam: "Team Alpha (Dr. Jayakumar)",
    lastUpdate: "14 mins ago",
    species: "Cattle",
    lat: 11.2789,
    lng: 77.5912,
    quarantineRadiusKm: 5,
    symptoms: "High pyrexia, excessive salivation, buccal & interdigital vesiculation"
  },
  {
    id: "OB-002",
    location: "Kavindapadi",
    block: "Bhavani",
    district: "Erode",
    disease: "PPR (Goat Plague)",
    animalsAffected: 12,
    mortality: 1,
    riskScore: 78,
    riskLevel: "HIGH",
    status: "Sample Testing",
    assignedTeam: "Team Bravo (Dr. Priya)",
    lastUpdate: "48 mins ago",
    species: "Goat",
    lat: 11.4210,
    lng: 77.5820,
    quarantineRadiusKm: 3,
    symptoms: "Mucopurulent ocular-nasal discharge, necrotic stomatitis, profuse diarrhea"
  },
  {
    id: "OB-003",
    location: "Bannari Border",
    block: "Sathyamangalam",
    district: "Erode",
    disease: "Anthrax (Suspect)",
    animalsAffected: 3,
    mortality: 2,
    riskScore: 88,
    riskLevel: "CRITICAL",
    status: "Quarantine Active",
    assignedTeam: "Team Delta (Dr. Murugesan)",
    lastUpdate: "2 hours ago",
    species: "Cattle",
    lat: 11.5450,
    lng: 77.1680,
    quarantineRadiusKm: 10,
    symptoms: "Sudden peracute death, dark tarry unclotted blood from natural orifices"
  },
  {
    id: "OB-004",
    location: "Kallipatti",
    block: "Gobichettipalayam",
    district: "Erode",
    disease: "Brucellosis",
    animalsAffected: 8,
    mortality: 0,
    riskScore: 58,
    riskLevel: "MEDIUM",
    status: "Ring Vaccination",
    assignedTeam: "Team Echo (Dr. Malathi)",
    lastUpdate: "3 hours ago",
    species: "Dairy Cattle",
    lat: 11.4920,
    lng: 77.4110,
    quarantineRadiusKm: 3,
    symptoms: "Late-term abortion storm, retained placenta, hygroma"
  },
  {
    id: "OB-005",
    location: "Chennimalai Rural",
    block: "Perundurai",
    district: "Erode",
    disease: "Lumpy Skin Disease (LSD)",
    animalsAffected: 14,
    mortality: 0,
    riskScore: 64,
    riskLevel: "MEDIUM",
    status: "Surveillance Active",
    assignedTeam: "Team Charlie (Dr. Anbarasu)",
    lastUpdate: "5 hours ago",
    species: "Cattle & Buffalo",
    lat: 11.1681,
    lng: 77.6106,
    quarantineRadiusKm: 5,
    symptoms: "Firm circumscribed cutaneous nodules (2-5cm), enlarged prescapular lymph nodes"
  }
];

// GIS Map Layer Points (including cases, clinics, labs, and weather anomalies)
export const gisMapPoints = [
  ...outbreaksData.map(ob => ({
    ...ob,
    type: "outbreak"
  })),
  {
    id: "VET-01",
    name: "Veterinary Poly Clinic Perundurai",
    type: "clinic",
    block: "Perundurai",
    lat: 11.2750,
    lng: 77.5850,
    beds: 12,
    doctors: 4,
    ambulanceAvailable: true,
    status: "ACTIVE"
  },
  {
    id: "VET-02",
    name: "Veterinary Dispensary Bhavani",
    type: "clinic",
    block: "Bhavani",
    lat: 11.4510,
    lng: 77.6820,
    beds: 6,
    doctors: 2,
    ambulanceAvailable: true,
    status: "ACTIVE"
  },
  {
    id: "LAB-01",
    name: "District Disease Diagnostic Lab (DDDL) Erode",
    type: "lab",
    block: "Erode Central",
    lat: 11.3410,
    lng: 77.7172,
    capacityDaily: 150,
    turnaroundHours: 8,
    status: "HIGH LOAD"
  },
  {
    id: "LAB-02",
    name: "Regional ELISA Diagnostic Station (TANUVAS)",
    type: "lab",
    block: "Gobichettipalayam",
    lat: 11.4580,
    lng: 77.4420,
    capacityDaily: 80,
    turnaroundHours: 12,
    status: "NORMAL"
  },
  {
    id: "WZ-01",
    name: "Excess Rainfall & Humidity Anomaly Zone (+42mm)",
    type: "weather",
    block: "Perundurai-Thingalur",
    lat: 11.2500,
    lng: 77.5600,
    rainfallAnomaly: "+42mm",
    humidity: "89%",
    riskFactor: "Vector proliferation (Culicoides / Ticks)"
  }
];

// Case Escalation Pipeline (9 Stages)
export const caseEscalationPipeline = [
  { stage: 1, name: "New Report", count: 42, status: "Active Intake", color: "blue", desc: "Farmer mobile app & syndromic telemetry" },
  { stage: 2, name: "AI Triage", count: 18, status: "Evaluated", color: "blue", desc: "Symptom NLP match against known epizootic profiles" },
  { stage: 3, name: "Vet Review", count: 11, status: "Verified", color: "amber", desc: "Local Veterinary Assistant Surgeon inspection" },
  { stage: 4, name: "High-Risk Case", count: 7, status: "Flagged", color: "red", desc: "Multi-herd transmission risk flagged" },
  { stage: 5, name: "Govt Monitoring", count: 5, status: "Active Watch", color: "red", desc: "District Collectorate & Joint Director notified" },
  { stage: 6, name: "Outbreak Invest.", count: 5, status: "Field Action", color: "red", desc: "Rapid Response Teams on-site with PPE" },
  { stage: 7, name: "Lab Testing", count: 3, status: "Diagnostic PCR", color: "amber", desc: "Tissue/serum testing at DDDL & IVPM Ranipet" },
  { stage: 8, name: "Containment", count: 2, status: "Buffer Zone", color: "red", desc: "5km ring vaccination & livestock shandy ban" },
  { stage: 9, name: "Resolved", count: 28, status: "Contained", color: "green", desc: "Zero new cases after 21-day incubation watch" }
];

// Composite Risk Intelligence Breakdown
export const riskIntelligenceData = {
  currentScore: 92,
  maxScore: 100,
  threatLevel: "CRITICAL OUTBREAK RISK",
  recommendation: "Issue immediate 5-km quarantine zone around Perundurai East, suspend cattle shandy, and deploy emergency ring vaccination.",
  drivers: [
    {
      title: "Weather Anomaly",
      metric: "Heavy Rainfall (+42mm)",
      description: "Severe post-monsoon precipitation has generated vector breeding grounds (Culicoides and Stomoxys flies).",
      impact: "+22 pts",
      severity: "CRITICAL"
    },
    {
      title: "Historical Pattern",
      metric: "Above Seasonal Average (+28%)",
      description: "FMD recurrence correlates with post-monsoon cattle movement across western Tamil Nadu.",
      impact: "+26 pts",
      severity: "CRITICAL"
    },
    {
      title: "Case Velocity",
      metric: "+28% Week-over-Week",
      description: "Rapid cluster formation within 48 hours across 3 adjoining village hamlets.",
      impact: "+24 pts",
      severity: "HIGH"
    },
    {
      title: "Market Vector Proximity",
      metric: "Perundurai Weekly Cattle Market (3.2 km)",
      description: "Over 3,500 bovine head traded weekly; high vector and droplet dissemination hazard.",
      impact: "+15 pts",
      severity: "HIGH"
    },
    {
      title: "Vaccination Deficit",
      metric: "17.4% Unvaccinated Herd",
      description: "Unvaccinated booster gap in newborn calves and migratory sheep flocks.",
      impact: "+5 pts",
      severity: "WARNING"
    }
  ]
};

// Analytics Data
export const diseaseTrendsData = [
  { week: "W-31", fmd: 42, ppr: 18, anthrax: 0, brucellosis: 12 },
  { week: "W-32", fmd: 55, ppr: 22, anthrax: 1, brucellosis: 14 },
  { week: "W-33", fmd: 89, ppr: 31, anthrax: 0, brucellosis: 10 },
  { week: "W-34", fmd: 142, ppr: 45, anthrax: 2, brucellosis: 16 },
  { week: "W-35", fmd: 228, ppr: 58, anthrax: 3, brucellosis: 19 },
  { week: "W-36", fmd: 310, ppr: 64, anthrax: 3, brucellosis: 22 }
];

export const speciesDistribution = [
  { species: "Cattle (Bovine)", percentage: 54, count: 693, color: "#1B4332" },
  { species: "Buffalo (Bubaline)", percentage: 22, count: 282, color: "#2D6A4F" },
  { species: "Goat (Caprine)", percentage: 16, count: 205, color: "#52796F" },
  { species: "Sheep (Ovine)", percentage: 8, count: 104, color: "#84A98C" }
];

export const multiYearComparison = [
  { year: "2024", cases: 2840, mortality: 185, vaccinationPct: 74 },
  { year: "2025", cases: 2190, mortality: 122, vaccinationPct: 79 },
  { year: "2026 (YTD)", cases: 1284, mortality: 143, vaccinationPct: 82.6 }
];

// Diagnostic Laboratory Status
export const laboratoryData = {
  summary: {
    pending: 12,
    collected: 8,
    underTesting: 5,
    positive: 2,
    negative: 3
  },
  lifecycle: [
    { step: "Case Reported", time: "Day 0 - 08:30 AM", status: "COMPLETED" },
    { step: "Sample Collection", time: "Day 0 - 11:15 AM", status: "COMPLETED" },
    { step: "Lab Referral", time: "Day 0 - 02:00 PM", status: "COMPLETED" },
    { step: "Diagnostic Testing (RT-PCR & ELISA)", time: "Day 1 - In Progress", status: "ACTIVE" },
    { step: "Official Result Verification", time: "Estimated: 4h remaining", status: "PENDING" },
    { step: "Government Command Center Sync", time: "Auto-trigger on verify", status: "PENDING" }
  ],
  recentTests: [
    { sampleId: "SAM-8891", village: "Perundurai East", species: "Cattle", testType: "FMD RT-PCR", result: "POSITIVE (Serotype O)", lab: "DDDL Erode", date: "Today 10:20 AM" },
    { sampleId: "SAM-8892", village: "Kavindapadi", species: "Goat", testType: "PPR Antigen ELISA", result: "POSITIVE", lab: "DDDL Erode", date: "Today 09:15 AM" },
    { sampleId: "SAM-8893", village: "Bannari", species: "Cattle", testType: "Bacillus anthracis Blood Smear", result: "NEGATIVE (Confirming with PCR)", lab: "IVPM Ranipet", date: "Today 08:45 AM" },
    { sampleId: "SAM-8894", village: "Kallipatti", species: "Dairy Cattle", testType: "Rose Bengal Plate Test", result: "POSITIVE (Brucella)", lab: "DDDL Erode", date: "Yesterday" }
  ]
};

// Vaccination Intelligence
export const vaccinationData = {
  eligibleAnimals: 50000,
  vaccinated: 38000,
  pending: 12000,
  coveragePercent: 76.0,
  targetPercent: 90.0,
  blocks: [
    { name: "Gobichettipalayam", eligible: 9200, vaccinated: 8380, pct: 91.1, status: "TARGET MET" },
    { name: "Modakkurichi", eligible: 7800, vaccinated: 6900, pct: 88.5, status: "ON TRACK" },
    { name: "Kodumudi", eligible: 6500, vaccinated: 5650, pct: 86.9, status: "ON TRACK" },
    { name: "Perundurai", eligible: 11400, vaccinated: 9600, pct: 84.2, status: "EXPEDITE" },
    { name: "Bhavani", eligible: 8600, vaccinated: 6740, pct: 78.4, status: "LAGGING" },
    { name: "Sathyamangalam", eligible: 6500, vaccinated: 4615, pct: 71.0, status: "CRITICAL DEFICIT" }
  ]
};

// Response Resources & Veterinary Teams
export const responseResources = {
  veterinarians: { total: 16, deployed: 12, available: 4 },
  fieldWorkers: { total: 36, deployed: 28, available: 8 },
  vaccineDoses: { stock: 5000, reserved: 3500, inTransit: 1500 },
  sampleKits: { total: 150, deployed: 30, inStock: 120 },
  transportUnits: { total: 10, active: 8, standby: 2 },
  emergencyTeams: { total: 5, active: 4, standby: 1 }
};

export const veterinaryTeams = [
  {
    id: "TM-01",
    name: "Team Alpha",
    lead: "Dr. M. Jayakumar, M.V.Sc.",
    location: "Perundurai East",
    activity: "Outbreak Containment & Ring Vaccination",
    status: "INVESTIGATING",
    vehicle: "TN-33-G-0412",
    contact: "+91 94432 10101",
    members: 4,
    vaccineStock: 450
  },
  {
    id: "TM-02",
    name: "Team Bravo",
    lead: "Dr. Priya Sundaram, M.V.Sc.",
    location: "Kavindapadi, Bhavani",
    activity: "PPR Diagnostic Sampling & Treatment",
    status: "VACCINATION",
    vehicle: "TN-33-G-0891",
    contact: "+91 94432 10102",
    members: 3,
    vaccineStock: 300
  },
  {
    id: "TM-03",
    name: "Team Delta",
    lead: "Dr. V. Murugesan, M.V.Sc.",
    location: "Bannari, Sathyamangalam",
    activity: "Anthrax Suspect Quarantine & Deep Burial",
    status: "QUARANTINE",
    vehicle: "TN-33-G-0554",
    contact: "+91 94432 10104",
    members: 4,
    vaccineStock: 100
  },
  {
    id: "TM-04",
    name: "Team Charlie",
    lead: "Dr. R. Anbarasu, M.V.Sc.",
    location: "Chennimalai Rural",
    activity: "Cutaneous Biopsy & Vector Spraying",
    status: "SURVEILLANCE",
    vehicle: "TN-33-G-1102",
    contact: "+91 94432 10103",
    members: 3,
    vaccineStock: 250
  },
  {
    id: "TM-05",
    name: "Team Echo",
    lead: "Dr. N. Malathi, M.V.Sc.",
    location: "Gobichettipalayam Poly Clinic",
    activity: "District Emergency Reserve & Tele-consult",
    status: "AVAILABLE",
    vehicle: "TN-33-G-0210",
    contact: "+91 94432 10105",
    members: 3,
    vaccineStock: 800
  }
];

// Live Surveillance Stream
export const surveillanceFeed = [
  { id: "SV-1092", time: "10 mins ago", type: "FARMER_REPORT", village: "Perundurai East", text: "Cow exhibits drooling saliva and unable to stand. 2 adjacent cows show decreased milk yield.", status: "ESCALATED" },
  { id: "SV-1091", time: "28 mins ago", type: "VET_CLINIC", village: "Kavindapadi", text: "Goat flock presented with oral erosion and watery discharge. 3 deaths reported in past 48 hours.", status: "TEAM_ASSIGNED" },
  { id: "SV-1090", time: "1 hour ago", type: "SHANDY_CHECKPOST", village: "Perundurai Shandy", text: "Checkpost quarantine inspection halted 14 cattle from border district without FMD vaccination certificates.", status: "CONTAINED" },
  { id: "SV-1089", time: "2 hours ago", type: "LAB_UPDATE", village: "DDDL Erode", text: "Tissue sample SAM-8891 confirmed Foot & Mouth Disease Serotype O. Automated escalation triggered.", status: "CONFIRMED" },
  { id: "SV-1088", time: "3 hours ago", type: "WEATHER_WARNING", village: "Thingalur Basin", text: "IMD heavy rainfall alert (65mm). Elevated risk of stagnant water vector multiplication.", status: "MONITORING" }
];

// Official Statutory Reports
export const governmentReports = [
  {
    id: "REP-DAILY-0905",
    title: "Daily Epizootic Surveillance Digest",
    period: "24 Hours (05-Sep-2026)",
    type: "Daily Surveillance",
    submittedTo: "Director of Animal Husbandry, Chennai",
    status: "GENERATED",
    classification: "OFFICIAL USE ONLY",
    fileSize: "1.8 MB",
    format: "PDF & CSV"
  },
  {
    id: "REP-OUTBREAK-W36",
    title: "Weekly Outbreak Epidemiology & Containment Bulletin",
    period: "Week 36 (29-Aug to 05-Sep-2026)",
    type: "Weekly Outbreak",
    submittedTo: "District Collector, Erode & State Surveillance Unit",
    status: "READY FOR DISPATCH",
    classification: "CONFIDENTIAL",
    fileSize: "3.4 MB",
    format: "PDF"
  },
  {
    id: "REP-MORTALITY-AUG26",
    title: "Monthly Livestock Mortality & Biosecurity Audit",
    period: "August 2026",
    type: "Monthly Mortality",
    submittedTo: "Ministry of Fisheries, Animal Husbandry & Dairying (GoI)",
    status: "APPROVED",
    classification: "PUBLIC RECORD",
    fileSize: "4.1 MB",
    format: "PDF & EXCEL"
  },
  {
    id: "REP-NADCP-PHASE3",
    title: "National Animal Disease Control Programme (NADCP) Progress Audit",
    period: "Q2 2026",
    type: "Vaccination Coverage",
    submittedTo: "NADCP National Mission Directorate",
    status: "FINALIZED",
    classification: "STATUTORY",
    fileSize: "5.2 MB",
    format: "PDF & EXCEL"
  },
  {
    id: "REP-HOTSPOT-PERUNDURAI",
    title: "High-Risk Village Containment & Ring Vaccination Dossier",
    period: "Active Incident",
    type: "High-Risk Village",
    submittedTo: "Erode Disaster Management Authority",
    status: "ACTION REQUIRED",
    classification: "RESTRICTED",
    fileSize: "2.1 MB",
    format: "PDF"
  }
];
