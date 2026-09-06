// Health Report data model

enum RiskLevel { low, medium, high, critical }

enum CaseStatus {
  open,
  underReview,
  vetAssigned,
  visitScheduled,
  treatmentStarted,
  closed
}

extension RiskLevelExt on RiskLevel {
  String get displayName {
    switch (this) {
      case RiskLevel.low:
        return 'LOW';
      case RiskLevel.medium:
        return 'MEDIUM';
      case RiskLevel.high:
        return 'HIGH';
      case RiskLevel.critical:
        return 'CRITICAL';
    }
  }
}

extension CaseStatusExt on CaseStatus {
  String get displayName {
    switch (this) {
      case CaseStatus.open:
        return 'Open';
      case CaseStatus.underReview:
        return 'Under Review';
      case CaseStatus.vetAssigned:
        return 'Vet Assigned';
      case CaseStatus.visitScheduled:
        return 'Visit Scheduled';
      case CaseStatus.treatmentStarted:
        return 'Treatment Started';
      case CaseStatus.closed:
        return 'Closed';
    }
  }
}

class HealthReport {
  final String id;
  final String animalId;
  final String animalTag; // denormalised for display
  final List<String> symptoms;
  final RiskLevel riskLevel;
  final String title;
  final String advice;
  final String recommendedAction;
  final String? description;
  final String? photoPath; // placeholder
  final String? voicePath; // placeholder
  final String? location;
  CaseStatus caseStatus;
  final DateTime createdAt;

  HealthReport({
    required this.id,
    required this.animalId,
    required this.animalTag,
    required this.symptoms,
    required this.riskLevel,
    required this.title,
    required this.advice,
    required this.recommendedAction,
    this.description,
    this.photoPath,
    this.voicePath,
    this.location,
    this.caseStatus = CaseStatus.open,
    DateTime? createdAt,
  }) : createdAt = createdAt ?? DateTime.now();

  Map<String, dynamic> toJson() => {
        'id': id,
        'animalId': animalId,
        'animalTag': animalTag,
        'symptoms': symptoms,
        'riskLevel': riskLevel.name,
        'title': title,
        'advice': advice,
        'recommendedAction': recommendedAction,
        'description': description,
        'caseStatus': caseStatus.name,
        'createdAt': createdAt.toIso8601String(),
      };
}
