// Symptom Report Screen — 5-step wizard.
// Step 1: Select Animal
// Step 2: Select Symptoms
// Step 3: Evidence (placeholders)
// Step 4: Location (placeholder)
// Step 5: Result (Health Risk Assessment)

import 'package:flutter/material.dart';
import '../services/farmer_data_service.dart';
import '../services/triage_service.dart';
import '../models/animal.dart';
import '../models/health_report.dart';

class SymptomReportScreen extends StatefulWidget {
  final FarmerDataService dataService;
  final String? preselectedAnimalId;

  const SymptomReportScreen({
    super.key,
    required this.dataService,
    this.preselectedAnimalId,
  });

  @override
  State<SymptomReportScreen> createState() => _SymptomReportScreenState();
}

class _SymptomReportScreenState extends State<SymptomReportScreen> {
  int _step = 0;

  // Step 1
  Animal? _selectedAnimal;

  // Step 2
  final Set<String> _selectedSymptoms = {};

  // Step 3
  final TextEditingController _descCtrl = TextEditingController();

  // Step 4
  String _location = 'Farm Location (auto-detect disabled in prototype)';

  // Result
  TriageResult? _triageResult;
  String? _reportId;

  final List<_SymptomOption> _symptoms = const [
    _SymptomOption('Fever', Icons.thermostat),
    _SymptomOption('Loss of appetite', Icons.no_food),
    _SymptomOption('Breathing difficulty', Icons.air),
    _SymptomOption('Difficulty walking', Icons.directions_walk),
    _SymptomOption('Diarrhea', Icons.water_drop),
    _SymptomOption('Excessive salivation', Icons.sentiment_very_dissatisfied),
    _SymptomOption('Weakness', Icons.battery_alert),
    _SymptomOption('Skin lesions', Icons.healing),
    _SymptomOption('Other', Icons.more_horiz),
  ];

  @override
  void initState() {
    super.initState();
    if (widget.preselectedAnimalId != null) {
      _selectedAnimal =
          widget.dataService.getAnimalById(widget.preselectedAnimalId!);
    }
  }

  @override
  void dispose() {
    _descCtrl.dispose();
    super.dispose();
  }

  void _next() {
    // Validations
    if (_step == 0 && _selectedAnimal == null) {
      _showError('Please select an animal.');
      return;
    }
    if (_step == 1 && _selectedSymptoms.isEmpty) {
      _showError('Please select at least one symptom.');
      return;
    }
    if (_step == 3) {
      _submit();
      return;
    }
    setState(() => _step++);
  }

  void _submit() {
    final result = TriageService.assess(
      symptoms: _selectedSymptoms.toList(),
    );

    final reportId = widget.dataService.generateReportId();
    final report = HealthReport(
      id: reportId,
      animalId: _selectedAnimal!.id,
      animalTag: _selectedAnimal!.earTag,
      symptoms: _selectedSymptoms.toList(),
      riskLevel: result.riskLevel,
      title: result.title,
      advice: result.advice,
      recommendedAction: result.recommendedAction,
      description: _descCtrl.text.trim().isEmpty ? null : _descCtrl.text.trim(),
      location: _location,
    );

    widget.dataService.addHealthReport(report);

    setState(() {
      _triageResult = result;
      _reportId = reportId;
      _step = 4; // result step
    });
  }

