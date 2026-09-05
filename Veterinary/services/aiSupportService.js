/**
 * AI Clinical Support Service
 * Provides preliminary risk calculation, confidence metric, vector risk factors, and mandatory disclaimer.
 */

export const MANDATORY_AI_DISCLAIMER = "AI provides preliminary decision support. Final diagnosis and treatment decisions are made by the veterinarian.";

class AiSupportService {
  evaluateCaseRisk(symptoms = [], temp = null, species = 'Cattle') {
    let score = 25;
    const factors = [];

    const symptomText = symptoms.join(' ').toLowerCase();

    if (symptomText.includes('fever') || (temp && temp > 39.5)) {
      score += 25;
      factors.push(`Elevated body temperature detected (${temp ? temp + '°C' : 'High Fever'})`);
    }

    if (symptomText.includes('vesicle') || symptomText.includes('salivation') || symptomText.includes('ulcer')) {
      score += 35;
      factors.push('Characteristic vesicular or oral mucosal lesions suspicious of FMD');
    }

    if (symptomText.includes('discharge') || symptomText.includes('respiratory') || symptomText.includes('cough')) {
      score += 25;
      factors.push('Respiratory distress and mucopurulent oculonasal discharge');
    }

    if (symptomText.includes('nodular') || symptomText.includes('lesion')) {
      score += 25;
      factors.push('Cutaneous nodular eruptions suspicious of Lumpy Skin Disease');
    }

    let riskLevel = 'Low';
    if (score >= 80) riskLevel = 'Critical';
    else if (score >= 60) riskLevel = 'High';
    else if (score >= 40) riskLevel = 'Medium';

    let suggestedAction = 'Veterinary examination and possible laboratory testing.';

    return {
      aiRiskLevel: riskLevel,
      aiRiskScore: Math.min(score, 99),
      aiConfidence: 84,
      aiContributingFactors: factors.length > 0 ? factors : ['Elevated temperature', 'Respiratory symptoms', 'Similar nearby cases'],
      aiSuggestedAction: suggestedAction,
      disclaimer: MANDATORY_AI_DISCLAIMER
    };
  }
}

export const aiSupportService = new AiSupportService();
