// Triage Service — rule-based health risk assessment prototype.
//
// IMPORTANT: This is a prototype rule-based system only.
// It is NOT a medically validated AI system.
// This service is structured so a real AI model or API
// can replace the rule logic later without changing callers.

import '../models/health_report.dart';

/// Result returned by the triage engine.
class TriageResult {
  final RiskLevel riskLevel;
  final String title;
  final String advice;
  final String recommendedAction;

  const TriageResult({
    required this.riskLevel,
    required this.title,
    required this.advice,
    required this.recommendedAction,
  });
}

/// Symptoms considered critical by the prototype rule engine.
const List<String> _criticalSymptoms = [
  'Breathing difficulty',
  'Excessive salivation',
  'Weakness',
  'Skin lesions',
];

/// Stateless triage engine.
///
/// Future integration point: replace [assess] body with an
/// API call to an AI disease risk model.
class TriageService {
  TriageService._(); // prevent instantiation

  /// Assess symptoms reported by the farmer.
  ///
  /// [symptoms] — list of symptom display strings selected by the farmer.
  /// [isMortalityRelated] — true when called from a mortality report.
  static TriageResult assess({
    required List<String> symptoms,
    bool isMortalityRelated = false,
  }) {
    if (symptoms.isEmpty && !isMortalityRelated) {
      return _buildResult(RiskLevel.low);
    }

    // CRITICAL: mortality OR ≥2 critical symptoms
    if (isMortalityRelated) {
      return _buildResult(RiskLevel.critical);
    }

    final criticalCount = symptoms
        .where((s) => _criticalSymptoms.contains(s))
        .length;

    if (criticalCount >= 2) {
      return _buildResult(RiskLevel.critical);
    }

    // HIGH: multiple concerning symptoms OR single critical symptom
    if (criticalCount == 1 || symptoms.length >= 3) {
      return _buildResult(RiskLevel.high);
    }

    // MEDIUM: one concerning symptom
    if (symptoms.length == 1) {
      return _buildResult(RiskLevel.medium);
    }

    // Multiple non-critical symptoms → HIGH
    if (symptoms.length >= 2) {
      return _buildResult(RiskLevel.high);
    }

    return _buildResult(RiskLevel.low);
  }

  static TriageResult _buildResult(RiskLevel level) {
    switch (level) {
      case RiskLevel.low:
        return const TriageResult(
          riskLevel: RiskLevel.low,
          title: 'Low Risk',
          advice: 'Continue monitoring the animal.',
          recommendedAction:
              'No immediate action required. Keep observing the animal daily.',
        );
      case RiskLevel.medium:
        return const TriageResult(
          riskLevel: RiskLevel.medium,
          title: 'Medium Risk',
          advice:
              'Monitor the animal closely and consider contacting a veterinarian.',
          recommendedAction:
              'Check the animal twice daily. Contact a vet if symptoms worsen.',
        );
      case RiskLevel.high:
        return const TriageResult(
          riskLevel: RiskLevel.high,
          title: 'High Risk',
          advice:
              'Please isolate the affected animal and contact a veterinarian.',
          recommendedAction:
              'Isolate the animal from the herd immediately. Request veterinarian assistance.',
        );
      case RiskLevel.critical:
        return const TriageResult(
          riskLevel: RiskLevel.critical,
          title: 'Critical — Immediate Action Required',
          advice:
              'Immediate veterinary attention is recommended. Isolate the affected animal.',
          recommendedAction:
              'Isolate the animal immediately. Contact the nearest veterinarian urgently. '
              'Avoid moving other animals from the area.',
        );
    }
  }
}
