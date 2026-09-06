// FarmerDataService — single source of truth for all farmer data.
//
// Architecture note: This class uses in-memory storage for the prototype.
// To connect a real backend, replace the in-memory lists with a Repository
// that calls an API service, without changing any screen code.
//
// Future integration path:
//   UI → FarmerDataService → [Repository] → [ApiService] → Backend → PostgreSQL

import 'package:flutter/foundation.dart';
import '../models/animal.dart';
import '../models/herd.dart';
import '../models/health_report.dart';
import '../models/mortality_report.dart';
import '../models/vet_request.dart';
import '../models/vaccination_record.dart';
import '../models/treatment_record.dart';
import '../models/alert.dart';
import '../models/farmer_profile.dart';
import '../models/dashboard_stats.dart';


class FarmerDataService extends ChangeNotifier {
  // ─── In-memory storage ────────────────────────────────────────────────────

  final List<Animal> _animals = [];
  final List<Herd> _herds = [];
  final List<HealthReport> _healthReports = [];
  final List<MortalityReport> _mortalityReports = [];
  final List<VetRequest> _vetRequests = [];
  final List<VaccinationRecord> _vaccinations = [];
  final List<TreatmentRecord> _treatments = [];
  final List<AppAlert> _alerts = [];

  // Offline sync placeholder — no real sync implemented yet.
  int pendingSyncCount = 0;
  bool isOfflineMode = false;

  FarmerProfile _profile = const FarmerProfile(
    fullName: 'Demo Farmer',
    mobileNumber: '9876543210',
    email: 'farmer@example.com',
    preferredLanguage: 'English',
    state: 'Tamil Nadu',
    district: 'Coimbatore',
    block: 'Mettupalayam',
    village: 'Karunaigoundenpudur',
    farmName: 'Green Pastures Farm',
    livestockType: 'Cattle & Goats',
  );

  int _idCounter = 1;

  // ─── ID generation ─────────────────────────────────────────────────────────

  String _nextId(String prefix) => '$prefix${_idCounter++}';

  // ─── Profile ───────────────────────────────────────────────────────────────

  FarmerProfile get profile => _profile;

  void updateProfile(FarmerProfile updated) {
    _profile = updated;
    notifyListeners();
  }

  // ─── Animals ───────────────────────────────────────────────────────────────

  List<Animal> getAnimals() => List.unmodifiable(_animals);

  Animal? getAnimalById(String id) {
    try {
      return _animals.firstWhere((a) => a.id == id);
    } catch (_) {
      return null;
    }
  }

  /// Returns true if ID is already taken.
  bool animalIdExists(String earTag) {
    return _animals.any(
      (a) => a.earTag.toLowerCase() == earTag.toLowerCase(),
    );
  }

  void addAnimal(Animal animal) {
    _animals.add(animal);
    notifyListeners();
  }

  void updateAnimal(Animal updated) {
    final idx = _animals.indexWhere((a) => a.id == updated.id);
    if (idx != -1) {
      _animals[idx] = updated;
      notifyListeners();
    }
  }

  void removeAnimal(String id) {
    _animals.removeWhere((a) => a.id == id);
    notifyListeners();
  }

  // ─── Herds ─────────────────────────────────────────────────────────────────

  List<Herd> getHerds() => List.unmodifiable(_herds);

  void addHerd(Herd herd) {
    _herds.add(herd);
    notifyListeners();
  }

  void removeHerd(String id) {
    _herds.removeWhere((h) => h.id == id);
    notifyListeners();
  }

  // ─── Health Reports ────────────────────────────────────────────────────────

  List<HealthReport> getHealthReports() => List.unmodifiable(_healthReports);

  List<HealthReport> getHealthReportsForAnimal(String animalId) =>
      _healthReports.where((r) => r.animalId == animalId).toList();

  void addHealthReport(HealthReport report) {
    _healthReports.add(report);

    // Update animal's last health report timestamp & status
    final animal = getAnimalById(report.animalId);
    if (animal != null) {
      animal.lastHealthReport = report.createdAt;
      if (report.riskLevel == RiskLevel.high ||
          report.riskLevel == RiskLevel.critical) {
        animal.healthStatus = report.riskLevel == RiskLevel.critical
            ? HealthStatus.critical
            : HealthStatus.activeCase;
      } else if (report.riskLevel == RiskLevel.medium) {
        if (animal.healthStatus == HealthStatus.healthy) {
          animal.healthStatus = HealthStatus.underMonitoring;
        }
      }
    }

    // Create alert for HIGH / CRITICAL
    if (report.riskLevel == RiskLevel.high) {
      addAlert(AppAlert(
        id: _nextId('ALT'),
        category: AlertCategory.highRiskHealthAlert,
        title: 'High Risk: ${report.animalTag}',
        message:
            'Animal ${report.animalTag} has a HIGH risk health report. '
            'Please isolate and contact a veterinarian.',
        severity: AlertSeverity.high,
        relatedId: report.id,
      ));
    } else if (report.riskLevel == RiskLevel.critical) {
      addAlert(AppAlert(
        id: _nextId('ALT'),
        category: AlertCategory.highRiskHealthAlert,
        title: 'CRITICAL: ${report.animalTag}',
        message:
            'Animal ${report.animalTag} requires immediate veterinary attention.',
        severity: AlertSeverity.critical,
        relatedId: report.id,
      ));
    }

    notifyListeners();
  }