  void _showError(String msg) {
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text(msg),
        backgroundColor: Colors.red,
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text(
          'Report Animal Health Problem',
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        bottom: _step < 4
            ? PreferredSize(
                preferredSize: const Size.fromHeight(6),
                child: LinearProgressIndicator(
                  value: (_step + 1) / 5,
                  backgroundColor: Colors.grey.shade300,
                ),
              )
            : null,
      ),
      body: AnimatedSwitcher(
        duration: const Duration(milliseconds: 300),
        child: _buildStep(),
      ),
    );
  }

  Widget _buildStep() {
    switch (_step) {
      case 0:
        return _StepSelectAnimal(
          key: const ValueKey(0),
          dataService: widget.dataService,
          selected: _selectedAnimal,
          onSelected: (a) => setState(() => _selectedAnimal = a),
          onNext: _next,
        );
      case 1:
        return _StepSelectSymptoms(
          key: const ValueKey(1),
          symptoms: _symptoms,
          selected: _selectedSymptoms,
          onToggle: (s) => setState(() {
            if (_selectedSymptoms.contains(s)) {
              _selectedSymptoms.remove(s);
            } else {
              _selectedSymptoms.add(s);
            }
          }),
          onNext: _next,
          onBack: () => setState(() => _step--),
        );
      case 2:
        return _StepEvidence(
          key: const ValueKey(2),
          descCtrl: _descCtrl,
          onNext: _next,
          onBack: () => setState(() => _step--),
        );
      case 3:
        return _StepLocation(
          key: const ValueKey(3),
          location: _location,
          onLocationChanged: (l) => setState(() => _location = l),
          onSubmit: _submit,
          onBack: () => setState(() => _step--),
        );
      case 4:
        return _StepResult(
          key: const ValueKey(4),
          result: _triageResult!,
          reportId: _reportId!,
          animalTag: _selectedAnimal!.earTag,
          symptoms: _selectedSymptoms.toList(),
          onDone: () => Navigator.pop(context),
        );
      default:
        return const SizedBox();
    }
  }
}

// ─── Step 1: Select Animal ────────────────────────────────────────────────────

class _StepSelectAnimal extends StatelessWidget {
  final FarmerDataService dataService;
  final Animal? selected;
  final ValueChanged<Animal> onSelected;
  final VoidCallback onNext;

  const _StepSelectAnimal({
    super.key,
    required this.dataService,
    required this.selected,
    required this.onSelected,
    required this.onNext,
  });

  @override
  Widget build(BuildContext context) {
    final animals = dataService.getAnimals();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.all(16),
          child: Text(
            'Step 1 of 4 — Select Animal',
            style: TextStyle(color: Colors.grey, fontSize: 13),
          ),
        ),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            'Which animal needs help?',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
        ),
        const SizedBox(height: 16),
        Expanded(
          child: animals.isEmpty
              ? const Center(
                  child: Text('No animals registered yet.',
                      style: TextStyle(color: Colors.grey)),
                )
              : ListView.builder(
                  padding: const EdgeInsets.symmetric(horizontal: 16),
                  itemCount: animals.length,
                  itemBuilder: (ctx, i) {
                    final a = animals[i];
                    final isSelected = selected?.id == a.id;
                    return Card(
                      margin: const EdgeInsets.only(bottom: 10),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                        side: BorderSide(
                          color: isSelected
                              ? Theme.of(context).colorScheme.primary
                              : Colors.transparent,
                          width: 2,
                        ),
                      ),
                      child: ListTile(
                        leading: CircleAvatar(
                          backgroundColor: isSelected
                              ? Theme.of(context).colorScheme.primaryContainer
                              : Colors.grey.shade200,
                          child: const Icon(Icons.pets),
                        ),
                        title: Text(
                          '${a.species.displayName} — ${a.earTag}',
                          style: const TextStyle(fontWeight: FontWeight.bold),
                        ),
                        subtitle: Text('${a.breed} · ${a.age}'),
                        trailing: isSelected
                            ? const Icon(Icons.check_circle,
                                color: Colors.green)
                            : null,
                        onTap: () => onSelected(a),
                      ),
                    );
                  },
                ),
        ),
        Padding(
          padding: const EdgeInsets.all(16),
          child: SizedBox(
            width: double.infinity,
            height: 52,
            child: ElevatedButton(
              onPressed: onNext,
              child: const Text(
                'Next: Select Symptoms',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ),
      ],
    );
  }
}

