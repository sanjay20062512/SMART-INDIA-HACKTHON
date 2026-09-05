# Veterinarian Portal (Login 2)

The **Veterinarian Portal** is a core component of the **Animal Health Surveillance System**. It provides field veterinarians, epidemiological officers, and clinical specialists with tools for livestock triage, AI-driven preliminary disease risk scoring, electronic animal health records (EHR), prescription management, laboratory sample pipeline tracking, and direct Government epidemic escalation.

---

## 📁 Directory Architecture

All code, models, services, components, pages, mock data, and stylesheets for the Veterinarian Portal reside strictly inside `SMART-INDIA-HACKTHON/Veterinary/`:

```
Veterinary/
├── index.html                  # Main SPA container & HTML entrypoint
├── package.json                # Dev server scripts & dependencies
├── README.md                   # Portal documentation & integration manual
├── css/
│   └── styles.css              # Clinical design system (dark/light, badges, tables, modals)
├── mock/
│   └── mockData.js             # Seed dataset (cases, animals, lab requests, treatments, escalations)
├── models/
│   ├── Case.js                 # Case data model & urgency scoring
│   ├── Animal.js               # Electronic Health Record model
│   ├── Treatment.js            # Pharmacological prescription model
│   ├── LabRequest.js           # Diagnostic lab test request model
│   └── Escalation.js           # Government escalation payload model
├── services/
│   ├── apiService.js           # REST API layer (FastAPI / PostgreSQL integration ready)
│   ├── caseService.js          # Case state management, visit scheduling & vitals logging
│   ├── animalService.js        # EHR queries & vaccination record management
│   ├── treatmentService.js     # Prescription recording & follow-up tracking
│   ├── labService.js           # 5-stage lab status pipeline lifecycle
│   ├── governmentService.js    # Government surveillance API abstraction
│   └── aiSupportService.js     # Preliminary risk engine & mandatory disclaimer support
├── components/
│   ├── sidebar.js              # 10-item navigation sidebar
│   ├── header.js               # Header bar with search, location tag & theme toggle
│   ├── statusBadge.js          # Low, Medium, High, Critical status badge renderer
│   ├── modal.js                # Reusable dialog modal engine
│   └── toast.js                # System notification alerts
├── pages/
│   ├── dashboardPage.js        # Metrics overview & urgency-sorted priority queue
│   ├── casesPage.js            # Farmer-reported cases, AI risk cards, accept & schedule
│   ├── animalsPage.js          # Animal EHR profiles, vaccination history, medical timeline
│   ├── clinicalAssessmentPage.js # Vitals entry (Temp, Pulse, Respiration) & vet observations
│   ├── aiSupportView.js        # AI decision support view with mandatory disclaimer
│   ├── treatmentsPage.js       # Prescription creation, drug dosage & follow-up dates
│   ├── laboratoryPage.js       # 5-stage sample status tracker (Created → Result Available)
│   ├── fieldVisitsPage.js      # Farm visit schedule & GPS route navigation link
│   ├── alertsPage.js           # Outbreak alerts & Government escalation logs
│   ├── profilePage.js          # Veterinarian credentials & license details
│   └── settingsPage.js         # REST API endpoint configuration & mock mode toggles
└── js/
    └── app.js                  # Router, state management & event orchestration
```

---

## 🚀 Key Features Implemented

1. **Dashboard**: Metrics for New Cases, High-Risk Cases, Critical Cases, Pending Lab Tests, and Today's Field Visits. Priority Cases table auto-sorted by urgency.
2. **Case Management**: Comprehensive farmer case review with symptoms, photos, GPS location, AI preliminary risk score, Accept Case, Request More Information, and Schedule Field Visit.
3. **Animal Electronic Health Record**: Animal Tag ID search, species, breed, vaccination history (status & next due date), past illnesses, and treatment timeline.
4. **Clinical Assessment**: Vitals logging (Temperature °F, Heart Rate, Respiration Rate), severity rating, and detailed veterinarian notes.
5. **AI Decision Support**: Risk breakdown (Low / Medium / High / Critical), contributing risk factors, suggested next actions, and mandatory notice: *"Preliminary decision support — not a final diagnosis."*
6. **Treatment & Prescriptions**: Pharmacological diagnosis, medicine table (Drug, Dosage, Frequency, Duration), general nursing instructions, follow-up date picker, and printable Rx summary.
7. **Laboratory Diagnostics**: Sample request generation and 5-stage visual status pipeline (`Created` → `Collected` → `Sent` → `Testing` → `Result Available`) with pathogen sensitivity results.
8. **Government Outbreak Escalation**: High-risk disease escalation payload generator transmitting case details, clinical findings, lab results, animal info, and location to the Government portal broadcast layer without modifying or breaking existing Government files.
9. **10-Item Navigation**: Seamless navigation across Dashboard, Cases, Animals, Treatments, Laboratory, Field Visits, Alerts, Profile, Settings, and Logout.

---

## 🔗 Connecting to FastAPI & PostgreSQL Backend

The portal uses a decoupled service architecture (`services/` and `models/`). To switch from mock mode to your live FastAPI backend:

1. Open **Settings** in the portal sidebar.
2. Select **Live FastAPI REST Service**.
3. Set your FastAPI Base URL (default: `http://localhost:8000/api/v1/vet`).
4. Click **Save Configuration**.

Expected API flow: `Flutter / UI` &rarr; `FastAPI REST Endpoints` &rarr; `PostgreSQL DB`.