  // ─── Mortality Reports ─────────────────────────────────────────────────────

  List<MortalityReport> getMortalityReports() =>
      List.unmodifiable(_mortalityReports);

  void addMortalityReport(MortalityReport report) {
    _mortalityReports.add(report);

    // Update animal status to critical if applicable
    if (report.animalId != null) {
      final animal = getAnimalById(report.animalId!);
      if (animal != null) {
        animal.healthStatus = HealthStatus.critical;
      }
    }

    // Auto-create critical alert
    addAlert(AppAlert(
      id: _nextId('ALT'),
      category: AlertCategory.mortalityAlert,
      title: 'Mortality Report — ${report.animalTag}',
      message:
          'A mortality report has been submitted for ${report.animalTag}. '
          'Veterinarian notification required. Isolate the affected area.',
      severity: AlertSeverity.critical,
      relatedId: report.id,
    ));

    notifyListeners();
  }

  // ─── Vet Requests ──────────────────────────────────────────────────────────

  List<VetRequest> getVetRequests() => List.unmodifiable(_vetRequests);

  List<VetRequest> getVetRequestsForAnimal(String animalId) =>
      _vetRequests.where((r) => r.animalId == animalId).toList();

  void addVetRequest(VetRequest request) {
    _vetRequests.add(request);
    notifyListeners();
  }

  void updateVetRequestStatus(String id, CaseStatus status) {
    final req = _vetRequests.firstWhere(
      (r) => r.id == id,
      orElse: () => throw StateError('VetRequest $id not found'),
    );
    req.caseStatus = status;
    req.addTimelineEvent(status.displayName, 'Status updated to ${status.displayName}');
    notifyListeners();
  }

  // ─── Vaccinations ──────────────────────────────────────────────────────────

  List<VaccinationRecord> getVaccinations() =>
      List.unmodifiable(_vaccinations);

  List<VaccinationRecord> getVaccinationsForAnimal(String animalId) =>
      _vaccinations.where((v) => v.animalId == animalId).toList();

  void addVaccination(VaccinationRecord record) {
    _vaccinations.add(record);
    notifyListeners();
  }

  // ─── Treatments ────────────────────────────────────────────────────────────

  List<TreatmentRecord> getTreatments() => List.unmodifiable(_treatments);

  List<TreatmentRecord> getTreatmentsForAnimal(String animalId) =>
      _treatments.where((t) => t.animalId == animalId).toList();

  void addTreatment(TreatmentRecord record) {
    _treatments.add(record);
    notifyListeners();
  }

  // ─── Alerts ────────────────────────────────────────────────────────────────

  List<AppAlert> getAlerts() =>
      List.unmodifiable(_alerts.reversed.toList());

  int get unreadAlertCount => _alerts.where((a) => !a.isRead).length;

  void addAlert(AppAlert alert) {
    _alerts.add(alert);
    // No notifyListeners here — callers handle it.
  }

  void markAlertRead(String id) {
    final alert = _alerts.firstWhere(
      (a) => a.id == id,
      orElse: () => throw StateError('Alert $id not found'),
    );
    alert.isRead = true;
    notifyListeners();
  }

  void markAllAlertsRead() {
    for (final a in _alerts) {
      a.isRead = true;
    }
    notifyListeners();
  }

  // ─── Dashboard Statistics ──────────────────────────────────────────────────

  /// Computes dashboard stats dynamically from live data.
  /// NEVER returns hardcoded values.
  DashboardStats getDashboardStatistics() {
    final now = DateTime.now();
    final vacDue = _vaccinations.where((v) {
      if (v.status == VaccinationStatus.due ||
          v.status == VaccinationStatus.overdue) { return true; }
      if (v.nextDueDate != null &&
          v.nextDueDate!.isBefore(now.add(const Duration(days: 30)))) {
        return true;
      }
      return false;
    }).length;

    return DashboardStats(
      totalAnimals: _animals.length,
      healthyAnimals:
          _animals.where((a) => a.healthStatus == HealthStatus.healthy).length,
      monitoringAnimals: _animals
          .where((a) => a.healthStatus == HealthStatus.underMonitoring)
          .length,
      activeCases: _animals
          .where((a) =>
              a.healthStatus == HealthStatus.activeCase ||
              a.healthStatus == HealthStatus.critical)
          .length,
      vaccinationsDue: vacDue,
      importantAlerts: unreadAlertCount,
    );
  }