// ─── Step 2: Select Symptoms ──────────────────────────────────────────────────

class _SymptomOption {
  final String label;
  final IconData icon;

  const _SymptomOption(this.label, this.icon);
}

class _StepSelectSymptoms extends StatelessWidget {
  final List<_SymptomOption> symptoms;
  final Set<String> selected;
  final ValueChanged<String> onToggle;
  final VoidCallback onNext;
  final VoidCallback onBack;

  const _StepSelectSymptoms({
    super.key,
    required this.symptoms,
    required this.selected,
    required this.onToggle,
    required this.onNext,
    required this.onBack,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const Padding(
          padding: EdgeInsets.all(16),
          child: Text(
            'Step 2 of 4 — Select Symptoms',
            style: TextStyle(color: Colors.grey, fontSize: 13),
          ),
        ),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 16),
          child: Text(
            'What symptoms do you see?',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
        ),
        const Padding(
          padding: EdgeInsets.symmetric(horizontal: 16, vertical: 4),
          child: Text(
            'Select all that apply.',
            style: TextStyle(color: Colors.grey),
          ),
        ),
        const SizedBox(height: 8),
        Expanded(
          child: GridView.builder(
            padding: const EdgeInsets.symmetric(horizontal: 16),
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 3,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
              childAspectRatio: 0.85,
            ),
            itemCount: symptoms.length,
            itemBuilder: (ctx, i) {
              final s = symptoms[i];
              final isSelected = selected.contains(s.label);
              return GestureDetector(
                onTap: () => onToggle(s.label),
                child: AnimatedContainer(
                  duration: const Duration(milliseconds: 200),
                  decoration: BoxDecoration(
                    color: isSelected
                        ? Theme.of(context).colorScheme.primaryContainer
                        : Colors.grey.shade100,
                    borderRadius: BorderRadius.circular(12),
                    border: Border.all(
                      color: isSelected
                          ? Theme.of(context).colorScheme.primary
                          : Colors.grey.shade300,
                      width: 2,
                    ),
                  ),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Icon(
                        s.icon,
                        size: 32,
                        color: isSelected
                            ? Theme.of(context).colorScheme.primary
                            : Colors.grey,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        s.label,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 12,
                          fontWeight: isSelected
                              ? FontWeight.bold
                              : FontWeight.normal,
                          color: isSelected
                              ? Theme.of(context).colorScheme.primary
                              : Colors.black87,
                        ),
                      ),
                    ],
                  ),
                ),
              );
            },
          ),
        ),
        if (selected.isNotEmpty)
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 4),
            child: Text(
              'Selected: ${selected.join(", ")}',
              style: const TextStyle(color: Colors.green, fontSize: 12),
            ),
          ),
        Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              OutlinedButton(
                onPressed: onBack,
                child: const Text('Back'),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton(
                  onPressed: onNext,
                  child: const Text(
                    'Next: Evidence',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }
}

// ─── Step 3: Evidence ─────────────────────────────────────────────────────────

class _StepEvidence extends StatelessWidget {
  final TextEditingController descCtrl;
  final VoidCallback onNext;
  final VoidCallback onBack;

  const _StepEvidence({
    super.key,
    required this.descCtrl,
    required this.onNext,
    required this.onBack,
  });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Step 3 of 4 — Evidence',
            style: TextStyle(color: Colors.grey, fontSize: 13),
          ),
          const SizedBox(height: 8),
          const Text(
            'Add more information',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 20),

          // Photo placeholder
          _evidenceTile(
            context,
            icon: Icons.camera_alt,
            label: 'Take / Upload Photo',
            subtitle: 'Photo upload available in full version',
            color: Colors.blue,
          ),
          const SizedBox(height: 12),

          // Voice placeholder
          _evidenceTile(
            context,
            icon: Icons.mic,
            label: 'Record Voice Note',
            subtitle: 'Voice recording available in full version',
            color: Colors.orange,
          ),
          const SizedBox(height: 16),

          // Description
          TextField(
            controller: descCtrl,
            maxLines: 4,
            decoration: InputDecoration(
              labelText: 'Write Description (optional)',
              hintText: 'Describe what you observed...',
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12)),
              alignLabelWithHint: true,
            ),
          ),
          const SizedBox(height: 24),
          Row(
            children: [
              OutlinedButton(
                onPressed: onBack,
                child: const Text('Back'),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton(
                  onPressed: onNext,
                  child: const Text(
                    'Next: Location',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _evidenceTile(
    BuildContext context, {
    required IconData icon,
    required String label,
    required String subtitle,
    required Color color,
  }) {
    return Container(
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.08),
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: ListTile(
        leading: CircleAvatar(
          backgroundColor: color.withValues(alpha: 0.2),
          child: Icon(icon, color: color),
        ),
        title: Text(label, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(subtitle, style: const TextStyle(fontSize: 12)),
        trailing: const Icon(Icons.lock_outline, color: Colors.grey, size: 18),
        onTap: () {
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(
              content: Text('This feature is available in the full version.'),
            ),
          );
        },
      ),
    );
  }
}

// ─── Step 4: Location ─────────────────────────────────────────────────────────

class _StepLocation extends StatefulWidget {
  final String location;
  final ValueChanged<String> onLocationChanged;
  final VoidCallback onSubmit;
  final VoidCallback onBack;

  const _StepLocation({
    super.key,
    required this.location,
    required this.onLocationChanged,
    required this.onSubmit,
    required this.onBack,
  });

  @override
  State<_StepLocation> createState() => _StepLocationState();
}

class _StepLocationState extends State<_StepLocation> {
  late final TextEditingController _ctrl;

  @override
  void initState() {
    super.initState();
    _ctrl = TextEditingController(text: widget.location);
  }

  @override
  void dispose() {
    _ctrl.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.all(16),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Step 4 of 4 — Location',
            style: TextStyle(color: Colors.grey, fontSize: 13),
          ),
          const SizedBox(height: 8),
          const Text(
            'Where is the animal?',
            style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 20),

          // Auto-detect placeholder
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: Colors.green.withValues(alpha: 0.08),
              borderRadius: BorderRadius.circular(12),
              border: Border.all(color: Colors.green.withValues(alpha: 0.3)),
            ),
            child: Row(
              children: [
                const Icon(Icons.gps_fixed, color: Colors.green),
                const SizedBox(width: 12),
                const Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Use Current Location',
                        style: TextStyle(fontWeight: FontWeight.bold),
                      ),
                      Text(
                        'GPS location access available in full version',
                        style: TextStyle(fontSize: 12, color: Colors.grey),
                      ),
                    ],
                  ),
                ),
                const Icon(Icons.lock_outline, color: Colors.grey, size: 18),
              ],
            ),
          ),
          const SizedBox(height: 16),
          const Text('Or enter location manually:'),
          const SizedBox(height: 8),
          TextField(
            controller: _ctrl,
            onChanged: widget.onLocationChanged,
            decoration: InputDecoration(
              labelText: 'Location',
              prefixIcon: const Icon(Icons.location_on),
              border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12)),
            ),
          ),
          const Spacer(),
          Row(
            children: [
              OutlinedButton(
                onPressed: widget.onBack,
                child: const Text('Back'),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: ElevatedButton.icon(
                  onPressed: widget.onSubmit,
                  icon: const Icon(Icons.send),
                  label: const Text(
                    'Submit Report',
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green,
                    foregroundColor: Colors.white,
                  ),
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}

// ─── Step 5: Result ───────────────────────────────────────────────────────────

class _StepResult extends StatelessWidget {
  final TriageResult result;
  final String reportId;
  final String animalTag;
  final List<String> symptoms;
  final VoidCallback onDone;

  const _StepResult({
    super.key,
    required this.result,
    required this.reportId,
    required this.animalTag,
    required this.symptoms,
    required this.onDone,
  });

  Color _riskColor(RiskLevel r) {
    switch (r) {
      case RiskLevel.low:
        return Colors.green;
      case RiskLevel.medium:
        return Colors.orange;
      case RiskLevel.high:
        return Colors.red;
      case RiskLevel.critical:
        return Colors.red.shade900;
    }
  }

  IconData _riskIcon(RiskLevel r) {
    switch (r) {
      case RiskLevel.low:
        return Icons.check_circle;
      case RiskLevel.medium:
        return Icons.info;
      case RiskLevel.high:
        return Icons.warning;
      case RiskLevel.critical:
        return Icons.crisis_alert;
    }
  }

  @override
  Widget build(BuildContext context) {
    final color = _riskColor(result.riskLevel);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text(
            'Health Risk Assessment',
            style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 4),
          Text(
            'Report ID: $reportId',
            style: const TextStyle(color: Colors.grey, fontSize: 12),
          ),
          const SizedBox(height: 20),

          // Risk badge
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.12),
              borderRadius: BorderRadius.circular(16),
              border: Border.all(color: color.withValues(alpha: 0.5), width: 2),
            ),
            child: Column(
              children: [
                Icon(_riskIcon(result.riskLevel), size: 56, color: color),
                const SizedBox(height: 12),
                Text(
                  result.riskLevel.displayName,
                  style: TextStyle(
                    fontSize: 28,
                    fontWeight: FontWeight.bold,
                    color: color,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  result.title,
                  style: const TextStyle(fontSize: 16),
                ),
              ],
            ),
          ),
          const SizedBox(height: 16),

          // Animal & Symptoms
          Card(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Animal: $animalTag',
                      style:
                          const TextStyle(fontWeight: FontWeight.bold)),
                  const SizedBox(height: 8),
                  const Text('Reported symptoms:'),
                  const SizedBox(height: 6),
                  Wrap(
                    spacing: 6,
                    runSpacing: 4,
                    children: symptoms
                        .map((s) => Chip(
                              label: Text(s,
                                  style: const TextStyle(fontSize: 12)),
                              padding: EdgeInsets.zero,
                              materialTapTargetSize:
                                  MaterialTapTargetSize.shrinkWrap,
                            ))
                        .toList(),
                  ),
                ],
              ),
            ),
          ),
          const SizedBox(height: 16),

          // Advice
          Card(
            color: color.withValues(alpha: 0.07),
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.lightbulb, color: color, size: 20),
                      const SizedBox(width: 8),
                      const Text(
                        'Advice',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 15),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(result.advice, style: const TextStyle(fontSize: 14)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 12),

          // Recommended action
          Card(
            shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(12)),
            child: Padding(
              padding: const EdgeInsets.all(16),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      Icon(Icons.task_alt,
                          color: Theme.of(context).colorScheme.primary,
                          size: 20),
                      const SizedBox(width: 8),
                      const Text(
                        'Recommended Action',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 15),
                      ),
                    ],
                  ),
                  const SizedBox(height: 10),
                  Text(result.recommendedAction,
                      style: const TextStyle(fontSize: 14)),
                ],
              ),
            ),
          ),
          const SizedBox(height: 8),

          // Disclaimer
          const Text(
            '⚠️ This is a prototype rule-based assessment only. '
            'It is not a medically validated AI system. '
            'Always consult a licensed veterinarian for proper diagnosis.',
            style: TextStyle(color: Colors.grey, fontSize: 11),
          ),
          const SizedBox(height: 24),

          SizedBox(
            width: double.infinity,
            height: 52,
            child: ElevatedButton.icon(
              onPressed: onDone,
              icon: const Icon(Icons.done),
              label: const Text(
                'Done',
                style: TextStyle(
                    fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