  // ─── Recent Activity ───────────────────────────────────────────────────────

  /// Returns a combined recent activity list sorted newest first.
  List<Map<String, dynamic>> getRecentActivity({int limit = 10}) {
    final activities = <Map<String, dynamic>>[];

    for (final a in _animals) {
      activities.add({
        'type': 'animal_added',
        'title': 'Animal Added',
        'subtitle': '${a.species.displayName} — ${a.earTag}',
        'date': a.createdAt,
        'icon': 'pets',
      });
    }

    for (final r in _healthReports) {
      activities.add({
        'type': 'health_report',
        'title': 'Health Report Submitted',
        'subtitle': '${r.animalTag} — ${r.riskLevel.displayName} risk',
        'date': r.createdAt,
        'icon': 'medical_services',
      });
    }

    for (final m in _mortalityReports) {
      activities.add({
        'type': 'mortality_report',
        'title': 'Mortality Report',
        'subtitle': m.animalTag,
        'date': m.createdAt,
        'icon': 'warning',
      });
    }

    for (final v in _vetRequests) {
      activities.add({
        'type': 'vet_request',
        'title': 'Veterinarian Requested',
        'subtitle': '${v.animalTag} — ${v.reason}',
        'date': v.createdAt,
        'icon': 'local_hospital',
      });
    }

    activities.sort((a, b) =>
        (b['date'] as DateTime).compareTo(a['date'] as DateTime));

    return activities.take(limit).toList();
  }

  // ─── ID generation helpers (public) ───────────────────────────────────────

  String generateAnimalId() => _nextId('ANM');
  String generateHerdId() => _nextId('HRD');
  String generateReportId() => _nextId('RPT');
  String generateMortalityId() => _nextId('MRT');
  String generateVetRequestId() => _nextId('VET');
  String generateVaccinationId() => _nextId('VAC');
  String generateTreatmentId() => _nextId('TRT');
  String generateAlertId() => _nextId('ALT');

  // ─── Demo data ─────────────────────────────────────────────────────────────

  /// Seeds demo data for demonstration purposes.
  /// Uses the same data flow as real user-entered data.
  void seedDemoData() {
    if (_animals.isNotEmpty) return; // already seeded

    final cow1 = Animal(
      id: generateAnimalId(),
      earTag: 'C001',
      species: AnimalSpecies.cow,
      breed: 'Jersey',
      gender: AnimalGender.female,
      age: '4 years',
      healthStatus: HealthStatus.healthy,
    );
    final cow2 = Animal(
      id: generateAnimalId(),
      earTag: 'C002',
      species: AnimalSpecies.cow,
      breed: 'HF',
      gender: AnimalGender.female,
      age: '5 years',
      healthStatus: HealthStatus.underMonitoring,
    );
    final goat1 = Animal(
      id: generateAnimalId(),
      earTag: 'C003',
      species: AnimalSpecies.goat,
      breed: 'Boer',
      gender: AnimalGender.male,
      age: '2 years',
      healthStatus: HealthStatus.activeCase,
    );

    _animals.addAll([cow1, cow2, goat1]);

    // Sample vaccination
    _vaccinations.add(VaccinationRecord(
      id: generateVaccinationId(),
      animalId: cow1.id,
      animalTag: cow1.earTag,
      vaccineName: 'FMD Vaccine',
      date: DateTime.now().subtract(const Duration(days: 180)),
      nextDueDate: DateTime.now().add(const Duration(days: 15)),
      status: VaccinationStatus.due,
      veterinarian: 'Dr. Rajesh Kumar',
    ));

    // Sample treatment
    _treatments.add(TreatmentRecord(
      id: generateTreatmentId(),
      animalId: goat1.id,
      animalTag: goat1.earTag,
      condition: 'Diarrhea and weakness',
      treatment: 'Oral rehydration and antibiotic',
      medicine: 'ORS + Oxytetracycline',
      instructions: 'Administer ORS twice daily. Keep animal isolated.',
      veterinarian: 'Dr. Priya Nair',
      startDate: DateTime.now().subtract(const Duration(days: 3)),
      followUpDate: DateTime.now().add(const Duration(days: 4)),
      status: TreatmentStatus.ongoing,
    ));

    // Sample alert
    addAlert(AppAlert(
      id: generateAlertId(),
      category: AlertCategory.diseaseAlert,
      title: 'FMD Advisory — Tamil Nadu',
      message:
          'Foot and Mouth Disease cases reported in nearby districts. '
          'Ensure all cattle are vaccinated.',
      severity: AlertSeverity.warning,
    ));

    notifyListeners();
  }
}
